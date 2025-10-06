import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PolicyForm from '@/components/admin/PolicyForm'

interface EditPrivacyPolicyPageProps {
  params: {
    id: string
  }
}

async function getPolicy(id: string) {
  const policy = await prisma.policy.findUnique({
    where: { id }
  })

  if (!policy || policy.type !== 'privacy') {
    notFound()
  }

  return policy
}

export default async function EditPrivacyPolicyPage({ params }: EditPrivacyPolicyPageProps) {
  const policy = await getPolicy(params.id)
  
  // Converti il tipo per compatibilità TypeScript
  const formattedPolicy = {
    ...policy,
    type: policy.type as 'privacy',
  }
  
  return <PolicyForm policy={formattedPolicy} type="privacy" />
}
