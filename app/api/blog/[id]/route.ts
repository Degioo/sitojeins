import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  tags: z.string().default('[]'),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().optional(),
})

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id }
    })

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const data = blogPostSchema.parse(body)

    // Check if slug already exists for another post
    const existingPost = await prisma.blogPost.findFirst({
      where: { 
        slug: data.slug,
        id: { not: params.id }
      }
    })

    if (existingPost) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        tags: data.tags,
        isPublished: data.isPublished,
        publishedAt: data.isPublished ? new Date(data.publishedAt || new Date()) : null,
        ...(data.excerpt && { excerpt: data.excerpt }),
        ...(data.featuredImage && { featuredImage: data.featuredImage }),
      }
    })

    // Invalida la cache delle pagine pubbliche e admin
    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath('/admin/blog')

    return NextResponse.json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await prisma.blogPost.delete({
      where: { id: params.id }
    })

    // Invalida la cache delle pagine pubbliche e admin
    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath('/admin/blog')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
