import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProjectForm from '@/components/admin/ProjectForm'

interface EditProjectPageProps {
  params: {
    id: string
  }
}

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id }
  })

  if (!project) {
    notFound()
  }

  return project
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const project = await getProject(params.id)

  return <ProjectForm project={project} />
}
