'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Settings, Database, Mail, Shield, Bell, Globe } from 'lucide-react'
import { toast } from 'react-hot-toast'

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
