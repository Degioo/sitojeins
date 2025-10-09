'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Il nome è obbligatorio'),
  role: z.string().min(1, 'Il ruolo è obbligatorio'),
  image: z.string().optional(),
  description: z.string().optional(),
  order: z.number().min(0, 'L\'ordine deve essere maggiore o uguale a 0'),
  isActive: z.boolean(),
})

type TeamMemberFormData = z.infer<typeof teamMemberSchema>

interface TeamMemberFormProps {
  member?: {
    id: string
    name: string
    role: string
    image?: string
    description?: string
    order: number
    isActive: boolean
  }
}

export default function TeamMemberForm({ member }: TeamMemberFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(member?.image || '')
  const [isUploading, setIsUploading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: member || {
      name: '',
      role: '',
      image: '',
      description: '',
      order: 0,
      isActive: true,
    }
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Verifica che sia un'immagine
    if (!file.type.startsWith('image/')) {
      toast.error('Per favore carica un\'immagine')
      return
    }

    // Verifica dimensione (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'immagine deve essere inferiore a 5MB')
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'team')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        setImageUrl(url)
        toast.success('Immagine caricata!')
      } else {
        toast.error('Errore durante il caricamento')
      }
    } catch (error) {
      toast.error('Errore durante il caricamento')
    } finally {
      setIsUploading(false)
    }
  }

  const onSubmit = async (data: TeamMemberFormData) => {
    setIsLoading(true)
    try {
      const url = member ? `/api/team/${member.id}` : '/api/team'
      const method = member ? 'PUT' : 'POST'

      // Usa l'immagine caricata se presente
      const submitData = {
        ...data,
        image: imageUrl || data.image
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        toast.success(member ? 'Membro aggiornato!' : 'Membro aggiunto!')
        router.push('/admin/team')
        router.refresh()
      } else{
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
          href="/admin/team"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {member ? 'Modifica Membro' : 'Nuovo Membro'}
          </h1>
          <p className="text-gray-600">
            {member ? 'Modifica i dettagli del membro del team' : 'Aggiungi un nuovo membro al team'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                placeholder="Es. Marco Rossi"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Ruolo *
              </label>
              <input
                {...register('role')}
                type="text"
                id="role"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                placeholder="Es. Presidente"
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto Membro
              </label>
              
              {/* Preview immagine */}
              {imageUrl && (
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Rimuovi immagine
                  </button>
                </div>
              )}

              {/* Upload file */}
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-2">
                  Opzione 1: Carica un&apos;immagine
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-insubria-50 file:text-insubria-700 hover:file:bg-insubria-100 disabled:opacity-50"
                />
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF fino a 5MB. Consigliato: 500x500px
                </p>
                {isUploading && (
                  <p className="mt-2 text-sm text-insubria-600">Caricamento in corso...</p>
                )}
              </div>

              {/* URL manuale */}
              <div>
                <label htmlFor="image" className="block text-sm text-gray-600 mb-2">
                  Opzione 2: Inserisci URL immagine
                </label>
                <input
                  {...register('image')}
                  type="url"
                  id="image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                  placeholder="https://example.com/foto.jpg"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Oppure incolla l&apos;URL di un&apos;immagine già online
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                Ordine di visualizzazione *
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
              Descrizione
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              placeholder="Breve descrizione del membro..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Informazioni sul background e competenze
            </p>
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
                Membro attivo
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/team"
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
