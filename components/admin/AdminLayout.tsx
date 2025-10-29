'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Briefcase, 
  FileText, 
  Mail, 
  Shield,
  Menu,
  X,
  LogOut,
  MailOpen,
  Home
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'

interface NavigationItem {
  name: string
  href: string
  icon: any
  menuId: string
}

const allNavigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, menuId: 'dashboard' },
  { name: 'Pagina Home', href: '/admin/home', icon: Home, menuId: 'home' },
  { name: 'Servizi', href: '/admin/services', icon: Briefcase, menuId: 'services' },
  { name: 'Progetti', href: '/admin/projects', icon: FileText, menuId: 'projects' },
  { name: 'Blog', href: '/admin/blog', icon: FileText, menuId: 'blog' },
  { name: 'Team', href: '/admin/team', icon: Users, menuId: 'team' },
  { name: 'Recruitment', href: '/admin/recruitment', icon: Users, menuId: 'recruitment' },
  { name: 'Contatti', href: '/admin/contacts', icon: Mail, menuId: 'contacts' },
  { name: 'Newsletter', href: '/admin/newsletter', icon: MailOpen, menuId: 'newsletter' },
  { name: 'Privacy Policy', href: '/admin/policies', icon: Shield, menuId: 'policies' },
  { name: 'Impostazioni', href: '/admin/settings', icon: Settings, menuId: 'settings' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navigation, setNavigation] = useState<NavigationItem[]>(allNavigation)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, update: updateSession } = useSession()

  useEffect(() => {
    // Carica i permessi dell'utente
    const loadPermissions = async () => {
      try {
        console.log('Loading permissions for user:', {
          email: session?.user?.email,
          roleId: session?.user?.roleId,
          role: session?.user?.role
        })

        if (!session?.user?.roleId) {
          // Se non ha ruolo, mostra tutto (per retrocompatibilità)
          console.log('No roleId found, showing all navigation')
          setNavigation(allNavigation)
          return
        }

        const response = await fetch(`/api/admin/permissions?roleId=${session.user.roleId}`)
        if (response.ok) {
          const permissions: { menuItem: string }[] = await response.json()
          console.log('Loaded permissions:', permissions)
          const allowedMenuIds = permissions.map(p => p.menuItem)
          
          // Filtra il menu in base ai permessi
          // Sempre mostra Dashboard e Impostazioni per admin
          const isAdmin = session.user.role === 'admin' || session.user.role === 'Admin'
          const filtered = allNavigation.filter(item => 
            allowedMenuIds.includes(item.menuId) || 
            (isAdmin && (item.menuId === 'dashboard' || item.menuId === 'settings'))
          )
          
          console.log('Filtered navigation:', filtered.map(n => n.menuId))
          setNavigation(filtered)
        } else {
          const error = await response.json()
          console.error('Error loading permissions:', error)
          // In caso di errore, mostra tutto
          setNavigation(allNavigation)
        }
      } catch (error) {
        console.error('Error in loadPermissions:', error)
        // In caso di errore, mostra tutto
        setNavigation(allNavigation)
      }
    }

    if (session) {
      loadPermissions()
    } else {
      setNavigation(allNavigation)
    }
  }, [session])

  // Forza aggiornamento della sessione quando cambia
  useEffect(() => {
    if (session) {
      updateSession()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.roleId])

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      toast.success('Logout effettuato con successo')
      router.push('/admin/login')
    } catch (error) {
      toast.error('Errore durante il logout')
    }
  }

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-full max-w-xs h-full flex-col bg-white overflow-y-auto">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex h-0 flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">JEIns Admin</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item, index) => {
                // Se siamo su /admin e questa è la prima voce, evidenziala
                const isFirstItemOnDashboard = pathname === '/admin' && index === 0
                const isActive = pathname === item.href || isFirstItemOnDashboard
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-yellow-400 text-yellow-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                )
              })}
              <button
                onClick={handleLogout}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full"
              >
                <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-white border-r border-gray-200">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-xl font-bold text-gray-900">JEIns Admin</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item, index) => {
                    // Se siamo su /admin e questa è la prima voce, evidenziala
                    const isFirstItemOnDashboard = pathname === '/admin' && index === 0
                    const isActive = pathname === item.href || isFirstItemOnDashboard
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                            isActive
                              ? 'bg-yellow-400 text-yellow-900'
                              : 'text-gray-700 hover:text-insubria-600 hover:bg-gray-50'
                          }`}
                        >
                          <item.icon className="h-6 w-6 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-insubria-600 hover:bg-gray-50 w-full"
                    >
                      <LogOut className="h-6 w-6 shrink-0" />
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="flex items-center gap-x-2">
                <span className="text-sm text-gray-700">Admin</span>
                <span className="text-sm text-gray-500">admin@jeins.it</span>
              </div>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}