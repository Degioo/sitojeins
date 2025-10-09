import { prisma } from '@/lib/prisma'
import { Plus, Edit, Trash2, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

// Forza ricaricamento dal DB ad ogni visita
export const revalidate = 0

async function getContacts() {
  return await prisma.contact.findMany({
    orderBy: { order: 'asc' }
  })
}

const getContactIcon = (type: string) => {
  switch (type) {
    case 'email':
      return Mail
    case 'phone':
      return Phone
    case 'address':
      return MapPin
    case 'facebook':
      return Facebook
    case 'instagram':
      return Instagram
    case 'linkedin':
      return Linkedin
    default:
      return Mail
  }
}

const getContactColor = (type: string) => {
  switch (type) {
    case 'email':
      return 'bg-blue-100 text-blue-800'
    case 'phone':
      return 'bg-green-100 text-green-800'
    case 'address':
      return 'bg-purple-100 text-purple-800'
    case 'facebook':
      return 'bg-blue-100 text-blue-800'
    case 'instagram':
      return 'bg-pink-100 text-pink-800'
    case 'linkedin':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default async function ContactsPage() {
  const contacts = await getContacts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contatti</h1>
          <p className="text-gray-600">Gestisci le informazioni di contatto e i social media</p>
        </div>
        <Link
          href="/admin/contacts/new"
          className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuovo Contatto
        </Link>
      </div>

      {contacts.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Lista Contatti</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valore
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Etichetta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ordine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => {
                  const IconComponent = getContactIcon(contact.type)
                  return (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IconComponent className="h-5 w-5 text-gray-400 mr-3" />
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getContactColor(contact.type)}`}>
                            {contact.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {contact.value}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {contact.label || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {contact.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          contact.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {contact.isActive ? 'Attivo' : 'Inattivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/contacts/${contact.id}/edit`}
                            className="text-insubria-600 hover:text-insubria-900"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Plus className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nessun contatto</h3>
          <p className="mt-1 text-sm text-gray-500">
            Inizia aggiungendo le informazioni di contatto.
          </p>
          <div className="mt-6">
            <Link
              href="/admin/contacts/new"
              className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Nuovo Contatto
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
