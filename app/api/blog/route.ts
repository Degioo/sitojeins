import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  tags: z.string().optional(),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().optional(),
})

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = blogPostSchema.parse(body)

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: data.slug }
    })

    if (existingPost) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        publishedAt: data.isPublished ? new Date(data.publishedAt || new Date()) : null,
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
