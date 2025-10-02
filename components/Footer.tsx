import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import { prisma } from '@/lib/prisma'

async function getContacts() {
  return await prisma.contact.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })
}

export default async function Footer() {
  const contacts = await getContacts()
  
  // Organizza i contatti per tipo
  const emailContact = contacts.find(c => c.type === 'email')
  const phoneContact = contacts.find(c => c.type === 'phone')
  const addressContact = contacts.find(c => c.type === 'address')
  const facebookContact = contacts.find(c => c.type === 'facebook')
  const instagramContact = contacts.find(c => c.type === 'instagram')
  const linkedinContact = contacts.find(c => c.type === 'linkedin')
  return (
    <footer className="bg-insubria-50 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contatti */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Contatti</h3>
            <div className="space-y-3">
              {emailContact && (
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-insubria-600" />
                  <span className="text-neutral-500">{emailContact.value}</span>
                </div>
              )}
              {phoneContact && (
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-insubria-600" />
                  <span className="text-neutral-500">{phoneContact.value}</span>
                </div>
              )}
              {addressContact && (
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-insubria-600" />
                  <span className="text-neutral-500">{addressContact.value}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Seguici</h3>
            <div className="flex space-x-4">
              {facebookContact && (
                <a href={facebookContact.value} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-insubria-600 transition-colors">
                  <Facebook size={20} />
                </a>
              )}
              {instagramContact && (
                <a href={instagramContact.value} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-insubria-600 transition-colors">
                  <Instagram size={20} />
                </a>
              )}
              {linkedinContact && (
                <a href={linkedinContact.value} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-insubria-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Link rapidi */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Link rapidi</h3>
            <div className="space-y-2">
              <Link href="/chi-siamo" className="block text-neutral-500 hover:text-insubria-600 transition-colors">
                Chi siamo
              </Link>
              <Link href="/servizi" className="block text-neutral-500 hover:text-insubria-600 transition-colors">
                Servizi
              </Link>
              <Link href="/recruitment" className="block text-neutral-500 hover:text-insubria-600 transition-colors">
                Recruitment
              </Link>
              <Link href="/blog" className="block text-neutral-500 hover:text-insubria-600 transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Privacy */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Privacy</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-neutral-500 hover:text-insubria-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="block text-neutral-500 hover:text-insubria-600 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/terms" className="block text-neutral-500 hover:text-insubria-600 transition-colors">
                Termini e Condizioni
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-100 mt-8 pt-8 text-center">
          <p className="text-neutral-500">
            © 2024 JEIns - Junior Enterprise Insubria. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  )
}
