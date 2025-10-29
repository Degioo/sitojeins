'use client'

import { useState, useEffect } from 'react'
import { Key, Save, CheckSquare, Square } from 'lucide-react'
import toast from 'react-hot-toast'

interface Role {
  id: string
  name: string
}

interface Permission {
  id: string
  menuItem: string
  roleId: string
}

// Definisce tutte le voci di menu disponibili
const menuItems = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'home', name: 'Pagina Home' },
  { id: 'services', name: 'Servizi' },
  { id: 'projects', name: 'Progetti' },
  { id: 'blog', name: 'Blog' },
  { id: 'team', name: 'Team' },
  { id: 'recruitment', name: 'Recruitment' },
  { id: 'contacts', name: 'Contatti' },
  { id: 'newsletter', name: 'Newsletter' },
  { id: 'policies', name: 'Privacy Policy' },
]

export default function PermissionsManager() {
  const [roles, setRoles] = useState<Role[]>([])
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchRoles()
  }, [])

  useEffect(() => {
    if (selectedRole) {
      fetchPermissions()
    }
  }, [selectedRole])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles')
      if (response.ok) {
        const data = await response.json()
        setRoles(data)
        if (data.length > 0 && !selectedRole) {
          setSelectedRole(data[0].id)
        }
      }
    } catch (error) {
      toast.error('Errore nel caricamento dei ruoli')
    } finally {
      setLoading(false)
    }
  }

  const fetchPermissions = async () => {
    if (!selectedRole) return

    try {
      const response = await fetch(`/api/admin/permissions?roleId=${selectedRole}`)
      if (response.ok) {
        const data: Permission[] = await response.json()
        setSelectedPermissions(data.map(p => p.menuItem))
      }
    } catch (error) {
      toast.error('Errore nel caricamento dei permessi')
    }
  }

  const togglePermission = (menuItemId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(menuItemId)
        ? prev.filter(id => id !== menuItemId)
        : [...prev, menuItemId]
    )
  }

  const handleSave = async () => {
    if (!selectedRole) {
      toast.error('Seleziona un ruolo')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/admin/permissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleId: selectedRole,
          menuItems: selectedPermissions
        })
      })

      if (response.ok) {
        toast.success('Permessi salvati con successo')
        fetchPermissions()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Errore nel salvataggio')
      }
    } catch (error) {
      toast.error('Errore nella richiesta')
    } finally {
      setSaving(false)
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
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Gestione Permessi Sidebar</h2>
        <p className="text-sm text-gray-600 mt-1">
          Seleziona quali voci della sidebar ogni ruolo può vedere
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleziona Ruolo
          </label>
          <select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value)
              setSelectedPermissions([])
            }}
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
          >
            <option value="">-- Seleziona un ruolo --</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {selectedRole && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Voci Menu Disponibili
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {menuItems.map((item) => {
                  const isSelected = selectedPermissions.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => togglePermission(item.id)}
                      className={`flex items-center gap-2 p-3 border-2 rounded-lg transition-colors ${
                        isSelected
                          ? 'border-insubria-500 bg-insubria-50 text-insubria-900'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {isSelected ? (
                        <CheckSquare className="h-5 w-5 text-insubria-600" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="font-medium">{item.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-insubria-600 text-white rounded-lg hover:bg-insubria-700 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Salvataggio...' : 'Salva Permessi'}
              </button>
            </div>
          </>
        )}

        {!selectedRole && (
          <div className="text-center py-12 text-gray-500">
            <Key className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>Seleziona un ruolo per gestire i suoi permessi</p>
          </div>
        )}
      </div>
    </div>
  )
}

