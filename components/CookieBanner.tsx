'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Settings } from 'lucide-react'
import CookiePreferencesModal, { CookiePreferences } from './CookiePreferencesModal'

// Funzione helper per ottenere o creare un cookieId univoco
function getOrCreateCookieId(): string {
  if (typeof window === 'undefined') return ''
  
  let cookieId = localStorage.getItem('jeins-cookie-id')
  if (!cookieId) {
    // Genera un ID univoco
    cookieId = `cookie_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('jeins-cookie-id', cookieId)
  }
  return cookieId
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Controlla se l'utente ha già accettato i cookie
    const cookieAccepted = localStorage.getItem('jeins-cookies-accepted')
    if (!cookieAccepted) {
      // Mostra il banner dopo 1 secondo
      setTimeout(() => {
        setShowBanner(true)
      }, 1000)
    }
  }, [])

  const savePreferences = async (preferences: CookiePreferences) => {
    try {
      const cookieId = getOrCreateCookieId()
      if (!cookieId) {
        throw new Error('Impossibile ottenere cookieId')
      }

      const response = await fetch('/api/cookie-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cookieId,
          ...preferences,
        }),
      })

      if (!response.ok) {
        throw new Error('Errore nel salvataggio')
      }

      const savedPreferences = await response.json()
      
      // Aggiorna il localStorage
      localStorage.setItem('jeins-cookies-accepted', 'true')
      localStorage.setItem('jeins-cookie-preferences', JSON.stringify(savedPreferences))
      
      setShowBanner(false)
      setIsModalOpen(false)
      
      // Ricarica la pagina per applicare le nuove preferenze
      window.location.reload()
    } catch (error) {
      console.error('Errore nel salvataggio delle preferenze:', error)
      throw error
    }
  }

  const acceptCookies = async () => {
    // Accetta tutti i cookie
    await savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    })
  }

  const declineCookies = async () => {
    // Rifiuta tutti tranne i necessari
    await savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    })
  }

  if (!showBanner) return null

  return (
    <div className={`cookie-banner ${showBanner ? 'show' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-insubria-50 p-3 rounded-2xl">
              <Cookie className="text-insubria-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Utilizziamo i cookie
              </h3>
              <p className="text-neutral-500 text-sm">
                Utilizziamo i cookie per migliorare la tua esperienza di navigazione, 
                fornire funzionalità personalizzate e analizzare il nostro traffico. 
                Cliccando &quot;Accetta tutti&quot; acconsenti al nostro utilizzo dei cookie.
              </p>
              <div className="mt-2 flex gap-4">
                <a 
                  href="/privacy" 
                  className="text-insubria-600 hover:text-insubria-700 text-sm font-medium"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/cookie-policy" 
                  className="text-insubria-600 hover:text-insubria-700 text-sm font-medium"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-neutral-500 hover:text-neutral-700 font-medium transition-colors"
            >
              Rifiuta
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-insubria-600 hover:text-insubria-700 font-medium transition-colors flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Personalizza
            </button>
            <button
              onClick={acceptCookies}
              className="bg-insubria-600 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-insubria-700 transition-colors"
            >
              Accetta tutti
            </button>
          </div>
        </div>
      </div>
      
      <CookiePreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={savePreferences}
      />
    </div>
  )
}
