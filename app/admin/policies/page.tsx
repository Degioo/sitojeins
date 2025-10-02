import { prisma } from '@/lib/prisma'
import { 
  Shield, 
  FileText, 
  Eye, 
  Edit, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Globe,
  Cookie
} from 'lucide-react'
import Link from 'next/link'

async function getPolicies() {
  const [privacyPolicy, cookiePolicy] = await Promise.all([
    prisma.policy.findFirst({
      where: { type: 'privacy' }
    }),
    prisma.policy.findFirst({
      where: { type: 'cookie' }
    })
  ])

  return { privacyPolicy, cookiePolicy }
}

export default async function PoliciesPage() {
  const { privacyPolicy, cookiePolicy } = await getPolicies()

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <AlertCircle className="h-5 w-5 text-yellow-500" />
    )
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
  }

  const getStatusLabel = (isActive: boolean) => {
    return isActive ? 'Attiva' : 'Non Attiva'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestione Policy</h1>
          <p className="text-gray-600">Gestisci le policy di privacy e cookie del sito</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/policies/privacy/new"
            className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Nuova Privacy Policy
          </Link>
          <Link
            href="/admin/policies/cookie/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Cookie className="h-4 w-4" />
            Nuova Cookie Policy
          </Link>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-insubria-100">
                <Shield className="h-6 w-6 text-insubria-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Privacy Policy</h2>
                <p className="text-sm text-gray-500">Gestione della privacy policy del sito</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {privacyPolicy && (
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(privacyPolicy.isActive)}`}>
                  {getStatusIcon(privacyPolicy.isActive)}
                  {getStatusLabel(privacyPolicy.isActive)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          {privacyPolicy ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ultima Modifica</p>
                  <p className="text-sm text-gray-900">
                    {new Date(privacyPolicy.updatedAt).toLocaleDateString('it-IT')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Versione</p>
                  <p className="text-sm text-gray-900">v{privacyPolicy.version}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Stato</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(privacyPolicy.isActive)}`}>
                    {getStatusIcon(privacyPolicy.isActive)}
                    {getStatusLabel(privacyPolicy.isActive)}
                  </span>
                </div>
              </div>
              
              {privacyPolicy.content && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Anteprima Contenuto</p>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700 line-clamp-4">
                      {privacyPolicy.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Link
                  href={`/admin/policies/privacy/${privacyPolicy.id}/edit`}
                  className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Modifica
                </Link>
                <Link
                  href={`/privacy`}
                  target="_blank"
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Visualizza Pubblica
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nessuna Privacy Policy</h3>
              <p className="mt-1 text-sm text-gray-500">Crea la prima privacy policy per il sito.</p>
              <div className="mt-4">
                <Link
                  href="/admin/policies/privacy/new"
                  className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center gap-2 mx-auto w-fit"
                >
                  <FileText className="h-4 w-4" />
                  Crea Privacy Policy
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cookie Policy */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Cookie className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Cookie Policy</h2>
                <p className="text-sm text-gray-500">Gestione della cookie policy del sito</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {cookiePolicy && (
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cookiePolicy.isActive)}`}>
                  {getStatusIcon(cookiePolicy.isActive)}
                  {getStatusLabel(cookiePolicy.isActive)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          {cookiePolicy ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ultima Modifica</p>
                  <p className="text-sm text-gray-900">
                    {new Date(cookiePolicy.updatedAt).toLocaleDateString('it-IT')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Versione</p>
                  <p className="text-sm text-gray-900">v{cookiePolicy.version}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Stato</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cookiePolicy.isActive)}`}>
                    {getStatusIcon(cookiePolicy.isActive)}
                    {getStatusLabel(cookiePolicy.isActive)}
                  </span>
                </div>
              </div>
              
              {cookiePolicy.content && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Anteprima Contenuto</p>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700 line-clamp-4">
                      {cookiePolicy.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Link
                  href={`/admin/policies/cookie/${cookiePolicy.id}/edit`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Modifica
                </Link>
                <Link
                  href={`/cookie-policy`}
                  target="_blank"
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Visualizza Pubblica
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Cookie className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nessuna Cookie Policy</h3>
              <p className="mt-1 text-sm text-gray-500">Crea la prima cookie policy per il sito.</p>
              <div className="mt-4">
                <Link
                  href="/admin/policies/cookie/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto w-fit"
                >
                  <Cookie className="h-4 w-4" />
                  Crea Cookie Policy
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legal Information */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informazioni Legali</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Privacy Policy</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Conformità GDPR e normativa italiana</li>
              <li>• Gestione dati personali</li>
              <li>• Diritti degli utenti</li>
              <li>• Contatti per privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Cookie Policy</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Tipologie di cookie utilizzati</li>
              <li>• Finalità e durata</li>
              <li>• Gestione preferenze</li>
              <li>• Cookie di terze parti</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
