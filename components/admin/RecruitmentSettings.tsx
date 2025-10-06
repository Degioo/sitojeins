'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowLeft, Save, Play, Pause } from 'lucide-react'
import Link from 'next/link'

const recruitmentSettingsSchema = z.object({
  isOpen: z.boolean(),
  openDate: z.string().optional(),
  closeDate: z.string().optional(),
  description: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  googleFormUrl: z.string().url().optional().or(z.literal('')),
})

type RecruitmentSettingsData = z.infer<typeof recruitmentSettingsSchema>

interface RecruitmentSettingsProps {
  recruitment?: {
    id: string
    isOpen: boolean
    openDate?: Date
    closeDate?: Date
    description?: string
    requirements?: string
    benefits?: string
    googleFormUrl?: string
  }
}

export default function RecruitmentSettings({ recruitment }: RecruitmentSettingsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<RecruitmentSettingsData>({
    resolver: zodResolver(recruitmentSettingsSchema),
    defaultValues: recruitment ? {
      isOpen: recruitment.isOpen,
      openDate: recruitment.openDate ? new Date(recruitment.openDate).toISOString().split('T')[0] : '',
      closeDate: recruitment.closeDate ? new Date(recruitment.closeDate).toISOString().split('T')[0] : '',
      description: recruitment.description || '',
      requirements: recruitment.requirements || '',
      benefits: recruitment.benefits || '',
      googleFormUrl: recruitment.googleFormUrl || '',
    } : {
      isOpen: false,
      openDate: '',
      closeDate: '',
      description: '',
      requirements: '',
      benefits: '',
      googleFormUrl: '',
    }
  })

  const isOpen = watch('isOpen')

  const onSubmit = async (data: RecruitmentSettingsData) => {
    setIsLoading(true)
    try {
      const url = recruitment ? `/api/recruitment/settings/${recruitment.id}` : '/api/recruitment/settings'
      const method = recruitment ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          openDate: data.openDate ? new Date(data.openDate).toISOString() : null,
          closeDate: data.closeDate ? new Date(data.closeDate).toISOString() : null,
        }),
      })

      if (response.ok) {
        toast.success('Impostazioni aggiornate!')
        router.push('/admin/recruitment')
      } else {
        toast.error('Errore durante il salvataggio')
      }
    } catch (error) {
      toast.error('Errore durante il salvataggio')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleRecruitment = () => {
    setValue('isOpen', !isOpen)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/recruitment"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Impostazioni Recruitment
          </h1>
          <p className="text-gray-600">
            Configura le impostazioni per il processo di selezione
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Recruitment Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Stato Recruitment</h2>
            <button
              type="button"
              onClick={toggleRecruitment}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isOpen
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isOpen ? (
                <>
                  <Pause className="h-4 w-4" />
                  Chiudi Recruitment
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Apri Recruitment
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              {...register('isOpen')}
              type="checkbox"
              id="isOpen"
              className="h-4 w-4 text-insubria-600 focus:ring-insubria-500 border-gray-300 rounded"
            />
            <label htmlFor="isOpen" className="text-sm text-gray-900">
              Recruitment attualmente aperto
            </label>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Date Importanti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="openDate" className="block text-sm font-medium text-gray-700 mb-2">
                Data di Apertura
              </label>
              <input
                {...register('openDate')}
                type="date"
                id="openDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Data in cui il recruitment sarà aperto
              </p>
            </div>
            <div>
              <label htmlFor="closeDate" className="block text-sm font-medium text-gray-700 mb-2">
                Data di Chiusura
              </label>
              <input
                {...register('closeDate')}
                type="date"
                id="closeDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Data limite per l&apos;invio delle candidature
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Descrizione</h2>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
            placeholder="Descrizione generale del processo di recruitment..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Questa descrizione apparirà nella pagina di recruitment pubblica
          </p>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Requisiti</h2>
          <textarea
            {...register('requirements')}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
            placeholder="Requisiti per partecipare al recruitment..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Elenca i requisiti necessari per candidarsi
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Benefici</h2>
          <textarea
            {...register('benefits')}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
            placeholder="Benefici e opportunità offerte..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Descrivi i vantaggi di far parte del team JEIns
          </p>
        </div>

        {/* Google Form URL */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Google Form</h2>
          <input
            {...register('googleFormUrl')}
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
            placeholder="https://forms.gle/..."
          />
          <p className="mt-1 text-xs text-gray-500">
            URL del Google Form per le candidature. Se vuoto, verrà mostrato un link di esempio.
          </p>
          {errors.googleFormUrl && (
            <p className="mt-1 text-xs text-red-500">
              {errors.googleFormUrl.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/recruitment"
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
            {isLoading ? 'Salvataggio...' : 'Salva Impostazioni'}
          </button>
        </div>
      </form>
    </div>
  )
}
