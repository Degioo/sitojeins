import AdminLayout from '@/components/admin/AdminLayout'
import { Toaster } from 'react-hot-toast'

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminLayout>
        <Toaster position="top-right" />
        {children}
      </AdminLayout>
    </div>
  )
}
