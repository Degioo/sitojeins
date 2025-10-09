import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Calendar, FileText, Shield } from 'lucide-react'

// Ricarica i dati ogni 60 secondi
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Privacy Policy - JEIns | Trattamento Dati Personali',
  description: 'Privacy Policy di JEIns - Junior Enterprise Insubria. Informazioni sul trattamento dei dati personali secondo il GDPR e la normativa italiana.',
  keywords: 'privacy policy, GDPR, dati personali, JEIns, Junior Enterprise Insubria, trattamento dati',
  openGraph: {
    title: 'Privacy Policy - JEIns',
    description: 'Privacy Policy di JEIns - Junior Enterprise Insubria',
    url: 'https://jeins.it/privacy',
  },
  alternates: {
    canonical: 'https://jeins.it/privacy',
  },
}

async function getPrivacyPolicy() {
  const policy = await prisma.policy.findFirst({
    where: { 
      type: 'privacy',
      isActive: true 
    }
  })

  if (!policy) {
    notFound()
  }

  return policy
}

export default async function PrivacyPolicyPage() {
  const policy = await getPrivacyPolicy()

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 section-green relative overflow-hidden">
        <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
        <div className="decorative-strip decorative-strip-bottom"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 newspaper-headline">
            Privacy Policy
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Informazioni sul trattamento dei dati personali secondo il GDPR
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 section-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Policy Header */}
          <div className="bg-white border-2 border-insubria-200 rounded-2xl p-8 mb-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-insubria-600 p-3 rounded-2xl">
                <FileText className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-insubria-600">{policy.title}</h2>
                <div className="flex items-center gap-4 text-sm text-neutral-500 mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Versione {policy.version}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Ultima modifica: {new Date(policy.updatedAt).toLocaleDateString('it-IT')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="bg-white border-2 border-insubria-200 rounded-2xl p-8 shadow-sm">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-insubria-600 prose-a:text-insubria-600 prose-strong:text-insubria-600"
              dangerouslySetInnerHTML={{ __html: policy.content }}
            />
          </div>

          {/* Contact Information */}
          <div className="bg-insubria-50 border-2 border-insubria-200 rounded-2xl p-8 mt-8">
            <h3 className="text-xl font-bold text-insubria-600 mb-4">Contatti per la Privacy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-insubria-600 mb-2">Titolare del Trattamento</h4>
                <p className="text-neutral-500">JEIns - Junior Enterprise Insubria</p>
                <p className="text-neutral-500">Università dell&apos;Insubria</p>
              </div>
              <div>
                <h4 className="font-semibold text-insubria-600 mb-2">Contatti</h4>
                <p className="text-neutral-500">Email: privacy@jeins.it</p>
                <p className="text-neutral-500">Telefono: +39 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
