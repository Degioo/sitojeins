import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import BlogPostForm from '@/components/admin/BlogPostForm'

interface EditBlogPostPageProps {
  params: {
    id: string
  }
}

async function getBlogPost(id: string) {
  const post = await prisma.blogPost.findUnique({
    where: { id }
  })

  if (!post) {
    notFound()
  }

  return post
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const post = await getBlogPost(params.id)

  return <BlogPostForm post={post} />
}
