'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import Link from 'next/link'

const projectSchema = z.object({
  title: z.string().min(1, 'Il titolo è obbligatorio'),
  description: z.string().min(1, 'La descrizione è obbligatoria'),
  image: z.string().optional(),
  tags: z.string().optional(),
  client: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  order: z.number().min(0, 'L\'ordine deve essere maggiore o uguale a 0'),
  isActive: z.boolean().default(true),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: {
    id: string
    title: string
    description: string
    image?: string
    tags?: string
    client?: string
    year?: number
    order: number
    isActive: boolean
  }
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>(project?.tags ? JSON.parse(project.tags) : [])
  const [newTag, setNewTag] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {
      title: '',
      description: '',
      image: '',
      tags: '',
      client: '',
      year: new Date().getFullYear(),
      order: 0,
      isActive: true,
    }
  })

  const isActive = watch('isActive')

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

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true)
    try {
      const url = project ? `/api/projects/${project.id}` : '/api/projects'
      const method = project ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success(project ? 'Progetto aggiornato!' : 'Progetto creato!')
        router.push('/admin/projects')
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
          href="/admin/projects"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {project ? 'Modifica Progetto' : 'Nuovo Progetto'}
          </h1>
          <p className="text-gray-600">
            {project ? 'Modifica i dettagli del progetto' : 'Aggiungi un nuovo progetto al portfolio'}
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
                placeholder="Es. Sito Web Aziendale"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">
                Cliente
              </label>
              <input
                {...register('client')}
                type="text"
                id="client"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                placeholder="Es. Azienda XYZ"
              />
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Anno
              </label>
              <input
                {...register('year', { valueAsNumber: true })}
                type="number"
                id="year"
                min="1900"
                max={new Date().getFullYear() + 1}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
              {errors.year && (
                <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                Ordine di visualizzazione
              </label>
              <input
                {...register('order', { valueAsNumber: true })}
                type="number"
                id="order"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
              {errors.order && (
                <p className="mt-1 text-sm text-red-600">{errors.order.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descrizione *
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              placeholder="Descrizione dettagliata del progetto..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="mt-6">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              URL Immagine
            </label>
            <input
              {...register('image')}
              type="url"
              id="image"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              placeholder="https://example.com/image.jpg"
            />
            <p className="mt-1 text-xs text-gray-500">
              URL dell'immagine del progetto
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
                {...register('isActive')}
                type="checkbox"
                id="isActive"
                className="h-4 w-4 text-insubria-600 focus:ring-insubria-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Progetto attivo
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/projects"
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
