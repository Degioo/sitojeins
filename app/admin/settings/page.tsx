'use client'

import { useState } from 'react'
import { Settings, Shield, Users, Key } from 'lucide-react'
import RolesManager from '@/components/admin/RolesManager'
import UsersManager from '@/components/admin/UsersManager'
import PermissionsManager from '@/components/admin/PermissionsManager'

type TabType = 'roles' | 'users' | 'permissions'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('roles')

  const tabs = [
    { id: 'roles' as TabType, name: 'Ruoli', icon: Shield },
    { id: 'users' as TabType, name: 'Utenti', icon: Users },
    { id: 'permissions' as TabType, name: 'Permessi Sidebar', icon: Key },
  ]

  return (
    <div className="space-y-6">
        <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Settings className="h-8 w-8" />
          Impostazioni Amministrative
        </h1>
        <p className="text-gray-600 mt-2">
          Gestisci ruoli, utenti e permessi di accesso all&apos;area amministrativa
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
                      <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-insubria-500 text-insubria-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.name}
                    </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'roles' && <RolesManager />}
        {activeTab === 'users' && <UsersManager />}
        {activeTab === 'permissions' && <PermissionsManager />}
      </div>
    </div>
  )
}
