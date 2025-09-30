import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ApplicationEdit from '@/components/admin/ApplicationEdit'

interface EditApplicationPageProps {
  params: {
    id: string
  }
}

async function getApplication(id: string) {
  const application = await prisma.recruitmentApplication.findUnique({
    where: { id }
  })

  if (!application) {
    notFound()
  }

  return application
}

export default async function EditApplicationPage({ params }: EditApplicationPageProps) {
  const application = await getApplication(params.id)

  return <ApplicationEdit application={application} />
}
