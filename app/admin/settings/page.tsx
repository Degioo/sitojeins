'use client'

import { useState, useEffect } from 'react'
import { Settings, Eye, EyeOff, Save, RotateCcw, Home, BarChart3, Briefcase, Mail, MessageSquare, Users } from 'lucide-react'
import toast from 'react-hot-toast'

interface HomeSection {
  id: string
  name: string
  title?: string
  subtitle?: string
  description?: string
  isActive: boolean
  order: number
  config?: string
}

const sectionIcons = {
  hero: Home,
  services: Briefcase,
  stats: BarChart3,
  portfolio: Briefcase,
  newsletter: Mail,
  contact: MessageSquare
}

const sectionLabels = {
  hero: 'Sezione Hero',
  services: 'Servizi in evidenza',
  stats: 'Statistiche',
  portfolio: 'Portfolio/Progetti',
  newsletter: 'Newsletter',
  contact: 'Contatto rapido'
}

export default function SettingsPage() {
  const [sections, setSections] = useState<HomeSection[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSections()
  }, [])

  const fetchSections = async () => {
    try {
      const response = await fetch('/api/admin/home-sections')
      if (response.ok) {
        const data = await response.json()
        setSections(data)
      } else {
        // Se non ci sono sezioni nel DB, crea quelle di default
        const defaultSections = [
          {
            id: 'hero',
            name: 'hero',
            title: "Mostriamo il valore degli studenti dell'Insubria",
            subtitle: 'Consulenza, progetti e crescita: per aziende e studenti',
            description: 'Sezione principale della homepage con call-to-action',
            isActive: true,
            order: 1
          },
          {
            id: 'services',
            name: 'services',
            title: 'I nostri servizi',
            subtitle: 'Soluzioni innovative e personalizzate per aziende di ogni dimensione',
            description: 'Mostra i primi 3 servizi attivi',
            isActive: true,
            order: 2
          },
          {
            id: 'stats',
            name: 'stats',
            title: 'I nostri numeri',
            subtitle: 'Risultati che testimoniano il nostro impegno e la nostra crescita',
            description: 'Statistiche sui progetti, servizi, team e candidature',
            isActive: true,
            order: 3
          },
          {
            id: 'portfolio',
            name: 'portfolio',
            title: 'I nostri progetti',
            subtitle: 'Alcuni esempi dei progetti che abbiamo realizzato',
            description: 'Mostra i primi 6 progetti attivi',
            isActive: true,
            order: 4
          },
          {
            id: 'newsletter',
            name: 'newsletter',
            title: 'Newsletter',
            subtitle: 'Resta aggiornato sulle nostre attività',
            description: 'Form di iscrizione alla newsletter',
            isActive: true,
            order: 5
          },
          {
            id: 'contact',
            name: 'contact',
            title: 'Contatto rapido',
            subtitle: 'Hai un progetto in mente? Contattaci per una consulenza gratuita',
            description: 'Form di contatto rapido',
            isActive: true,
            order: 6
          }
        ]
        setSections(defaultSections)
      }
    } catch (error) {
      toast.error('Errore nel caricare le sezioni')
    } finally {
      setLoading(false)
    }
  }

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isActive: !section.isActive }
        : section
    ))
  }

  const updateSection = (sectionId: string, field: keyof HomeSection, value: any) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, [field]: value }
        : section
    ))
  }

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    setSections(prev => {
      const sortedSections = [...prev].sort((a, b) => a.order - b.order)
      const currentIndex = sortedSections.findIndex(s => s.id === sectionId)
      
      if (currentIndex === -1) return prev
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
      
      if (newIndex < 0 || newIndex >= sortedSections.length) return prev
      
      // Swap orders
      const temp = sortedSections[currentIndex].order
      sortedSections[currentIndex].order = sortedSections[newIndex].order
      sortedSections[newIndex].order = temp
      
      return sortedSections
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/home-sections', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sections),
      })

      if (response.ok) {
        toast.success('Configurazione salvata con successo!')
      } else {
        toast.error('Errore nel salvare la configurazione')
      }
    } catch (error) {
      toast.error('Errore nel salvare la configurazione')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (confirm('Sei sicuro di voler ripristinare le configurazioni predefinite?')) {
      fetchSections()
      toast.success('Configurazioni ripristinate')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-insubria-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento configurazioni...</p>
        </div>
      </div>
    )
  }

  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurazione Homepage</h1>
          <p className="text-gray-600">Gestisci le sezioni e il contenuto della homepage</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Ripristina
          </button>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="px-4 py-2 bg-insubria-600 text-white rounded-lg hover:bg-insubria-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Salvataggio...' : 'Salva'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
            <Settings className="h-5 w-5" />
            Sezioni Homepage
          </h2>
          <p className="text-sm text-gray-500">
            Attiva/disattiva le sezioni e configura il loro contenuto. L&apos;ordine può essere modificato usando le frecce.
          </p>
        </div>

        <div className="space-y-4">
          {sortedSections.map((section, index) => {
            const IconComponent = sectionIcons[section.name as keyof typeof sectionIcons] || Settings
            const label = sectionLabels[section.name as keyof typeof sectionLabels] || section.name
            
            return (
              <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-insubria-50 text-insubria-600 rounded-lg p-2">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{label}</h3>
                      <p className="text-sm text-gray-500">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Ordine */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveSection(section.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">
                        {section.order}
                      </span>
                      <button
                        onClick={() => moveSection(section.id, 'down')}
                        disabled={index === sortedSections.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        ↓
                      </button>
                    </div>
                    
                    {/* Toggle */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        section.isActive 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {section.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {section.isActive && (
                  <div className="space-y-3 pl-12">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Titolo
                      </label>
                      <input
                        type="text"
                        value={section.title || ''}
                        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                        placeholder="Titolo della sezione"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sottotitolo
                      </label>
                      <input
                        type="text"
                        value={section.subtitle || ''}
                        onChange={(e) => updateSection(section.id, 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                        placeholder="Sottotitolo della sezione"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrizione
                      </label>
                      <textarea
                        value={section.description || ''}
                        onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                        placeholder="Descrizione della sezione"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Informazioni</h3>
            <p className="text-sm text-blue-700">
              Le modifiche verranno applicate immediatamente alla homepage. 
              Le sezioni disattivate non verranno mostrate ai visitatori.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}