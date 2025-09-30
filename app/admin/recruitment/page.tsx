import { prisma } from '@/lib/prisma'
import { 
  Users, 
  Calendar, 
  FileText, 
  Eye, 
  Download,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

async function getRecruitmentData() {
  const [recruitment, applications, stats] = await Promise.all([
    prisma.recruitment.findFirst(),
    prisma.recruitmentApplication.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    }),
    prisma.recruitmentApplication.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })
  ])

  return { recruitment, applications, stats }
}

export default async function RecruitmentPage() {
  const { recruitment, applications, stats } = await getRecruitmentData()

  const statusCounts = {
    pending: stats.find(s => s.status === 'pending')?._count.status || 0,
    reviewed: stats.find(s => s.status === 'reviewed')?._count.status || 0,
    accepted: stats.find(s => s.status === 'accepted')?._count.status || 0,
    rejected: stats.find(s => s.status === 'rejected')?._count.status || 0,
  }

  const totalApplications = Object.values(statusCounts).reduce((a, b) => a + b, 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'reviewed': return <Eye className="h-4 w-4 text-blue-500" />
      case 'accepted': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'In attesa'
      case 'reviewed': return 'In revisione'
      case 'accepted': return 'Accettata'
      case 'rejected': return 'Rifiutata'
      default: return 'Sconosciuto'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruitment</h1>
          <p className="text-gray-600">Gestisci le candidature e il processo di selezione</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/recruitment/settings"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Impostazioni
          </Link>
          <Link
            href="/admin/recruitment/export"
            className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Esporta Dati
          </Link>
        </div>
      </div>

      {/* Recruitment Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Stato Recruitment</h2>
          <div className="flex items-center gap-2">
            {recruitment?.isOpen ? (
              <>
                <Play className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">Aperto</span>
              </>
            ) : (
              <>
                <Pause className="h-5 w-5 text-red-500" />
                <span className="text-red-600 font-medium">Chiuso</span>
              </>
            )}
          </div>
        </div>

        {recruitment && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Data Apertura</h3>
              <p className="text-lg font-semibold text-gray-900">
                {recruitment.openDate ? new Date(recruitment.openDate).toLocaleDateString('it-IT') : 'Non impostata'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Data Chiusura</h3>
              <p className="text-lg font-semibold text-gray-900">
                {recruitment.closeDate ? new Date(recruitment.closeDate).toLocaleDateString('it-IT') : 'Non impostata'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Candidature Totali</h3>
              <p className="text-lg font-semibold text-gray-900">{totalApplications}</p>
            </div>
          </div>
        )}

        {recruitment?.description && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Descrizione</h3>
            <p className="text-gray-900">{recruitment.description}</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Attesa</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Revisione</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.reviewed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Accettate</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.accepted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rifiutate</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Candidature Recenti</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Corso/Anno
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ruoli
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
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
              {applications.map((application) => {
                const roles = application.roles ? JSON.parse(application.roles) : []
                return (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {application.course}
                      </div>
                      <div className="text-sm text-gray-500">
                        Anno {application.year}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {roles.slice(0, 2).map((role: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-insubria-100 text-insubria-800"
                          >
                            {role}
                          </span>
                        ))}
                        {roles.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{roles.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(application.createdAt).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        {getStatusLabel(application.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/recruitment/${application.id}`}
                          className="text-insubria-600 hover:text-insubria-900"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/recruitment/${application.id}/edit`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <FileText className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {applications.length === 0 && (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nessuna candidatura</h3>
            <p className="mt-1 text-sm text-gray-500">Non ci sono candidature recenti.</p>
          </div>
        )}
      </div>
    </div>
  )
}
