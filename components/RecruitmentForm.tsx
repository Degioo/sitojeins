'use client'

import { useState } from 'react'
import Filigrana from './Filigrana'

export default function RecruitmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    year: '',
    roles: [] as string[],
    cv: null as File | null,
    notes: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const availableRoles = [
    'Consulente Junior',
    'Project Manager',
    'Marketing Specialist',
    'Developer',
    'Designer',
    'Business Analyst',
    'Finance Specialist',
    'HR Specialist'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleRoleChange = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, cv: file }))
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
        course: '',
        year: '',
        roles: [],
        cv: null,
        notes: '',
        consent: false
      })
      alert('Candidatura inviata! (Simulazione)')
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto relative">
      {/* Filigrane decorative */}
      <Filigrana position="left" size="md" opacity={0.02} />
      <Filigrana position="right" size="sm" opacity={0.03} />
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 newspaper-headline">
          Candidati con noi
        </h2>
        <p className="text-neutral-500">
          Unisciti al team di JEIns e sviluppa le tue competenze professionali
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
            <label htmlFor="course" className="block text-sm font-medium text-neutral-900 mb-2">
              Corso di Laurea *
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              placeholder="es. Economia e Management"
              className="w-full px-4 py-3 rounded-2xl border border-insubria-200 focus:outline-none focus:ring-2 focus:ring-insubria-600 focus:border-insubria-600"
            />
          </div>
          
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-neutral-900 mb-2">
              Anno di Corso *
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl border border-insubria-200 focus:outline-none focus:ring-2 focus:ring-insubria-600 focus:border-insubria-600"
            >
              <option value="">Seleziona anno</option>
              <option value="1">Primo anno</option>
              <option value="2">Secondo anno</option>
              <option value="3">Terzo anno</option>
              <option value="magistrale">Laurea Magistrale</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-3">
            Ruoli di interesse *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableRoles.map((role) => (
              <label key={role} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.roles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                  className="rounded"
                />
                <span className="text-sm text-neutral-700">{role}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="cv" className="block text-sm font-medium text-neutral-900 mb-2">
            Curriculum Vitae
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
            <input
              type="file"
              id="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="cv" className="cursor-pointer">
              <div className="text-neutral-500 mb-2">
                {formData.cv ? formData.cv.name : 'Carica il tuo CV (PDF, DOC, DOCX)'}
              </div>
              <div className="text-sm text-insubria-green-700 hover:text-insubria-green-500">
                Clicca per selezionare un file
              </div>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-neutral-900 mb-2">
            Note aggiuntive
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-insubria-green-500"
            placeholder="Raccontaci qualcosa di te, le tue esperienze e motivazioni..."
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
          disabled={isSubmitting || formData.roles.length === 0}
          className="w-full bg-insubria-600 text-white py-4 rounded-2xl font-semibold hover:bg-insubria-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia candidatura'}
        </button>
      </form>
    </div>
  )
}
