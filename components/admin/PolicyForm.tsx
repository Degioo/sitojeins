'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowLeft, Save, Eye, FileText } from 'lucide-react'
import Link from 'next/link'
import RichTextEditor from './RichTextEditor'

const policySchema = z.object({
  title: z.string().min(1, 'Il titolo è obbligatorio'),
  content: z.string().min(1, 'Il contenuto è obbligatorio'),
  isActive: z.boolean(),
  version: z.string().min(1, 'La versione è obbligatoria'),
})

type PolicyData = z.infer<typeof policySchema>

interface PolicyFormProps {
  policy?: {
    id: string
    type: 'privacy' | 'cookie'
    title: string
    content: string
    isActive: boolean
    version: string
  }
  type: 'privacy' | 'cookie'
}

export default function PolicyForm({ policy, type }: PolicyFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState(policy?.content || '')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<PolicyData>({
    resolver: zodResolver(policySchema),
    defaultValues: policy ? {
      title: policy.title,
      content: policy.content,
      isActive: policy.isActive,
      version: policy.version,
    } : {
      title: type === 'privacy' ? 'Privacy Policy' : 'Cookie Policy',
      content: '',
      isActive: true,
      version: '1.0',
    }
  })

  const isActive = watch('isActive')

  const onSubmit = async (data: PolicyData) => {
    setIsLoading(true)
    try {
      const url = policy ? `/api/policies/${policy.id}` : '/api/policies'
      const method = policy ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          content,
          type,
        }),
      })

      if (response.ok) {
        toast.success('Policy salvata con successo!')
        router.push('/admin/policies')
      } else {
        toast.error('Errore durante il salvataggio')
      }
    } catch (error) {
      toast.error('Errore durante il salvataggio')
    } finally {
      setIsLoading(false)
    }
  }

  const getPolicyIcon = () => {
    return type === 'privacy' ? (
      <div className="p-3 rounded-lg bg-insubria-100">
        <FileText className="h-6 w-6 text-insubria-600" />
      </div>
    ) : (
      <div className="p-3 rounded-lg bg-blue-100">
        <FileText className="h-6 w-6 text-blue-600" />
      </div>
    )
  }

  const getPolicyColor = () => {
    return type === 'privacy' ? 'insubria' : 'blue'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/policies"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        {getPolicyIcon()}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {policy ? 'Modifica' : 'Crea'} {type === 'privacy' ? 'Privacy Policy' : 'Cookie Policy'}
          </h1>
          <p className="text-gray-600">
            {policy ? 'Modifica la policy esistente' : 'Crea una nuova policy per il sito'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Informazioni Base</h2>
          
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
                placeholder={type === 'privacy' ? 'Privacy Policy' : 'Cookie Policy'}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-2">
                Versione *
              </label>
              <input
                {...register('version')}
                type="text"
                id="version"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                placeholder="1.0"
              />
              {errors.version && (
                <p className="mt-1 text-sm text-red-600">{errors.version.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-2">
              <input
                {...register('isActive')}
                type="checkbox"
                id="isActive"
                className="h-4 w-4 text-insubria-600 focus:ring-insubria-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="text-sm text-gray-900">
                Policy attiva (visibile pubblicamente)
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Solo le policy attive saranno visibili sul sito pubblico
            </p>
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Contenuto</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenuto della Policy *
              </label>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder={`Inserisci il contenuto della ${type === 'privacy' ? 'privacy policy' : 'cookie policy'}...`}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            {/* Content Preview */}
            {content && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anteprima Contenuto
                </label>
                <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto border">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legal Guidelines */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Linee Guida Legali</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {type === 'privacy' ? 'Privacy Policy' : 'Cookie Policy'} - Elementi Essenziali
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {type === 'privacy' ? (
                  <>
                    <li>• Identificazione del titolare del trattamento</li>
                    <li>• Finalità e base giuridica del trattamento</li>
                    <li>• Categorie di dati personali</li>
                    <li>• Diritti dell'interessato (GDPR)</li>
                    <li>• Periodo di conservazione</li>
                    <li>• Trasferimenti internazionali</li>
                  </>
                ) : (
                  <>
                    <li>• Definizione di cookie e tecnologie simili</li>
                    <li>• Tipologie di cookie utilizzati</li>
                    <li>• Finalità e durata dei cookie</li>
                    <li>• Gestione delle preferenze</li>
                    <li>• Cookie di terze parti</li>
                    <li>• Aggiornamenti della policy</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Raccomandazioni</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Utilizza un linguaggio chiaro e comprensibile</li>
                <li>• Aggiorna regolarmente la versione</li>
                <li>• Mantieni traccia delle modifiche</li>
                <li>• Assicurati della conformità GDPR</li>
                <li>• Includi informazioni di contatto</li>
                <li>• Specifica la data di ultima modifica</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/policies"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annulla
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-${getPolicyColor()}-600 text-white px-4 py-2 rounded-lg hover:bg-${getPolicyColor()}-700 transition-colors flex items-center gap-2 disabled:opacity-50`}
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Salvataggio...' : 'Salva Policy'}
          </button>
        </div>
      </form>
    </div>
  )
}
