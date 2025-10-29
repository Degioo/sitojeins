'use client'

import { useState, useEffect } from 'react'
import { Shield, Plus, Edit, Trash2, Save, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface Role {
  id: string
  name: string
  description?: string | null
  isSystem: boolean
  _count?: {
    users: number
    permissions: number
  }
}

export default function RolesManager() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '' })

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles')
      if (response.ok) {
        const data = await response.json()
        setRoles(data)
      } else {
        toast.error('Errore nel caricamento dei ruoli')
      }
    } catch (error) {
      toast.error('Errore nel caricamento dei ruoli')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingRole) {
        // Aggiorna ruolo esistente
        const response = await fetch('/api/admin/roles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingRole.id,
            name: formData.name,
            description: formData.description
          })
        })

        if (response.ok) {
          toast.success('Ruolo aggiornato con successo')
          setShowForm(false)
          setEditingRole(null)
          setFormData({ name: '', description: '' })
          fetchRoles()
        } else {
          const error = await response.json()
          toast.error(error.error || 'Errore nell\'aggiornamento del ruolo')
        }
      } else {
        // Crea nuovo ruolo
        const response = await fetch('/api/admin/roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })

        if (response.ok) {
          toast.success('Ruolo creato con successo')
          setShowForm(false)
          setFormData({ name: '', description: '' })
          fetchRoles()
        } else {
          const error = await response.json()
          toast.error(error.error || 'Errore nella creazione del ruolo')
        }
      }
    } catch (error) {
      toast.error('Errore nella richiesta')
    }
  }

  const handleEdit = (role: Role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      description: role.description || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string, isSystem: boolean) => {
    if (isSystem) {
      toast.error('Non è possibile eliminare un ruolo di sistema')
      return
    }

    if (!confirm('Sei sicuro di voler eliminare questo ruolo?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/roles?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Ruolo eliminato con successo')
        fetchRoles()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Errore nell\'eliminazione del ruolo')
      }
    } catch (error) {
      toast.error('Errore nella richiesta')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-insubria-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Gestione Ruoli</h2>
        {!showForm && (
          <button
            onClick={() => {
              setEditingRole(null)
              setFormData({ name: '', description: '' })
              setShowForm(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-insubria-600 text-white rounded-lg hover:bg-insubria-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nuovo Ruolo
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {editingRole ? 'Modifica Ruolo' : 'Nuovo Ruolo'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingRole(null)
                setFormData({ name: '', description: '' })
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Ruolo *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                placeholder="Es: Editor, Manager, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrizione
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
                rows={3}
                placeholder="Descrizione del ruolo..."
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-insubria-600 text-white rounded-lg hover:bg-insubria-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                {editingRole ? 'Aggiorna' : 'Crea'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingRole(null)
                  setFormData({ name: '', description: '' })
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annulla
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrizione
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utenti
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permessi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-insubria-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{role.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {role.description || '-'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {role._count?.users || 0}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {role._count?.permissions || 0}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    role.isSystem
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {role.isSystem ? 'Sistema' : 'Personalizzato'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(role)}
                      className="text-insubria-600 hover:text-insubria-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(role.id, role.isSystem)}
                      disabled={role.isSystem}
                      className={`${role.isSystem ? 'text-gray-300 cursor-not-allowed' : 'text-red-600 hover:text-red-900'}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {roles.length === 0 && (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nessun ruolo</h3>
            <p className="mt-1 text-sm text-gray-500">Inizia creando il tuo primo ruolo.</p>
          </div>
        )}
      </div>
    </div>
  )
}

