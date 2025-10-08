'use client'

import { useState } from 'react'

export default function NewsletterBox() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Integrare con Brevo/Mailchimp
    // Per ora simuliamo l'invio
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail('')
      setConsent(false)
      alert('Iscrizione completata! (Simulazione)')
    }, 1000)
  }

  return (
    <div className="bg-insubria-green-100 rounded-2xl p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
          Resta aggiornato
        </h3>
        <p className="text-neutral-700 mb-6">
          Ricevi le ultime novità su progetti, eventi e opportunità di JEIns
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-insubria-green-500"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting || !consent}
              className="bg-insubria-green-500 text-white px-6 py-3 rounded-2xl font-semibold border-2 border-transparent hover:bg-white hover:text-insubria-green-600 hover:border-insubria-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-insubria-green-500 disabled:hover:text-white disabled:hover:border-transparent"
            >
              {isSubmitting ? 'Invio...' : 'Iscriviti'}
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="consent" className="text-sm text-gray-900">
              Acconsento al trattamento dei dati personali secondo la{' '}
              <a href="/privacy" className="text-insubria-green-700 hover:underline font-medium">
                Privacy Policy
              </a>
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}
