'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    getSession().then((session) => {
      if (session) {
        router.push('/admin')
      }
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Prima fa logout per pulire la sessione precedente
      await signOut({ redirect: false })
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Credenziali non valide')
      } else if (result?.ok) {
        // Aspetta che la sessione si aggiorni
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Verifica la nuova sessione più volte per essere sicuri
        let session = null
        for (let i = 0; i < 3; i++) {
          session = await getSession()
          if (session?.user?.roleId) {
            break
          }
          await new Promise(resolve => setTimeout(resolve, 500))
        }
        
        if (session) {
          console.log('Login successful, session:', {
            email: session.user?.email,
            roleId: session.user?.roleId,
            role: session.user?.role
          })
          toast.success('Login effettuato con successo')
          router.push('/admin')
          router.refresh() // Forza il refresh della pagina
        } else {
          console.error('Session not loaded properly')
          toast.error('Errore nel caricamento della sessione')
        }
      }
    } catch (error) {
      toast.error('Errore durante il login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            JEIns Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Accedi alla dashboard di gestione
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email o Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-insubria-500 focus:border-insubria-500 focus:z-10 sm:text-sm"
                  placeholder="admin@jeins.it o username"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-insubria-500 focus:border-insubria-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-insubria-600 hover:bg-insubria-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-insubria-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Accesso...' : 'Accedi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}