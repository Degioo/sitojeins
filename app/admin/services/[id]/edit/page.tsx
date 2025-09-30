import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ServiceForm from '@/components/admin/ServiceForm'

interface EditServicePageProps {
  params: {
    id: string
  }
}

async function getService(id: string) {
  const service = await prisma.service.findUnique({
    where: { id }
  })

  if (!service) {
    notFound()
  }

  return service
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const service = await getService(params.id)

  return <ServiceForm service={service} />
}
