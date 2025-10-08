'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import TeamMemberForm from '@/components/admin/TeamMemberForm'

interface TeamMember {
  id: string
  name: string
  role: string
  image?: string
  description?: string
  order: number
  isActive: boolean
}

export default function EditTeamMemberPage() {
  const params = useParams()
  const [member, setMember] = useState<TeamMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/team/${params.id}`)
        const data = await response.json()
        setMember(data)
      } catch (error) {
        console.error('Error fetching member:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMember()
  }, [params.id])

  if (isLoading) {
    return <div className="text-center py-10">Caricamento...</div>
  }

  if (!member) {
    return <div className="text-center py-10">Membro non trovato</div>
  }

  return <TeamMemberForm member={member} />
}
