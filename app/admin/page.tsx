export default function AdminTestPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600">Benvenuto nella dashboard di gestione JEIns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Servizi</h3>
          <p className="text-3xl font-bold text-insubria-600">0</p>
          <p className="text-sm text-gray-500">Servizi attivi</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Progetti</h3>
          <p className="text-3xl font-bold text-insubria-600">0</p>
          <p className="text-sm text-gray-500">Progetti completati</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Candidature</h3>
          <p className="text-3xl font-bold text-insubria-600">0</p>
          <p className="text-sm text-gray-500">Candidature ricevute</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Articoli</h3>
          <p className="text-3xl font-bold text-insubria-600">0</p>
          <p className="text-sm text-gray-500">Articoli pubblicati</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Azioni Rapide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/services"
            className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors text-center"
          >
            Gestisci Servizi
          </a>
          <a
            href="/admin/projects"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            Gestisci Progetti
          </a>
          <a
            href="/admin/blog"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            Gestisci Blog
          </a>
          <a
            href="/admin/recruitment"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-center"
          >
            Gestisci Recruitment
          </a>
        </div>
      </div>
    </div>
  )
}