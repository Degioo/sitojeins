'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Send, Mail, Users, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import RichTextEditor from '@/components/admin/RichTextEditor'

interface Subscriber {
  id: string
  email: string
  name?: string
  isActive: boolean
  createdAt: string
}

interface NewsletterEmail {
  id: string
  subject: string
  content: string
  recipientCount: number
  status: string
  sentAt?: string
  createdAt: string
}

export default function NewsletterPage() {
  const [activeTab, setActiveTab] = useState<'subscribers' | 'sent' | 'compose'>('subscribers')
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [emails, setEmails] = useState<NewsletterEmail[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<NewsletterEmail | null>(null)
  
  // Form state per nuova email
  const [newEmail, setNewEmail] = useState({
    subject: '',
    content: ''
  })

  // Carica iscritti
  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter/subscribers')
      if (!response.ok) throw new Error('Errore nel caricamento degli iscritti')
      const data = await response.json()
      setSubscribers(data)
    } catch (error) {
      toast.error('Errore nel caricamento degli iscritti')
    }
  }

  // Carica email inviate
  const fetchEmails = async () => {
    try {
      const response = await fetch('/api/newsletter/emails')
      if (!response.ok) throw new Error('Errore nel caricamento delle email')
      const data = await response.json()
      setEmails(data)
    } catch (error) {
      toast.error('Errore nel caricamento delle email')
    }
  }

  useEffect(() => {
    fetchSubscribers()
    fetchEmails()
  }, [])

  // Elimina iscritto
  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo iscritto?')) return
    
    try {
      const response = await fetch(`/api/newsletter/subscribers/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Errore nella eliminazione')
      toast.success('Iscritto eliminato con successo')
      fetchSubscribers()
    } catch (error) {
      toast.error('Errore nella eliminazione dell\'iscritto')
    }
  }

  // Invia email
  const handleSendEmail = async () => {
    if (!newEmail.subject || !newEmail.content) {
      toast.error('Compila tutti i campi')
      return
    }

    if (!confirm(`Sei sicuro di voler inviare questa email a ${subscribers.filter(s => s.isActive).length} iscritti?`)) return

    setLoading(true)
    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmail)
      })
      
      if (!response.ok) throw new Error('Errore nell\'invio')
      
      toast.success('Email inviata con successo!')
      setNewEmail({ subject: '', content: '' })
      setActiveTab('sent')
      fetchEmails()
    } catch (error) {
      toast.error('Errore nell\'invio dell\'email')
    } finally {
      setLoading(false)
    }
  }

  // Aggiungi iscritto manualmente
  const handleAddSubscriber = async () => {
    const email = prompt('Inserisci l\'email del nuovo iscritto:')
    if (!email) return

    try {
      const response = await fetch('/api/newsletter/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (!response.ok) throw new Error('Errore nell\'aggiunta')
      
      toast.success('Iscritto aggiunto con successo')
      fetchSubscribers()
    } catch (error) {
      toast.error('Errore nell\'aggiunta dell\'iscritto')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestisci gli iscritti e invia email alla newsletter
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Iscritti Attivi
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {subscribers.filter(s => s.isActive).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Email Inviate
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {emails.filter(e => e.status === 'sent').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Send className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Totale Iscritti
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {subscribers.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`${
              activeTab === 'subscribers'
                ? 'border-insubria-500 text-insubria-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Iscritti
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`${
              activeTab === 'sent'
                ? 'border-insubria-500 text-insubria-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Email Inviate
          </button>
          <button
            onClick={() => setActiveTab('compose')}
            className={`${
              activeTab === 'compose'
                ? 'border-insubria-500 text-insubria-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Invia Email
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        {/* Tab Iscritti */}
        {activeTab === 'subscribers' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Iscritti alla Newsletter</h2>
              <button
                onClick={handleAddSubscriber}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-insubria-600 hover:bg-insubria-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Aggiungi Iscritto
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data Iscrizione
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subscriber.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          subscriber.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subscriber.isActive ? 'Attivo' : 'Inattivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(subscriber.createdAt).toLocaleDateString('it-IT')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteSubscriber(subscriber.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Email Inviate */}
        {activeTab === 'sent' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Email Inviate</h2>
            
            <div className="space-y-4">
              {emails.filter(e => e.status === 'sent').map((email) => (
                <div key={email.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{email.subject}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Inviata a {email.recipientCount} destinatari il{' '}
                        {email.sentAt && new Date(email.sentAt).toLocaleString('it-IT')}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedEmail(email)}
                      className="ml-4 text-insubria-600 hover:text-insubria-900"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
              
              {emails.filter(e => e.status === 'sent').length === 0 && (
                <p className="text-center text-gray-500 py-8">Nessuna email inviata</p>
              )}
            </div>
          </div>
        )}

        {/* Tab Invia Email */}
        {activeTab === 'compose' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Invia Nuova Email</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Oggetto
                </label>
                <input
                  type="text"
                  value={newEmail.subject}
                  onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-insubria-500 focus:ring-insubria-500 sm:text-sm"
                  placeholder="Oggetto dell'email..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenuto
                </label>
                <RichTextEditor
                  content={newEmail.content}
                  onChange={(content) => setNewEmail({ ...newEmail, content })}
                  placeholder="Scrivi il contenuto dell'email..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  Utilizza l&apos;editor per formattare il contenuto dell&apos;email con testo ricco.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-blue-800">
                  Questa email verrà inviata a {subscribers.filter(s => s.isActive).length} iscritti attivi.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSendEmail}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-insubria-600 hover:bg-insubria-700 disabled:opacity-50"
                >
                  {loading ? (
                    <>Invio in corso...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Invia Email
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal dettagli email */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedEmail.subject}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Inviata il {selectedEmail.sentAt && new Date(selectedEmail.sentAt).toLocaleString('it-IT')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Chiudi</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div dangerouslySetInnerHTML={{ __html: selectedEmail.content }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

