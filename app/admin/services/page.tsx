import { prisma } from '@/lib/prisma'

// Forza ricaricamento dal DB ad ogni visita
export const revalidate = 0
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

async function getServices() {
  return await prisma.service.findMany({
    orderBy: { order: 'asc' }
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Servizi</h1>
          <p className="text-gray-600">Gestisci i servizi offerti da JEIns</p>
        </div>
        <Link
          href="/admin/services/new"
          className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuovo Servizio
        </Link>
      </div>

      {services.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Lista Servizi</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titolo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Settore
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
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {service.title}
                      </div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {service.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-insubria-100 text-insubria-800">
                        {service.sector}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        service.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {service.isActive ? 'Attivo' : 'Inattivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/services/${service.id}/edit`}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Plus className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nessun servizio</h3>
          <p className="mt-1 text-sm text-gray-500">
            Inizia aggiungendo il primo servizio.
          </p>
          <div className="mt-6">
            <Link
              href="/admin/services/new"
              className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Nuovo Servizio
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
