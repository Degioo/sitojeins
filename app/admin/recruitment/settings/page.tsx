import { prisma } from '@/lib/prisma'
import RecruitmentSettings from '@/components/admin/RecruitmentSettings'

async function getRecruitmentSettings() {
  return await prisma.recruitment.findFirst()
}

export default async function RecruitmentSettingsPage() {
  const recruitment = await getRecruitmentSettings()
  
  return <RecruitmentSettings recruitment={recruitment} />
}
