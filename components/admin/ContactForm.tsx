'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

const contactSchema = z.object({
  type: z.enum(['email', 'phone', 'address', 'facebook', 'instagram', 'linkedin']),
  value: z.string().min(1, 'Il valore è obbligatorio'),
  label: z.string().optional(),
  order: z.number().min(0, 'L\'ordine deve essere maggiore o uguale a 0'),
  isActive: z.boolean(),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  contact?: {
    id: string
    type: string
    value: string
    label?: string
    order: number
    isActive: boolean
  }
}

const contactTypes = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Telefono' },
  { value: 'address', label: 'Indirizzo' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
]

export default function ContactForm({ contact }: ContactFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact || {
      type: 'email',
      value: '',
      label: '',
      order: 0,
      isActive: true,
    }
  })

  const selectedType = watch('type')

  const getPlaceholder = (type: string) => {
    switch (type) {
      case 'email':
        return 'info@jeins.it'
      case 'phone':
        return '+39 0332 218811'
      case 'address':
        return 'Via Ravasi, 2, 21100 Varese VA'
      case 'facebook':
        return 'https://facebook.com/jeins.insubria'
      case 'instagram':
        return 'https://instagram.com/jeins_insubria'
      case 'linkedin':
        return 'https://linkedin.com/company/jeins'
      default:
        return ''
    }
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    try {
      const url = contact ? `/api/contacts/${contact.id}` : '/api/contacts'
      const method = contact ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success(contact ? 'Contatto aggiornato!' : 'Contatto creato!')
        router.push('/admin/contacts')
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
          href="/admin/contacts"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {contact ? 'Modifica Contatto' : 'Nuovo Contatto'}
          </h1>
          <p className="text-gray-600">
            {contact ? 'Modifica le informazioni di contatto' : 'Aggiungi un nuovo contatto'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo *
              </label>
              <select
                {...register('type')}
                id="type"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              >
                {contactTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
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
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
              Valore *
            </label>
            <input
              {...register('value')}
              type={selectedType === 'email' ? 'email' : 'text'}
              id="value"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              placeholder={getPlaceholder(selectedType)}
            />
            {errors.value && (
              <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
            )}
          </div>

          <div className="mt-6">
            <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-2">
              Etichetta (opzionale)
            </label>
            <input
              {...register('label')}
              type="text"
              id="label"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              placeholder="Es. Email principale"
            />
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
                Contatto attivo
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/contacts"
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
