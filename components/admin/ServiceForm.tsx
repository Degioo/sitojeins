'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

const serviceSchema = z.object({
  title: z.string().min(1, 'Il titolo è obbligatorio'),
  description: z.string().min(1, 'La descrizione è obbligatoria'),
  sector: z.string().min(1, 'Il settore è obbligatorio'),
  icon: z.string().optional(),
  order: z.number().min(0, 'L&apos;ordine deve essere maggiore o uguale a 0'),
  isActive: z.boolean().default(true),
})

type ServiceFormData = z.infer<typeof serviceSchema>

interface ServiceFormProps {
  service?: {
    id: string
    title: string
    description: string
    sector: string
    icon?: string
    order: number
    isActive: boolean
  }
}

export default function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service || {
      title: '',
      description: '',
      sector: '',
      icon: '',
      order: 0,
      isActive: true,
    }
  })

  const isActive = watch('isActive')

  const onSubmit = async (data: ServiceFormData) => {
    setIsLoading(true)
    try {
      const url = service ? `/api/services/${service.id}` : '/api/services'
      const method = service ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success(service ? 'Servizio aggiornato!' : 'Servizio creato!')
        router.push('/admin/services')
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
          href="/admin/services"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {service ? 'Modifica Servizio' : 'Nuovo Servizio'}
          </h1>
          <p className="text-gray-600">
            {service ? 'Modifica i dettagli del servizio' : 'Aggiungi un nuovo servizio'}
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
                placeholder="Es. Consulenza Strategica"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                Settore *
              </label>
              <input
                {...register('sector')}
                type="text"
                id="sector"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                placeholder="Es. Business Strategy"
              />
              {errors.sector && (
                <p className="mt-1 text-sm text-red-600">{errors.sector.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                Icona (opzionale)
              </label>
              <input
                {...register('icon')}
                type="text"
                id="icon"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                placeholder="Es. Briefcase"
              />
              <p className="mt-1 text-xs text-gray-500">
                Nome dell&apos;icona da Lucide React
              </p>
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
              placeholder="Descrizione dettagliata del servizio..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
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
                Servizio attivo
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/services"
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
