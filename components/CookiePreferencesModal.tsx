'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Save } from 'lucide-react'

interface CookiePreferencesModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (preferences: CookiePreferences) => void
  initialPreferences?: CookiePreferences
}

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
}

export default function CookiePreferencesModal({
  isOpen,
  onClose,
  onSave,
  initialPreferences,
}: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(
    initialPreferences || defaultPreferences
  )
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (initialPreferences) {
      setPreferences(initialPreferences)
    }
  }, [initialPreferences])

  const handleToggle = (key: keyof CookiePreferences) => {
    // Necessary è sempre true e non può essere disattivato
    if (key === 'necessary') return
    
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(preferences)
      onClose()
    } catch (error) {
      console.error('Errore nel salvataggio delle preferenze:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    })
  }

  const handleRejectAll = () => {
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    })
  }

  // Previeni lo scroll del body quando il modale è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        // Chiudi il modale se si clicca sull'overlay
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 p-4 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="bg-insubria-50 p-2 rounded-xl flex-shrink-0">
              <Cookie className="text-insubria-600 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold text-neutral-900 truncate">
                Gestione Preferenze Cookie
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                Scegli quali cookie accettare
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0 ml-2"
            aria-label="Chiudi"
          >
            <X className="h-5 w-5 text-neutral-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-blue-800">
              Utilizziamo i cookie per migliorare la tua esperienza di navigazione, 
              fornire funzionalità personalizzate e analizzare il nostro traffico. 
              Puoi gestire le tue preferenze per ogni categoria di cookie.
            </p>
          </div>

          {/* Cookie Categories */}
          <div className="space-y-4">
            {/* Necessary Cookies */}
            <div className="border-2 border-insubria-200 rounded-xl p-4 sm:p-5 bg-insubria-50">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-insubria-600">
                    Cookie Necessari
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                    Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="relative inline-flex items-center h-6 w-11 bg-insubria-600 rounded-full cursor-not-allowed opacity-75">
                    <span className="inline-block h-4 w-4 bg-white rounded-full transform translate-x-6"></span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Esempi: autenticazione, sicurezza, preferenze di lingua
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="border-2 border-neutral-200 rounded-xl p-4 sm:p-5 hover:border-insubria-300 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                    Cookie Analitici
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                    Ci aiutano a capire come i visitatori interagiscono con il sito web.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleToggle('analytics')}
                    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-insubria-500 focus:ring-offset-2 ${
                      preferences.analytics
                        ? 'bg-insubria-600'
                        : 'bg-neutral-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 bg-white rounded-full transform transition-transform ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Esempi: Google Analytics, statistiche di navigazione
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="border-2 border-neutral-200 rounded-xl p-4 sm:p-5 hover:border-insubria-300 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                    Cookie di Marketing
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                    Utilizzati per tracciare i visitatori attraverso i siti web per mostrare annunci rilevanti.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleToggle('marketing')}
                    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-insubria-500 focus:ring-offset-2 ${
                      preferences.marketing
                        ? 'bg-insubria-600'
                        : 'bg-neutral-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 bg-white rounded-full transform transition-transform ${
                        preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Esempi: cookie di tracciamento pubblicitario, remarketing
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="border-2 border-neutral-200 rounded-xl p-4 sm:p-5 hover:border-insubria-300 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                    Cookie Funzionali
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                    Permettono al sito web di ricordare le scelte dell&apos;utente per fornire funzionalità migliorate.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleToggle('functional')}
                    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-insubria-500 focus:ring-offset-2 ${
                      preferences.functional
                        ? 'bg-insubria-600'
                        : 'bg-neutral-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 bg-white rounded-full transform transition-transform ${
                        preferences.functional ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Esempi: preferenze di lingua, preferenze di visualizzazione
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
            <a
              href="/privacy"
              className="text-insubria-600 hover:text-insubria-700 font-medium"
            >
              Privacy Policy
            </a>
            <a
              href="/cookie-policy"
              className="text-insubria-600 hover:text-insubria-700 font-medium"
            >
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-neutral-200 p-4 sm:p-6 flex flex-col sm:flex-row gap-3 justify-between flex-shrink-0">
          <div className="flex gap-2 sm:gap-3 order-2 sm:order-1">
            <button
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Accetta Tutti
            </button>
            <button
              onClick={handleRejectAll}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Rifiuta Tutti
            </button>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="order-1 sm:order-2 w-full sm:w-auto px-4 sm:px-6 py-2 bg-insubria-600 text-white rounded-lg font-semibold hover:bg-insubria-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Salvataggio...' : 'Salva Preferenze'}
          </button>
        </div>
      </div>
    </div>
  )
}

