import { prisma } from '@/lib/prisma'
import RecruitmentSettings from '@/components/admin/RecruitmentSettings'

async function getRecruitmentSettings() {
  return await prisma.recruitment.findFirst()
}

export default async function RecruitmentSettingsPage() {
  const recruitment = await getRecruitmentSettings()
  
  // Converti null in undefined e i campi null in undefined per compatibilità TypeScript
  const formattedRecruitment = recruitment ? {
    ...recruitment,
    openDate: recruitment.openDate ?? undefined,
    closeDate: recruitment.closeDate ?? undefined,
    description: recruitment.description ?? undefined,
    requirements: recruitment.requirements ?? undefined,
    benefits: recruitment.benefits ?? undefined,
    googleFormUrl: recruitment.googleFormUrl ?? undefined,
  } : undefined
  
  return <RecruitmentSettings recruitment={formattedRecruitment} />
}
