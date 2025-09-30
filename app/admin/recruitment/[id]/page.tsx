import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { 
  ArrowLeft, 
  User, 
  Mail, 
  GraduationCap, 
  Calendar,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from 'lucide-react'
import Link from 'next/link'

interface ApplicationPageProps {
  params: {
    id: string
  }
}

async function getApplication(id: string) {
  const application = await prisma.recruitmentApplication.findUnique({
    where: { id }
  })

  if (!application) {
    notFound()
  }

  return application
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />
    case 'reviewed': return <Eye className="h-5 w-5 text-blue-500" />
    case 'accepted': return <CheckCircle className="h-5 w-5 text-green-500" />
    case 'rejected': return <XCircle className="h-5 w-5 text-red-500" />
    default: return <Clock className="h-5 w-5 text-gray-500" />
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

export default async function ApplicationPage({ params }: ApplicationPageProps) {
  const application = await getApplication(params.id)
  const roles = application.roles ? JSON.parse(application.roles) : []

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/recruitment"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Candidatura di {application.name}
          </h1>
          <p className="text-gray-600">
            Dettagli completi della candidatura
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(application.status)}`}>
            {getStatusIcon(application.status)}
            {getStatusLabel(application.status)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Informazioni Personali</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p className="text-lg font-semibold text-gray-900">{application.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{application.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Corso di Studio</p>
                  <p className="text-lg font-semibold text-gray-900">{application.course}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Anno di Corso</p>
                  <p className="text-lg font-semibold text-gray-900">{application.year}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Roles of Interest */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Ruoli di Interesse</h2>
            <div className="flex flex-wrap gap-3">
              {roles.map((role: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex px-4 py-2 bg-insubria-100 text-insubria-800 rounded-lg text-sm font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Notes */}
          {application.notes && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Note del Candidato</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 whitespace-pre-wrap">{application.notes}</p>
              </div>
            </div>
          )}

          {/* CV */}
          {application.cvUrl && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Curriculum Vitae</h2>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <a
                  href={application.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-insubria-600 hover:text-insubria-700 font-medium flex items-center gap-2"
                >
                  Visualizza CV
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dettagli Candidatura</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Data di Invio</p>
                <p className="text-sm text-gray-900">
                  {new Date(application.createdAt).toLocaleDateString('it-IT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ultima Modifica</p>
                <p className="text-sm text-gray-900">
                  {new Date(application.updatedAt).toLocaleDateString('it-IT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Stato Attuale</p>
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                  {getStatusIcon(application.status)}
                  {getStatusLabel(application.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Azioni</h3>
            <div className="space-y-3">
              <Link
                href={`/admin/recruitment/${application.id}/edit`}
                className="w-full bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Modifica Stato
              </Link>
              <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                Invia Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
