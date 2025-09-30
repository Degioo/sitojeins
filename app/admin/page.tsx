import { prisma } from '@/lib/prisma'
import { 
  Briefcase, 
  FileText, 
  Users, 
  Mail, 
  TrendingUp,
  Calendar,
  Eye
} from 'lucide-react'

async function getDashboardStats() {
  const [
    servicesCount,
    projectsCount,
    blogPostsCount,
    applicationsCount,
    contactsCount,
    recentApplications
  ] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.recruitmentApplication.count(),
    prisma.contact.count(),
    prisma.recruitmentApplication.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true
      }
    })
  ])

  return {
    servicesCount,
    projectsCount,
    blogPostsCount,
    applicationsCount,
    contactsCount,
    recentApplications
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      title: 'Servizi Attivi',
      value: stats.servicesCount,
      icon: Briefcase,
      color: 'bg-blue-500',
      href: '/admin/services'
    },
    {
      title: 'Progetti',
      value: stats.projectsCount,
      icon: FileText,
      color: 'bg-green-500',
      href: '/admin/projects'
    },
    {
      title: 'Articoli Blog',
      value: stats.blogPostsCount,
      icon: FileText,
      color: 'bg-purple-500',
      href: '/admin/blog'
    },
    {
      title: 'Candidature',
      value: stats.applicationsCount,
      icon: Users,
      color: 'bg-orange-500',
      href: '/admin/recruitment'
    },
    {
      title: 'Contatti',
      value: stats.contactsCount,
      icon: Mail,
      color: 'bg-red-500',
      href: '/admin/contacts'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Panoramica generale del sito JEIns</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat) => (
          <a
            key={stat.title}
            href={stat.href}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Candidature Recenti</h2>
        </div>
        <div className="p-6">
          {stats.recentApplications.length > 0 ? (
            <div className="space-y-4">
              {stats.recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-insubria-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-insubria-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{application.name}</p>
                      <p className="text-sm text-gray-600">{application.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {application.status === 'pending' ? 'In attesa' :
                       application.status === 'accepted' ? 'Accettata' :
                       application.status === 'rejected' ? 'Rifiutata' :
                       'In revisione'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(application.createdAt).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nessuna candidatura</h3>
              <p className="mt-1 text-sm text-gray-500">Non ci sono candidature recenti.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Azioni Rapide</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/services/new"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Briefcase className="h-6 w-6 text-blue-600 mr-3" />
              <span className="font-medium text-blue-900">Nuovo Servizio</span>
            </a>
            <a
              href="/admin/projects/new"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <FileText className="h-6 w-6 text-green-600 mr-3" />
              <span className="font-medium text-green-900">Nuovo Progetto</span>
            </a>
            <a
              href="/admin/blog/new"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <FileText className="h-6 w-6 text-purple-600 mr-3" />
              <span className="font-medium text-purple-900">Nuovo Articolo</span>
            </a>
            <a
              href="/admin/recruitment"
              className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Users className="h-6 w-6 text-orange-600 mr-3" />
              <span className="font-medium text-orange-900">Gestisci Recruitment</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
