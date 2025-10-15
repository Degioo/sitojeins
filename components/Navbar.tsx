'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Chi siamo', href: '/chi-siamo' },
    { name: 'Servizi', href: '/servizi' },
    { name: 'Blog', href: '/blog' },
    { name: 'Recruitment', href: '/recruitment' },
    { name: 'Contatti', href: '/contatti' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logo-jeins.png" 
              alt="JEIns Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-2xl font-medium transition-colors ${
                    isActive
                      ? 'bg-insubria-600 text-white'
                      : 'text-neutral-500 hover:bg-insubria-50 hover:text-insubria-600'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
            <Link
              href="/contatti"
              className="cta-navbar ml-4"
            >
              Richiedi un preventivo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-neutral-500 hover:text-insubria-600 transition-colors ${isMenuOpen ? 'hamburger-active' : ''}`}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div className="hamburger-line w-6 h-0.5 bg-current mb-1"></div>
                <div className="hamburger-line w-6 h-0.5 bg-current mb-1"></div>
                <div className="hamburger-line w-6 h-0.5 bg-current"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-neutral-100">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-2xl font-medium transition-colors ${
                      isActive
                        ? 'bg-insubria-600 text-white'
                        : 'text-neutral-500 hover:bg-insubria-50 hover:text-insubria-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link
                href="/contatti"
                className="block mx-3 mt-4 cta-navbar text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Richiedi un preventivo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
