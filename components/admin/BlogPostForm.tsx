'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowLeft, Save, Upload, X, Calendar } from 'lucide-react'
import Link from 'next/link'
import RichTextEditor from '@/components/admin/RichTextEditor'

const blogPostSchema = z.object({
  title: z.string().min(1, 'Il titolo è obbligatorio'),
  slug: z.string().min(1, 'Lo slug è obbligatorio'),
  content: z.string().min(1, 'Il contenuto è obbligatorio'),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  tags: z.string().optional(),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().optional(),
})

type BlogPostFormData = z.infer<typeof blogPostSchema>

interface BlogPostFormProps {
  post?: {
    id: string
    title: string
    slug: string
    content: string
    excerpt?: string
    featuredImage?: string
    tags?: string
    isPublished: boolean
    publishedAt?: Date
  }
}

export default function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>(post?.tags ? JSON.parse(post.tags) : [])
  const [newTag, setNewTag] = useState('')
  const [content, setContent] = useState(post?.content || '')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: post || {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featuredImage: '',
      tags: '',
      isPublished: false,
      publishedAt: '',
    }
  })

  const title = watch('title')
  const isPublished = watch('isPublished')

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !post) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setValue('slug', slug)
    }
  }, [title, setValue, post])

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()]
      setTags(updatedTags)
      setValue('tags', JSON.stringify(updatedTags))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove)
    setTags(updatedTags)
    setValue('tags', JSON.stringify(updatedTags))
  }

  const onSubmit = async (data: BlogPostFormData) => {
    setIsLoading(true)
    try {
      const url = post ? `/api/blog/${post.id}` : '/api/blog'
      const method = post ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          content,
          publishedAt: data.isPublished && !post?.publishedAt ? new Date().toISOString() : data.publishedAt,
        }),
      })

      if (response.ok) {
        toast.success(post ? 'Articolo aggiornato!' : 'Articolo creato!')
        router.push('/admin/blog')
      } else {
        toast.error('Errore durante il salvataggio')
      }
    } catch (error) {
      toast.error('Errore durante il salvataggio')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {post ? 'Modifica Articolo' : 'Nuovo Articolo'}
          </h1>
          <p className="text-gray-600">
            {post ? 'Modifica l\'articolo del blog' : 'Scrivi un nuovo articolo per il blog'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titolo *
              </label>
              <input
                {...register('title')}
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                placeholder="Es. Come iniziare con JEIns"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                {...register('slug')}
                type="text"
                id="slug"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                placeholder="come-iniziare-con-jeins"
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                URL dell'articolo: /blog/{watch('slug')}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Estratto
            </label>
            <textarea
              {...register('excerpt')}
              id="excerpt"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              placeholder="Breve descrizione dell'articolo..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Estratto che apparirà nelle liste e nei social media
            </p>
          </div>

          <div className="mt-6">
            <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
              Immagine in evidenza
            </label>
            <input
              {...register('featuredImage')}
              type="url"
              id="featuredImage"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              placeholder="https://example.com/image.jpg"
            />
            <p className="mt-1 text-xs text-gray-500">
              URL dell'immagine principale dell'articolo
            </p>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                placeholder="Aggiungi un tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors"
              >
                Aggiungi
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-insubria-100 text-insubria-800 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-insubria-600 hover:text-insubria-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <input
                {...register('isPublished')}
                type="checkbox"
                id="isPublished"
                className="h-4 w-4 text-insubria-600 focus:ring-insubria-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                Pubblica articolo
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Se deselezionato, l'articolo rimarrà come bozza
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Contenuto *
          </label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Inizia a scrivere il tuo articolo..."
          />
          {errors.content && (
            <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/blog"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annulla
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Salvataggio...' : 'Salva'}
          </button>
        </div>
      </form>
    </div>
  )
}
