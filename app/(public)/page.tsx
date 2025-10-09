import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import StatsCard from '@/components/StatsCard'
import PortfolioCard from '@/components/PortfolioCard'
import NewsletterBox from '@/components/NewsletterBox'
import ContactForm from '@/components/ContactForm'
import { prisma } from '@/lib/prisma'

// Ricarica i dati ogni 60 secondi (ISR - Incremental Static Regeneration)
export const revalidate = 60

async function getHomeData() {
  const [services, projects, stats, sections] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 3
    }),
    prisma.project.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 6
    }),
    {
      projects: await prisma.project.count({ where: { isActive: true } }),
      services: await prisma.service.count({ where: { isActive: true } }),
      applications: await prisma.recruitmentApplication.count(),
      team: 15 // Placeholder per ora
    },
    prisma.homeSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
  ])

  return { services, projects, stats, sections }
}

export default async function HomePage() {
  const { services, projects, stats, sections } = await getHomeData()
  
  // Crea un oggetto per accedere facilmente alle configurazioni delle sezioni
  const sectionConfig = sections.reduce((acc, section) => {
    acc[section.name] = section
    return acc
  }, {} as Record<string, any>)

  return (
    <main>
      {/* Hero Section */}
      {sectionConfig.hero?.isActive && (
        <Hero
          title={sectionConfig.hero.title || "Mostriamo il valore degli studenti dell'Insubria"}
          subtitle={sectionConfig.hero.subtitle || 'Consulenza, progetti e crescita: per aziende e studenti'}
          primaryCta="Richiedi un preventivo"
          secondaryCta="Unisciti a noi"
          primaryCtaHref="/contatti"
          secondaryCtaHref="/recruitment"
          backgroundImage="/images/hero-universita.jpg"
        />
      )}

      {/* Servizi in evidenza */}
      {sectionConfig.services?.isActive && (
        <section className="py-20 section-white relative overflow-hidden">
          {/* Elementi decorativi */}
          <div className="decorative-corner top-0 left-0"></div>
          <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
          <div className="decorative-strip decorative-strip-top"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-6 newspaper-headline">
                {sectionConfig.services.title || 'I nostri servizi'}
              </h2>
              <p className="text-neutral-500 text-xl max-w-3xl mx-auto">
                {sectionConfig.services.subtitle || 'Soluzioni innovative e personalizzate per aziende di ogni dimensione. Il nostro team di studenti qualificati offre consulenza professionale in diversi settori.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={service.id} className="animate-fade-in-left hover-lift h-full" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden">
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
      )}

      {/* I nostri numeri */}
      {sectionConfig.stats?.isActive && (
        <section className="py-20 section-green relative">
          {/* Elementi decorativi */}
          <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
          <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
          <div className="decorative-strip decorative-strip-bottom"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-6 newspaper-headline">
                {sectionConfig.stats.title || 'I nostri numeri'}
              </h2>
              <p className="text-xl max-w-3xl mx-auto">
                {sectionConfig.stats.subtitle || 'Risultati che testimoniano il nostro impegno e la nostra crescita nel territorio insubre'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="animate-scale-in hover-lift">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stats.projects}+
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    Progetti completati
                  </div>
                  <div className="text-sm opacity-90">
                    Con successo
                  </div>
                </div>
              </div>
              <div className="animate-scale-in hover-lift" style={{animationDelay: '0.1s'}}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stats.services}+
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    Servizi offerti
                  </div>
                  <div className="text-sm opacity-90">
                    Soddisfatte
                  </div>
                </div>
              </div>
              <div className="animate-scale-in hover-lift" style={{animationDelay: '0.2s'}}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stats.team}+
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    Membri attivi
                  </div>
                  <div className="text-sm opacity-90">
                    Studenti motivati
                  </div>
                </div>
              </div>
              <div className="animate-scale-in hover-lift" style={{animationDelay: '0.3s'}}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stats.applications}
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    Candidature
                  </div>
                  <div className="text-sm opacity-90">
                    Nel settore
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio/Case Studies */}
      {sectionConfig.portfolio?.isActive && (
        <section className="py-20 section-green-light relative">
          {/* Elementi decorativi */}
          <div className="decorative-corner top-0 left-0"></div>
          <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
          <div className="decorative-strip decorative-strip-top"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-6 newspaper-headline">
                {sectionConfig.portfolio.title || 'I nostri progetti'}
              </h2>
              <p className="text-neutral-500 text-xl max-w-3xl mx-auto">
                {sectionConfig.portfolio.subtitle || 'Alcuni esempi dei progetti che abbiamo realizzato per i nostri clienti, dimostrando la nostra capacità di innovazione e problem solving.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => {
                const tags = project.tags ? JSON.parse(project.tags) : []
                return (
                  <div key={project.id} className="animate-fade-in-left hover-lift h-full" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="bg-white border-2 border-insubria-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      <div className="h-48 bg-insubria-50 flex items-center justify-center">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-insubria-600 text-center">
                            <div className="text-4xl mb-2">📊</div>
                            <div className="text-sm font-medium">{project.title}</div>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <p className="text-sm text-insubria-600 font-medium mb-2">
                          {project.client || 'JEIns'}
                        </p>
                        <h3 className="text-lg font-semibold text-insubria-600 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-neutral-500 mb-4 flex-grow">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                            <span key={tagIndex} className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      {sectionConfig.newsletter?.isActive && (
        <section className="py-20 section-green relative overflow-hidden">
          {/* Elementi decorativi */}
          <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
          <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
          <div className="decorative-strip decorative-strip-bottom"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up">
              <NewsletterBox />
            </div>
          </div>
        </section>
      )}

      {/* Contatto rapido */}
      {sectionConfig.contact?.isActive && (
        <section className="py-20 section-white relative">
          {/* Elementi decorativi */}
          <div className="decorative-corner top-0 left-0"></div>
          <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
          <div className="decorative-strip decorative-strip-top"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up">
              <ContactForm
                title={sectionConfig.contact.title || "Contatto rapido"}
                description={sectionConfig.contact.subtitle || "Hai un progetto in mente? Contattaci per una consulenza gratuita e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi."}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
