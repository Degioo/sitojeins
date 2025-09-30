'use client'

import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

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

  const acceptCookies = () => {
    localStorage.setItem('jeins-cookies-accepted', 'true')
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('jeins-cookies-accepted', 'false')
    setShowBanner(false)
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
                Cliccando "Accetta tutti" acconsenti al nostro utilizzo dei cookie.
              </p>
              <div className="mt-2">
                <a 
                  href="/privacy" 
                  className="text-insubria-600 hover:text-insubria-700 text-sm font-medium"
                >
                  Leggi la nostra Privacy Policy
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
              onClick={acceptCookies}
              className="bg-insubria-600 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-insubria-700 transition-colors"
            >
              Accetta tutti
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
