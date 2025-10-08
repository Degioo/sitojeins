'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import { Toaster } from 'react-hot-toast'
import { usePathname } from 'next/navigation'

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  // Se è la pagina di login, mostra solo il contenuto senza sidebar
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        {children}
      </div>
    )
  }

  // Altrimenti mostra il layout completo con sidebar
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminLayout>
        <Toaster position="top-right" />
        {children}
      </AdminLayout>
    </div>
  )
}
