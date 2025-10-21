import ServiceCard from '@/components/ServiceCard'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

// Ricarica i dati ogni 60 secondi
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Servizi - JEIns | Consulenza Aziendale e Progetti Universitari',
  description: 'Scopri i servizi di JEIns: consulenza aziendale, sviluppo web, marketing digitale, business consulting e progetti di ricerca. Soluzioni innovative per aziende e opportunità di crescita per studenti.',
  keywords: 'servizi JEIns, consulenza aziendale, sviluppo web, marketing digitale, business consulting, progetti universitari, servizi studenti',
  openGraph: {
    title: 'Servizi - JEIns | Consulenza Aziendale e Progetti Universitari',
    description: 'Scopri i servizi di JEIns: consulenza aziendale, sviluppo web, marketing digitale e business consulting.',
    url: 'https://jeins.it/servizi',
  },
  alternates: {
    canonical: 'https://jeins.it/servizi',
  },
}

async function getServices() {
  return await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })
}

export default async function ServiziPage() {
  const services = await getServices()

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
            I nostri servizi
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Soluzioni innovative e personalizzate per aziende di ogni dimensione. 
            Il nostro team di studenti qualificati offre consulenza professionale 
            in diversi settori.
          </p>
        </div>
      </section>

      {/* Servizi Grid */}
      <section className="py-20 section-white relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-in-up hover-lift card-standard card-fixed-height" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="mb-4">
                    <span className="bg-insubria-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {service.sector}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-insubria-600 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-500 mb-4 flex-grow">
                    {service.description}
                  </p>
                  <a
                    href="/contatti"
                    className="inline-block text-insubria-600 font-medium hover:text-insubria-700 transition-colors mt-auto"
                  >
                    Richiedi un preventivo →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo di lavoro */}
      <section className="py-20 section-green-light relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 newspaper-headline">
              Il nostro processo di lavoro
            </h2>
            <p className="text-neutral-500 text-lg">
              Un approccio strutturato per garantire risultati eccellenti
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in h-full sequence-line">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm h-full flex flex-col sequence-step">
                <div className="bg-insubria-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Analisi
                </h3>
                <p className="text-neutral-500 text-sm flex-grow">
                  Comprendiamo le tue esigenze e analizziamo il contesto aziendale
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in h-full sequence-line" style={{animationDelay: '0.1s'}}>
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm h-full flex flex-col sequence-step">
                <div className="bg-insubria-300 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Progettazione
                </h3>
                <p className="text-neutral-500 text-sm flex-grow">
                  Sviluppiamo una strategia personalizzata per raggiungere i tuoi obiettivi
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in h-full sequence-line" style={{animationDelay: '0.2s'}}>
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm h-full flex flex-col sequence-step">
                <div className="bg-insubria-200 text-insubria-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Implementazione
                </h3>
                <p className="text-neutral-500 text-sm flex-grow">
                  Mettiamo in pratica la soluzione con monitoraggio costante
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in h-full" style={{animationDelay: '0.3s'}}>
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm h-full flex flex-col sequence-step">
                <div className="bg-insubria-50 text-insubria-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  4
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Follow-up
                </h3>
                <p className="text-neutral-500 text-sm flex-grow">
                  Monitoriamo i risultati e ottimizziamo la soluzione implementata
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 section-white relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 newspaper-headline">
              Pronto a iniziare il tuo progetto?
            </h2>
            <p className="text-neutral-500 text-lg mb-8">
              Contattaci per una consulenza gratuita e scopri come possiamo aiutarti 
              a raggiungere i tuoi obiettivi aziendali.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contatti"
                className="cta-primary px-8 py-4"
              >
                Richiedi un preventivo
              </a>
              <a
                href="/chi-siamo"
                className="cta-secondary px-8 py-4"
              >
                Scopri di più su di noi
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
