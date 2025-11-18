'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowLeft, Save, Play, Pause, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

const recruitmentSettingsSchema = z.object({
  isOpen: z.boolean(),
  openDate: z.string().optional(),
  closeDate: z.string().optional(),
  description: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  tallyFormUrl: z.string().url().optional().or(z.literal('')),
  notionSheetUrl: z.string().url().optional().or(z.literal('')),
  faqs: z.string().optional(),
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
    tallyFormUrl?: string
    notionSheetUrl?: string
    faqs?: string
  }
}

export default function RecruitmentSettings({ recruitment }: RecruitmentSettingsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // Parse FAQ from recruitment data
  const initialFaqs = recruitment?.faqs 
    ? JSON.parse(recruitment.faqs) 
    : [{ question: '', answer: '' }]
  
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>(initialFaqs)

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
      tallyFormUrl: recruitment.tallyFormUrl || '',
      notionSheetUrl: recruitment.notionSheetUrl || '',
      faqs: recruitment.faqs || '',
    } : {
      isOpen: false,
      openDate: '',
      closeDate: '',
      description: '',
      requirements: '',
      benefits: '',
      tallyFormUrl: '',
      notionSheetUrl: '',
      faqs: '',
    }
  })

  const isOpen = watch('isOpen')

  const onSubmit = async (data: RecruitmentSettingsData) => {
    setIsLoading(true)
    try {
      const url = recruitment ? `/api/recruitment/settings/${recruitment.id}` : '/api/recruitment/settings'
      const method = recruitment ? 'PUT' : 'POST'
      
      // Filter out empty FAQs
      const validFaqs = faqs.filter(faq => faq.question.trim() && faq.answer.trim())

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          openDate: data.openDate ? new Date(data.openDate).toISOString() : null,
          closeDate: data.closeDate ? new Date(data.closeDate).toISOString() : null,
          faqs: validFaqs.length > 0 ? JSON.stringify(validFaqs) : null,
        }),
      })

      if (response.ok) {
        toast.success('Impostazioni aggiornate!')
        router.push('/admin/recruitment')
        router.refresh()
      } else {
        toast.error('Errore durante il salvataggio')
      }
    } catch (error) {
      toast.error('Errore durante il salvataggio')
    } finally {
      setIsLoading(false)
    }
  }
  
  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }])
  }
  
  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index))
  }
  
  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...faqs]
    newFaqs[index][field] = value
    setFaqs(newFaqs)
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

        {/* Tally Form URL */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tally Form</h2>
          <div className="mb-4">
            <label htmlFor="tallyFormUrl" className="block text-sm font-medium text-gray-700 mb-2">
              URL Tally Form
            </label>
            <input
              {...register('tallyFormUrl')}
              type="text"
              id="tallyFormUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              placeholder="https://tally.so/r/..."
            />
            <p className="mt-1 text-xs text-gray-500">
              URL del form Tally per le candidature
            </p>
            {errors.tallyFormUrl && (
              <p className="mt-1 text-xs text-red-500">
                {errors.tallyFormUrl.message}
              </p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">📝 Come ottenere il link Tally</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Apri il tuo form su Tally</li>
              <li>Clicca su <strong>&quot;Condividi&quot;</strong> in alto a destra</li>
              <li>Copia il link pubblico del form</li>
              <li>Incollalo nel campo sopra</li>
            </ol>
            <p className="mt-2 text-xs text-blue-700">
              💡 Puoi modificare questo link in qualsiasi momento dalle impostazioni
            </p>
          </div>
        </div>

        {/* Notion Sheet URL */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notion Database</h2>
          <div className="mb-4">
            <label htmlFor="notionSheetUrl" className="block text-sm font-medium text-gray-700 mb-2">
              URL Notion Database
            </label>
            <input
              {...register('notionSheetUrl')}
              type="text"
              id="notionSheetUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              placeholder="https://www.notion.so/..."
            />
            <p className="mt-1 text-xs text-gray-500">
              URL del database Notion dove vengono salvate le candidature
            </p>
            {errors.notionSheetUrl && (
              <p className="mt-1 text-xs text-red-500">
                {errors.notionSheetUrl.message}
              </p>
            )}
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">📝 Come ottenere il link Notion</h4>
            <ol className="text-sm text-purple-800 space-y-1 list-decimal list-inside">
              <li>Apri il tuo database su Notion</li>
              <li>Clicca su <strong>&quot;Condividi&quot;</strong> in alto a destra</li>
              <li>Assicurati che il database sia accessibile (pubblico o con permessi appropriati)</li>
              <li>Copia il link del database</li>
              <li>Incollalo nel campo sopra</li>
            </ol>
            <p className="mt-2 text-xs text-purple-700">
              💡 Puoi modificare questo link in qualsiasi momento dalle impostazioni
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Domande Frequenti (FAQ)</h2>
            <button
              type="button"
              onClick={addFaq}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-insubria-600 text-white rounded-lg hover:bg-insubria-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Aggiungi FAQ
            </button>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">FAQ #{index + 1}</h3>
                  {faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label htmlFor={`faq-question-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Domanda
                    </label>
                    <input
                      type="text"
                      id={`faq-question-${index}`}
                      value={faq.question}
                      onChange={(e) => updateFaq(index, 'question', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                      placeholder="Es: Come funziona il processo di selezione?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`faq-answer-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Risposta
                    </label>
                    <textarea
                      id={`faq-answer-${index}`}
                      value={faq.answer}
                      onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                      placeholder="Scrivi la risposta..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="mt-4 text-xs text-gray-500">
            Le FAQ verranno mostrate nella pagina pubblica del recruitment
          </p>
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
