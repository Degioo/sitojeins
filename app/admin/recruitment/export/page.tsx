'use client'

import { useState, useEffect } from 'react'
import { Download, FileSpreadsheet, FileText, Calendar, Users, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

interface Application {
  id: string
  name: string
  email: string
  course: string
  year: string
  roles: string
  status: string
  notes?: string
  cvUrl?: string
  createdAt: string
  updatedAt: string
}

export default function ExportPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: '',
  })

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/recruitment/applications')
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      }
    } catch (error) {
      toast.error('Errore nel caricamento delle candidature')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredApplications = applications.filter(app => {
    if (filters.status !== 'all' && app.status !== filters.status) return false
    if (filters.dateFrom && new Date(app.createdAt) < new Date(filters.dateFrom)) return false
    if (filters.dateTo && new Date(app.createdAt) > new Date(filters.dateTo)) return false
    return true
  })

  const exportToCSV = () => {
    const headers = [
      'Nome',
      'Email',
      'Corso',
      'Anno',
      'Ruoli',
      'Stato',
      'Note',
      'Data Candidatura',
      'Ultima Modifica'
    ]

    const csvContent = [
      headers.join(','),
      ...filteredApplications.map(app => [
        `"${app.name}"`,
        `"${app.email}"`,
        `"${app.course}"`,
        `"${app.year}"`,
        `"${app.roles ? JSON.parse(app.roles).join('; ') : ''}"`,
        `"${app.status}"`,
        `"${app.notes || ''}"`,
        `"${new Date(app.createdAt).toLocaleDateString('it-IT')}"`,
        `"${new Date(app.updatedAt).toLocaleDateString('it-IT')}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `candidature-jeins-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('File CSV esportato con successo!')
  }

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(filteredApplications, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `candidature-jeins-${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('File JSON esportato con successo!')
  }

  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      reviewed: 0,
      accepted: 0,
      rejected: 0,
    }
    
    filteredApplications.forEach(app => {
      counts[app.status as keyof typeof counts]++
    })
    
    return counts
  }

  const statusCounts = getStatusCounts()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-insubria-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Esporta Dati Candidature</h1>
          <p className="text-gray-600">Esporta e analizza i dati delle candidature</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Totale</p>
              <p className="text-2xl font-bold text-gray-900">{filteredApplications.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Attesa</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Accettate</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.accepted}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100">
              <Calendar className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rifiutate</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stato</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
            >
              <option value="all">Tutti</option>
              <option value="pending">In Attesa</option>
              <option value="reviewed">In Revisione</option>
              <option value="accepted">Accettate</option>
              <option value="rejected">Rifiutate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Da</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data A</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-insubria-500 focus:border-insubria-500"
            />
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Opzioni di Esportazione</h2>
        <div className="flex gap-4">
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FileSpreadsheet className="h-5 w-5" />
            Esporta CSV
          </button>
          <button
            onClick={exportToJSON}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FileText className="h-5 w-5" />
            Esporta JSON
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Verranno esportate {filteredApplications.length} candidature con i filtri applicati.
        </p>
      </div>
    </div>
  )
}
