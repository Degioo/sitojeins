import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Toaster } from 'react-hot-toast'

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      {children}
    </AdminLayout>
  )
}
