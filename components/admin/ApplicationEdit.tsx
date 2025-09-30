'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowLeft, Save, Mail, FileText } from 'lucide-react'
import Link from 'next/link'

const statusUpdateSchema = z.object({
  status: z.enum(['pending', 'reviewed', 'accepted', 'rejected']),
  notes: z.string().optional(),
})

type StatusUpdateData = z.infer<typeof statusUpdateSchema>

interface ApplicationEditProps {
  application: {
    id: string
    name: string
    email: string
    course: string
    year: string
    roles: string
    status: string
    notes?: string
    cvUrl?: string
  }
}

const statusOptions = [
  { value: 'pending', label: 'In Attesa', color: 'text-yellow-600' },
  { value: 'reviewed', label: 'In Revisione', color: 'text-blue-600' },
  { value: 'accepted', label: 'Accettata', color: 'text-green-600' },
  { value: 'rejected', label: 'Rifiutata', color: 'text-red-600' },
]

export default function ApplicationEdit({ application }: ApplicationEditProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<StatusUpdateData>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: {
      status: application.status as any,
      notes: application.notes || '',
    }
  })

  const selectedStatus = watch('status')

  const onSubmit = async (data: StatusUpdateData) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/recruitment/${application.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Stato aggiornato con successo!')
        router.push(`/admin/recruitment/${application.id}`)
      } else {
        toast.error('Errore durante l\'aggiornamento')
      }
    } catch (error) {
      toast.error('Errore durante l\'aggiornamento')
    } finally {
      setIsLoading(false)
    }
  }

  const roles = application.roles ? JSON.parse(application.roles) : []

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={`/admin/recruitment/${application.id}`}
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Modifica Candidatura
          </h1>
          <p className="text-gray-600">
            Aggiorna lo stato e le note per {application.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Riepilogo Candidatura</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Nome</p>
                <p className="text-sm text-gray-900">{application.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{application.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Corso</p>
                <p className="text-sm text-gray-900">{application.course} - Anno {application.year}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ruoli di Interesse</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {roles.slice(0, 3).map((role: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-insubria-100 text-insubria-800"
                    >
                      {role}
                    </span>
                  ))}
                  {roles.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{roles.length - 3} altri
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Update Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Aggiorna Stato</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Nuovo Stato *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedStatus === option.value
                          ? 'border-insubria-500 bg-insubria-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        {...register('status')}
                        type="radio"
                        value={option.value}
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          selectedStatus === option.value ? 'bg-insubria-500' : 'bg-gray-300'
                        }`} />
                        <span className={`text-sm font-medium ${option.color}`}>
                          {option.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Note Aggiuntive
                </label>
                <textarea
                  {...register('notes')}
                  id="notes"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                  placeholder="Aggiungi note per il candidato o per il team..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Queste note saranno visibili al team ma non al candidato
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link
                href={`/admin/recruitment/${application.id}`}
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
                {isLoading ? 'Salvataggio...' : 'Salva Modifiche'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
