import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ContactForm from '@/components/admin/ContactForm'

interface EditContactPageProps {
  params: {
    id: string
  }
}

async function getContact(id: string) {
  const contact = await prisma.contact.findUnique({
    where: { id }
  })

  if (!contact) {
    notFound()
  }

  return contact
}

export default async function EditContactPage({ params }: EditContactPageProps) {
  const contact = await getContact(params.id)

  return <ContactForm contact={contact} />
}
