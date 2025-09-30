import ServiceCard from '@/components/ServiceCard'

import type { Metadata } from 'next'

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

export default function ServiziPage() {
  const services = [
    {
      title: "Consulenza Strategica",
      description: "Analisi approfondita dei processi aziendali e sviluppo di strategie personalizzate per il miglioramento dell'efficienza operativa e la crescita del business.",
      sector: "Business Strategy"
    },
    {
      title: "Digital Marketing",
      description: "Strategie digitali complete per aumentare la visibilità online, migliorare l'engagement e generare lead qualificati attraverso canali digitali innovativi.",
      sector: "Marketing Digitale"
    },
    {
      title: "Sviluppo Software",
      description: "Soluzioni software personalizzate per automatizzare processi, migliorare l'efficienza e digitalizzare le operazioni aziendali.",
      sector: "Tecnologia"
    },
    {
      title: "Analisi di Mercato",
      description: "Ricerca di mercato approfondita per comprendere le tendenze, identificare opportunità e sviluppare strategie competitive.",
      sector: "Market Research"
    },
    {
      title: "Formazione e Training",
      description: "Programmi di formazione personalizzati per sviluppare competenze digitali e professionali del team aziendale.",
      sector: "Formazione"
    },
    {
      title: "Brand Identity",
      description: "Sviluppo dell'identità visiva e strategica del brand per comunicare efficacemente i valori e la mission aziendale.",
      sector: "Branding"
    },
    {
      title: "E-commerce Solutions",
      description: "Progettazione e sviluppo di piattaforme e-commerce complete per espandere la presenza online e aumentare le vendite.",
      sector: "E-commerce"
    },
    {
      title: "Social Media Management",
      description: "Gestione completa dei social media con strategie di content marketing per costruire una community fedele e coinvolgente.",
      sector: "Social Media"
    }
  ]

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-in-up hover-lift" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                  <div className="mb-4">
                    <span className="bg-insubria-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {service.sector}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-insubria-600 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    {service.description}
                  </p>
                  <a
                    href="/contatti"
                    className="inline-block text-insubria-600 font-medium hover:text-insubria-700 transition-colors"
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
            <div className="text-center animate-scale-in hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                <div className="bg-insubria-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Analisi
                </h3>
                <p className="text-neutral-500 text-sm">
                  Comprendiamo le tue esigenze e analizziamo il contesto aziendale
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in hover-lift" style={{animationDelay: '0.1s'}}>
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                <div className="bg-insubria-300 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Progettazione
                </h3>
                <p className="text-neutral-500 text-sm">
                  Sviluppiamo una strategia personalizzata per raggiungere i tuoi obiettivi
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in hover-lift" style={{animationDelay: '0.2s'}}>
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                <div className="bg-insubria-200 text-insubria-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Implementazione
                </h3>
                <p className="text-neutral-500 text-sm">
                  Mettiamo in pratica la soluzione con monitoraggio costante
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in hover-lift" style={{animationDelay: '0.3s'}}>
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                <div className="bg-insubria-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  4
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Follow-up
                </h3>
                <p className="text-neutral-500 text-sm">
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
                className="bg-insubria-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-insubria-700 transition-colors"
              >
                Richiedi un preventivo
              </a>
              <a
                href="/chi-siamo"
                className="border-2 border-insubria-600 text-insubria-600 px-8 py-4 rounded-2xl font-semibold hover:bg-insubria-50 transition-colors"
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
