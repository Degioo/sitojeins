'use client'

import { useState, useEffect } from 'react'
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

export default function CookiePreferencesButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Carica le preferenze esistenti quando il componente viene montato
    loadPreferences()
  }, [])

  const loadPreferences = async () => {
    try {
      const cookieId = getOrCreateCookieId()
      if (!cookieId) {
        setIsLoading(false)
        return
      }

      const response = await fetch(`/api/cookie-preferences?cookieId=${cookieId}`)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setPreferences(data)
        }
      }
    } catch (error) {
      console.error('Errore nel caricamento delle preferenze:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (newPreferences: CookiePreferences) => {
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
          ...newPreferences,
        }),
      })

      if (!response.ok) {
        throw new Error('Errore nel salvataggio')
      }

      const savedPreferences = await response.json()
      setPreferences(savedPreferences)
      
      // Aggiorna il localStorage per indicare che le preferenze sono state salvate
      localStorage.setItem('jeins-cookies-accepted', 'true')
      localStorage.setItem('jeins-cookie-preferences', JSON.stringify(savedPreferences))
      
      // Ricarica la pagina per applicare le nuove preferenze
      window.location.reload()
    } catch (error) {
      console.error('Errore nel salvataggio delle preferenze:', error)
      throw error
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors"
        disabled={isLoading}
      >
        Modifica Preferenze
      </button>
      
      <CookiePreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialPreferences={preferences || undefined}
      />
    </>
  )
}

