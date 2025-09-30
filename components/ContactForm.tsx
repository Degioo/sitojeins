'use client'

import { useState } from 'react'
import Filigrana from './Filigrana'

interface ContactFormProps {
  title?: string
  description?: string
}

export default function ContactForm({ 
  title = "Contattaci", 
  description = "Compila il form per richiedere informazioni o un preventivo" 
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Integrare con endpoint reale o Google Forms
    // Per ora simuliamo l'invio
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        consent: false
      })
      alert('Messaggio inviato! (Simulazione)')
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto relative">
      {/* Filigrane decorative */}
      <Filigrana position="left" size="sm" opacity={0.03} />
      <Filigrana position="right" size="md" opacity={0.02} />
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 newspaper-headline">
          {title}
        </h2>
        <p className="text-neutral-500">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-2">
              Nome e Cognome *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl border border-insubria-200 focus:outline-none focus:ring-2 focus:ring-insubria-600 focus:border-insubria-600"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl border border-insubria-200 focus:outline-none focus:ring-2 focus:ring-insubria-600 focus:border-insubria-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-neutral-900 mb-2">
              Azienda
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-insubria-200 focus:outline-none focus:ring-2 focus:ring-insubria-600 focus:border-insubria-600"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-900 mb-2">
              Telefono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-insubria-200 focus:outline-none focus:ring-2 focus:ring-insubria-600 focus:border-insubria-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-900 mb-2">
            Messaggio *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-insubria-green-500"
            placeholder="Descrivi il tuo progetto o la tua richiesta..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
            className="rounded"
          />
          <label htmlFor="consent" className="text-sm text-neutral-700">
            Acconsento al trattamento dei dati personali secondo la{' '}
            <a href="/privacy" className="text-insubria-600 hover:underline">
              Privacy Policy
            </a>
            *
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-insubria-600 text-white py-4 rounded-2xl font-semibold hover:bg-insubria-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia messaggio'}
        </button>
      </form>
    </div>
  )
}
