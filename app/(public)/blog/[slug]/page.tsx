import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Calendar, User, Tag } from 'lucide-react'
import Image from 'next/image'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getBlogPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { 
      slug,
      isPublished: true
    }
  })

  if (!post) {
    notFound()
  }

  return post
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  
  return {
    title: `${post.title} - JEIns Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  const tags = post.tags ? JSON.parse(post.tags) : []

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 section-green relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-white/90 mb-8">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('it-IT')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>JEIns Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {post.featuredImage && (
              <div className="aspect-video w-full">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="px-8 pb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex px-3 py-1 bg-insubria-100 text-insubria-800 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
