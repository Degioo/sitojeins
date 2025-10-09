import ContactForm from '@/components/ContactForm'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

// Ricarica i dati ogni 60 secondi
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contatti - JEIns | Contattaci per Consulenza e Progetti',
  description: 'Contatta JEIns per consulenza aziendale, progetti di ricerca e collaborazioni. Siamo disponibili per aziende e studenti dell\'Università dell\'Insubria. Richiedi un preventivo gratuito.',
  keywords: 'contatti JEIns, consulenza gratuita, preventivo JEIns, contatto Junior Enterprise, Università Insubria contatti',
  openGraph: {
    title: 'Contatti - JEIns | Contattaci per Consulenza e Progetti',
    description: 'Contatta JEIns per consulenza aziendale e progetti di ricerca. Richiedi un preventivo gratuito.',
    url: 'https://jeins.it/contatti',
  },
  alternates: {
    canonical: 'https://jeins.it/contatti',
  },
}

async function getContacts() {
  return await prisma.contact.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })
}

export default async function ContattiPage() {
  const contacts = await getContacts()
  
  // Organizza i contatti per tipo (supporta contatti multipli dello stesso tipo)
  const emailContacts = contacts.filter(c => c.type === 'email')
  const phoneContacts = contacts.filter(c => c.type === 'phone')
  const addressContacts = contacts.filter(c => c.type === 'address')
  const facebookContact = contacts.find(c => c.type === 'facebook')
  const instagramContact = contacts.find(c => c.type === 'instagram')
  const linkedinContact = contacts.find(c => c.type === 'linkedin')
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 section-green relative overflow-hidden">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
        <div className="decorative-strip decorative-strip-bottom"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 newspaper-headline">
            Contattaci
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Hai un progetto in mente? Vuoi saperne di più sui nostri servizi? 
            Siamo qui per aiutarti. Contattaci per una consulenza gratuita.
          </p>
        </div>
      </section>

      {/* Form di contatto */}
      <section className="py-20 section-white relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Informazioni di contatto */}
      {(emailContacts.length > 0 || phoneContacts.length > 0 || addressContacts.length > 0) && (
        <section className="py-20 section-green-light relative">
          {/* Elementi decorativi */}
          <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
          <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
          <div className="decorative-strip decorative-strip-top"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Email */}
              {emailContacts.length > 0 && (
                <div className="text-center animate-scale-in hover-lift">
                  <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                    <div className="bg-insubria-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📧</span>
                    </div>
                    <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                      Email
                    </h3>
                    {emailContacts.map((email, index) => (
                      <div key={email.id}>
                        <p className="text-neutral-500 mb-1">
                          {email.value}
                        </p>
                        {email.label && (
                          <p className="text-neutral-400 text-sm mb-2">
                            {email.label}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Telefono */}
              {phoneContacts.length > 0 && (
                <div className="text-center animate-scale-in hover-lift" style={{animationDelay: '0.1s'}}>
                  <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                    <div className="bg-insubria-300 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📱</span>
                    </div>
                    <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                      Telefono
                    </h3>
                    {phoneContacts.map((phone, index) => (
                      <div key={phone.id}>
                        <p className="text-neutral-500 mb-1">
                          {phone.value}
                        </p>
                        {phone.label && (
                          <p className="text-neutral-400 text-sm mb-2">
                            {phone.label}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Indirizzo */}
              {addressContacts.length > 0 && (
                <div className="text-center animate-scale-in hover-lift" style={{animationDelay: '0.2s'}}>
                  <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                    <div className="bg-insubria-200 text-insubria-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📍</span>
                    </div>
                    <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                      Sede
                    </h3>
                    {addressContacts.map((address, index) => (
                      <div key={address.id}>
                        <p className="text-neutral-500 mb-1">
                          {address.value}
                        </p>
                        {address.label && (
                          <p className="text-neutral-400 text-sm mb-2">
                            {address.label}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Social Media */}
      {(facebookContact || instagramContact || linkedinContact) && (
        <section className="py-20 section-white relative">
          {/* Elementi decorativi */}
          <div className="decorative-corner top-0 left-0"></div>
          <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
          <div className="decorative-strip decorative-strip-top"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-6 newspaper-headline">
                Seguici sui social
              </h2>
              <p className="text-neutral-500 text-lg mb-8">
                Resta aggiornato sulle nostre attività e progetti
              </p>
              
              <div className="flex justify-center space-x-6">
                {facebookContact && (
                  <a 
                    href={facebookContact.value} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-insubria-50 text-insubria-600 px-6 py-3 rounded-2xl font-semibold hover:bg-insubria-600 hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {instagramContact && (
                  <a 
                    href={instagramContact.value} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-insubria-50 text-insubria-600 px-6 py-3 rounded-2xl font-semibold hover:bg-insubria-600 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {linkedinContact && (
                  <a 
                    href={linkedinContact.value} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-insubria-50 text-insubria-600 px-6 py-3 rounded-2xl font-semibold hover:bg-insubria-600 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
