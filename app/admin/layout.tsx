import AdminLayout from '@/components/admin/AdminLayout'
import { Toaster } from 'react-hot-toast'

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminLayout>
      <Toaster position="top-right" />
      {children}
    </AdminLayout>
  )
}
