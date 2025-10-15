import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Calendar, User, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Ricarica i dati ogni 60 secondi
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog - JEIns | Articoli e News sulla Junior Enterprise',
  description: 'Scopri gli ultimi articoli e news di JEIns. Approfondimenti su consulenza aziendale, progetti universitari, eventi e opportunità per studenti dell\'Università dell\'Insubria.',
  keywords: 'blog JEIns, articoli Junior Enterprise, news università, progetti studenti, consulenza aziendale blog',
  openGraph: {
    title: 'Blog - JEIns | Articoli e News sulla Junior Enterprise',
    description: 'Scopri gli ultimi articoli e news di JEIns su consulenza aziendale e progetti universitari.',
    url: 'https://jeins.it/blog',
  },
  alternates: {
    canonical: 'https://jeins.it/blog',
  },
}

async function getPublishedPosts() {
  return await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    take: 6
  })
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 section-green relative overflow-hidden">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
        <div className="decorative-strip decorative-strip-bottom"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 newspaper-headline">
            Blog JEIns
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Scopri gli ultimi articoli, approfondimenti e novità dal mondo delle Junior Enterprise
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 section-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ultimi Articoli
            </h2>
            <p className="text-lg text-gray-600">
              Approfondimenti, guide e novità dal team JEIns
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {posts.map((post) => {
                const tags = post.tags ? JSON.parse(post.tags) : []
                return (
                  <article key={post.id} className="bg-white border-2 border-insubria-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full h-full flex flex-col">
                    {post.featuredImage && (
                      <div className="aspect-video w-full">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('it-IT')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>JEIns Team</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>
                      )}

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                          {tags.slice(0, 3).map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 bg-insubria-100 text-insubria-800 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{tags.length - 3} altri
                            </span>
                          )}
                        </div>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-insubria-600 hover:text-insubria-700 font-medium transition-colors"
                      >
                        Leggi tutto
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <Tag className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nessun articolo pubblicato
              </h3>
              <p className="text-gray-500">
                Gli articoli del blog saranno disponibili presto.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
