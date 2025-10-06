'use client'

import { useState } from 'react'
import { Settings, Database, Mail, Shield, Bell, Globe, Save, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'JEIns - Junior Enterprise Insubria',
    siteDescription: 'Consulenza aziendale e progetti universitari per studenti e aziende dell\'Università dell\'Insubria.',
    siteUrl: 'https://jeins.it',
    adminEmail: 'admin@jeins.it',
    supportEmail: 'info@jeins.it',
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    maxFileSize: '10',
    allowedFileTypes: 'jpg,jpeg,png,pdf,doc,docx',
    backupFrequency: 'daily',
    analyticsEnabled: true,
    seoEnabled: true,
    socialLogin: false
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      // TODO: Implement settings save API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      toast.success('Impostazioni salvate con successo!')
    } catch (error) {
      toast.error('Errore nel salvare le impostazioni')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    if (confirm('Sei sicuro di voler ripristinare le impostazioni predefinite?')) {
      // TODO: Implement reset functionality
      toast.success('Impostazioni ripristinate')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Impostazioni</h1>
          <p className="text-gray-600">Gestisci le configurazioni generali del sito</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Ripristina
          </button>
          <button 
            onClick={handleSave} 
            disabled={loading}
            className="px-4 py-2 bg-insubria-600 text-white rounded-lg hover:bg-insubria-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Salvataggio...' : 'Salva'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informazioni Generali */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5" />
              Informazioni Generali
            </h2>
            <p className="text-sm text-gray-500">
              Configura le informazioni base del sito
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
                Nome del sito
              </label>
              <input
                id="siteName"
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                placeholder="Nome del sito"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Descrizione
              </label>
              <textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                placeholder="Descrizione del sito"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
            </div>
            <div>
              <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700 mb-2">
                URL del sito
              </label>
              <input
                id="siteUrl"
                type="url"
                value={settings.siteUrl}
                onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                placeholder="https://jeins.it"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
            </div>
          </div>
        </div>

        {/* Email e Notifiche */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5" />
              Email e Notifiche
            </h2>
            <p className="text-sm text-gray-500">
              Configura le impostazioni email
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email amministratore
              </label>
              <input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                placeholder="admin@jeins.it"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
            </div>
            <div>
              <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email supporto
              </label>
              <input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                placeholder="info@jeins.it"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="emailNotifications" className="block text-sm font-medium text-gray-700">
                  Notifiche email
                </label>
                <p className="text-sm text-gray-500">Invia notifiche per nuove candidature e messaggi</p>
              </div>
              <input
                id="emailNotifications"
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                className="h-4 w-4 text-insubria-600 focus:ring-insubria-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Sicurezza e Accesso */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5" />
              Sicurezza e Accesso
            </h2>
            <p className="text-sm text-gray-500">
              Gestisci le impostazioni di sicurezza
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="maintenanceMode" className="block text-sm font-medium text-gray-700">
                  Modalità manutenzione
                </label>
                <p className="text-sm text-gray-500">Nasconde il sito ai visitatori</p>
              </div>
              <input
                id="maintenanceMode"
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                className="h-4 w-4 text-insubria-600 focus:ring-insubria-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="allowRegistration" className="block text-sm font-medium text-gray-700">
                  Registrazione utenti
                </label>
                <p className="text-sm text-gray-500">Permetti la registrazione di nuovi utenti</p>
              </div>
              <input
                id="allowRegistration"
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => setSettings({...settings, allowRegistration: e.target.checked})}
                className="h-4 w-4 text-insubria-600 focus:ring-insubria-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="socialLogin" className="block text-sm font-medium text-gray-700">
                  Login social
                </label>
                <p className="text-sm text-gray-500">Permetti login con Google, Facebook, etc.</p>
              </div>
              <input
                id="socialLogin"
                type="checkbox"
                checked={settings.socialLogin}
                onChange={(e) => setSettings({...settings, socialLogin: e.target.checked})}
                className="h-4 w-4 text-insubria-600 focus:ring-insubria-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* File e Upload */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <Database className="h-5 w-5" />
              File e Upload
            </h2>
            <p className="text-sm text-gray-500">
              Configura le impostazioni per i file
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="maxFileSize" className="block text-sm font-medium text-gray-700 mb-2">
                Dimensione massima file (MB)
              </label>
              <input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({...settings, maxFileSize: e.target.value})}
                placeholder="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
            </div>
            <div>
              <label htmlFor="allowedFileTypes" className="block text-sm font-medium text-gray-700 mb-2">
                Tipi di file consentiti
              </label>
              <input
                id="allowedFileTypes"
                type="text"
                value={settings.allowedFileTypes}
                onChange={(e) => setSettings({...settings, allowedFileTypes: e.target.value})}
                placeholder="jpg,jpeg,png,pdf,doc,docx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              />
            </div>
            <div>
              <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700 mb-2">
                Frequenza backup
              </label>
              <select
                id="backupFrequency"
                value={settings.backupFrequency}
                onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
              >
                <option value="daily">Giornaliero</option>
                <option value="weekly">Settimanale</option>
                <option value="monthly">Mensile</option>
              </select>
            </div>
          </div>
        </div>

        {/* SEO e Analytics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <Bell className="h-5 w-5" />
              SEO e Analytics
            </h2>
            <p className="text-sm text-gray-500">
              Configura SEO e analytics
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="seoEnabled" className="block text-sm font-medium text-gray-700">
                  SEO abilitato
                </label>
                <p className="text-sm text-gray-500">Ottimizza il sito per i motori di ricerca</p>
              </div>
              <input
                id="seoEnabled"
                type="checkbox"
                checked={settings.seoEnabled}
                onChange={(e) => setSettings({...settings, seoEnabled: e.target.checked})}
                className="h-4 w-4 text-insubria-600 focus:ring-insubria-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="analyticsEnabled" className="block text-sm font-medium text-gray-700">
                  Analytics abilitato
                </label>
                <p className="text-sm text-gray-500">Traccia le visite e le statistiche</p>
              </div>
              <input
                id="analyticsEnabled"
                type="checkbox"
                checked={settings.analyticsEnabled}
                onChange={(e) => setSettings({...settings, analyticsEnabled: e.target.checked})}
                className="h-4 w-4 text-insubria-600 focus:ring-insubria-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Azioni di Sistema */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <Settings className="h-5 w-5" />
              Azioni di Sistema
            </h2>
            <p className="text-sm text-gray-500">
              Operazioni avanzate sul sistema
            </p>
          </div>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Backup Database
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Pulizia Cache
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Test Connessione Email
            </button>
            <div className="border-t border-gray-200 my-4"></div>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Reset Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'JEIns - Junior Enterprise Insubria',
    siteDescription: 'Consulenza aziendale e progetti universitari per studenti e aziende dell\'Università dell\'Insubria.',
    siteUrl: 'https://jeins.it',
    adminEmail: 'admin@jeins.it',
    supportEmail: 'info@jeins.it',
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    maxFileSize: '10',
    allowedFileTypes: 'jpg,jpeg,png,pdf,doc,docx',
    backupFrequency: 'daily',
    analyticsEnabled: true,
    seoEnabled: true,
    socialLogin: false
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      // TODO: Implement settings save API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      toast.success('Impostazioni salvate con successo!')
    } catch (error) {
      toast.error('Errore nel salvare le impostazioni')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    if (confirm('Sei sicuro di voler ripristinare le impostazioni predefinite?')) {
      // TODO: Implement reset functionality
      toast.success('Impostazioni ripristinate')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Impostazioni</h1>
          <p className="text-gray-600">Gestisci le configurazioni generali del sito</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Ripristina
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Salvataggio...' : 'Salva'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informazioni Generali */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Informazioni Generali
            </CardTitle>
            <CardDescription>
              Configura le informazioni base del sito
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Nome del sito</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                placeholder="Nome del sito"
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Descrizione</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                placeholder="Descrizione del sito"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="siteUrl">URL del sito</Label>
              <Input
                id="siteUrl"
                value={settings.siteUrl}
                onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                placeholder="https://jeins.it"
              />
            </div>
          </CardContent>
        </Card>

        {/* Email e Notifiche */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email e Notifiche
            </CardTitle>
            <CardDescription>
              Configura le impostazioni email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="adminEmail">Email amministratore</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                placeholder="admin@jeins.it"
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Email supporto</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                placeholder="info@jeins.it"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Notifiche email</Label>
                <p className="text-sm text-gray-500">Invia notifiche per nuove candidature e messaggi</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sicurezza e Accesso */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Sicurezza e Accesso
            </CardTitle>
            <CardDescription>
              Gestisci le impostazioni di sicurezza
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Modalità manutenzione</Label>
                <p className="text-sm text-gray-500">Nasconde il sito ai visitatori</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowRegistration">Registrazione utenti</Label>
                <p className="text-sm text-gray-500">Permetti la registrazione di nuovi utenti</p>
              </div>
              <Switch
                id="allowRegistration"
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => setSettings({...settings, allowRegistration: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="socialLogin">Login social</Label>
                <p className="text-sm text-gray-500">Permetti login con Google, Facebook, etc.</p>
              </div>
              <Switch
                id="socialLogin"
                checked={settings.socialLogin}
                onCheckedChange={(checked) => setSettings({...settings, socialLogin: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* File e Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              File e Upload
            </CardTitle>
            <CardDescription>
              Configura le impostazioni per i file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxFileSize">Dimensione massima file (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({...settings, maxFileSize: e.target.value})}
                placeholder="10"
              />
            </div>
            <div>
              <Label htmlFor="allowedFileTypes">Tipi di file consentiti</Label>
              <Input
                id="allowedFileTypes"
                value={settings.allowedFileTypes}
                onChange={(e) => setSettings({...settings, allowedFileTypes: e.target.value})}
                placeholder="jpg,jpeg,png,pdf,doc,docx"
              />
            </div>
            <div>
              <Label htmlFor="backupFrequency">Frequenza backup</Label>
              <select
                id="backupFrequency"
                value={settings.backupFrequency}
                onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-insubria-500"
              >
                <option value="daily">Giornaliero</option>
                <option value="weekly">Settimanale</option>
                <option value="monthly">Mensile</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* SEO e Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              SEO e Analytics
            </CardTitle>
            <CardDescription>
              Configura SEO e analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="seoEnabled">SEO abilitato</Label>
                <p className="text-sm text-gray-500">Ottimizza il sito per i motori di ricerca</p>
              </div>
              <Switch
                id="seoEnabled"
                checked={settings.seoEnabled}
                onCheckedChange={(checked) => setSettings({...settings, seoEnabled: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analyticsEnabled">Analytics abilitato</Label>
                <p className="text-sm text-gray-500">Traccia le visite e le statistiche</p>
              </div>
              <Switch
                id="analyticsEnabled"
                checked={settings.analyticsEnabled}
                onCheckedChange={(checked) => setSettings({...settings, analyticsEnabled: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Azioni di Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Azioni di Sistema
            </CardTitle>
            <CardDescription>
              Operazioni avanzate sul sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Backup Database
            </Button>
            <Button variant="outline" className="w-full">
              Pulizia Cache
            </Button>
            <Button variant="outline" className="w-full">
              Test Connessione Email
            </Button>
            <Separator />
            <Button variant="destructive" className="w-full">
              Reset Completo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
