import { prisma } from '@/lib/prisma'
import { 
  Users, 
  ExternalLink,
  Play,
  Pause,
  Settings,
  FileSpreadsheet,
  Calendar,
  Info
} from 'lucide-react'
import Link from 'next/link'

// Forza ricaricamento dal DB ad ogni visita
export const revalidate = 0

async function getRecruitmentData() {
  const recruitment = await prisma.recruitment.findFirst()
  return recruitment
}

export default async function RecruitmentPage() {
  const recruitment = await getRecruitmentData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruitment</h1>
          <p className="text-gray-600">Gestisci il recruitment tramite Tally e Notion</p>
        </div>
        <Link
          href="/admin/recruitment/settings"
          className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Impostazioni
        </Link>
      </div>

      {/* Recruitment Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Stato Recruitment</h2>
          <div className="flex items-center gap-2">
            {recruitment?.isOpen ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-medium">Aperto</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-600 font-medium">Chiuso</span>
              </>
            )}
          </div>
        </div>

        {recruitment ? (
          <div className="space-y-6">
            {/* Info recruitment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <h3 className="text-sm font-medium text-gray-600">Date</h3>
                </div>
                <p className="text-sm text-gray-900">
                  <strong>Apertura:</strong> {recruitment.openDate ? new Date(recruitment.openDate).toLocaleDateString('it-IT') : 'Non impostata'}
                </p>
                <p className="text-sm text-gray-900 mt-1">
                  <strong>Chiusura:</strong> {recruitment.closeDate ? new Date(recruitment.closeDate).toLocaleDateString('it-IT') : 'Non impostata'}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-gray-600" />
                  <h3 className="text-sm font-medium text-gray-600">Descrizione</h3>
                </div>
                <p className="text-sm text-gray-900 line-clamp-3">
                  {recruitment.description || 'Nessuna descrizione'}
                </p>
              </div>
            </div>

            {/* Link Tally e Notion */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestione Candidature</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Link al form Tally */}
                <a
                  href={recruitment.tallyFormUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-insubria-600 text-white px-6 py-4 rounded-lg hover:bg-insubria-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ pointerEvents: recruitment.tallyFormUrl ? 'auto' : 'none' }}
                >
                  <ExternalLink className="h-5 w-5" />
                  Apri Tally Form
                </a>

                {/* Link al database Notion */}
                <a
                  href={recruitment.notionSheetUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ pointerEvents: recruitment.notionSheetUrl ? 'auto' : 'none' }}
                >
                  <FileSpreadsheet className="h-5 w-5" />
                  Apri Notion Database
                </a>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Come funziona
                </h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li><strong>Apri Tally Form</strong> - Visualizza il form di candidatura pubblico</li>
                  <li><strong>Apri Notion Database</strong> - Accedi al database Notion dove vengono salvate tutte le candidature</li>
                  <li>Puoi modificare i link in qualsiasi momento dalle <strong>Impostazioni</strong></li>
                </ul>
              </div>

              {(!recruitment.tallyFormUrl || !recruitment.notionSheetUrl) && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Configurazione necessaria
                  </h4>
                  <p className="text-sm text-yellow-800">
                    {!recruitment.tallyFormUrl && !recruitment.notionSheetUrl && (
                      <>Configura il link del form Tally e del database Notion dalle <strong>Impostazioni</strong> per abilitare i link.</>
                    )}
                    {!recruitment.tallyFormUrl && recruitment.notionSheetUrl && (
                      <>Configura il link del form Tally dalle <strong>Impostazioni</strong>.</>
                    )}
                    {recruitment.tallyFormUrl && !recruitment.notionSheetUrl && (
                      <>Configura il link del database Notion dalle <strong>Impostazioni</strong>.</>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun recruitment configurato</h3>
            <p className="text-gray-500 mb-4">Configura il recruitment dalle impostazioni</p>
            <Link
              href="/admin/recruitment/settings"
              className="inline-flex items-center gap-2 bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors"
            >
              <Settings className="h-4 w-4" />
              Vai alle Impostazioni
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
