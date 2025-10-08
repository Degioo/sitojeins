'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Users } from 'lucide-react'
import toast from 'react-hot-toast'

interface TeamMember {
  id: string
  name: string
  role: string
  image?: string
  description?: string
  isActive: boolean
  order: number
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/team')
      const data = await response.json()
      setMembers(data)
    } catch (error) {
      toast.error('Errore nel caricamento dei membri')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Sei sicuro di voler eliminare ${name}?`)) return

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Membro eliminato')
        fetchMembers()
      } else {
        toast.error('Errore durante l\'eliminazione')
      }
    } catch (error) {
      toast.error('Errore durante l\'eliminazione')
    }
  }

  if (isLoading) {
    return <div className="text-center py-10">Caricamento...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600">Gestisci i membri del team JEIns</p>
        </div>
        <Link
          href="/admin/team/new"
          className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuovo Membro
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun membro</h3>
          <p className="text-gray-600 mb-4">Inizia aggiungendo il primo membro del team</p>
          <Link
            href="/admin/team/new"
            className="inline-flex items-center gap-2 bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Aggiungi Membro
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-insubria-100 rounded-full flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-insubria-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/team/${member.id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                {member.name}
              </h3>
              <p className="text-insubria-600 font-medium mb-2">
                {member.role}
              </p>
              {member.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {member.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Ordine: {member.order}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {member.isActive ? 'Attivo' : 'Inattivo'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
