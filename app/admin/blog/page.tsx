import { prisma } from '@/lib/prisma'

// Forza ricaricamento dal DB ad ogni visita
export const revalidate = 0
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, User, Tag } from 'lucide-react'
import Link from 'next/link'

async function getBlogPosts() {
  return await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600">Gestisci gli articoli del blog JEIns</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuovo Articolo
        </Link>
      </div>

      {blogPosts.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Lista Articoli</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Articolo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogPosts.map((post) => {
                  const tags = post.tags ? JSON.parse(post.tags) : []
                  return (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {post.featuredImage && (
                            <div className="flex-shrink-0 h-12 w-12">
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={post.featuredImage}
                                alt={post.title}
                              />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {post.title}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {post.excerpt || 'Nessun estratto'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">
                          /{post.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {tags.slice(0, 2).map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-insubria-100 text-insubria-800"
                            >
                              {tag}
                            </span>
                          ))}
                          {tags.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {new Date(post.createdAt).toLocaleDateString('it-IT')}
                          </span>
                        </div>
                        {post.publishedAt && (
                          <div className="text-xs text-gray-500 mt-1">
                            Pubblicato: {new Date(post.publishedAt).toLocaleDateString('it-IT')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.isPublished ? 'Pubblicato' : 'Bozza'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/blog/${post.id}/edit`}
                            className="text-insubria-600 hover:text-insubria-900"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          {post.isPublished && (
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          )}
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Plus className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nessun articolo</h3>
          <p className="mt-1 text-sm text-gray-500">
            Inizia scrivendo il primo articolo del blog.
          </p>
          <div className="mt-6">
            <Link
              href="/admin/blog/new"
              className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Nuovo Articolo
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
