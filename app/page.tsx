import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import StatsCard from '@/components/StatsCard'
import PortfolioCard from '@/components/PortfolioCard'
import NewsletterBox from '@/components/NewsletterBox'
import ContactForm from '@/components/ContactForm'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <Hero
        title="Mostriamo il valore degli studenti dell'Insubria"
        subtitle="Consulenza, progetti e crescita: per aziende e studenti"
        primaryCta="Richiedi un preventivo"
        secondaryCta="Candidati"
        primaryCtaHref="/contatti"
        secondaryCtaHref="/recruitment"
        backgroundImage="/images/hero-universita.jpg"
      />

      {/* Servizi in evidenza */}
      <section className="py-20 section-white relative overflow-hidden">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6 newspaper-headline">
              I nostri servizi
            </h2>
            <p className="text-neutral-500 text-xl max-w-3xl mx-auto">
              Soluzioni innovative e personalizzate per aziende di ogni dimensione. 
              Il nostro team di studenti qualificati offre consulenza professionale 
              in diversi settori.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fade-in-left hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                <div className="mb-4">
                  <span className="bg-insubria-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Business
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-insubria-600 mb-3">
                  Consulenza Strategica
                </h3>
                <p className="text-neutral-500 mb-4">
                  Analisi e strategie per il miglioramento dei processi aziendali e l'ottimizzazione delle risorse.
                </p>
                <a
                  href="/contatti"
                  className="inline-block text-insubria-600 font-medium hover:text-insubria-700 transition-colors"
                >
                  Richiedi un preventivo →
                </a>
              </div>
            </div>
            <div className="animate-fade-in-up hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                <div className="mb-4">
                  <span className="bg-insubria-300 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Marketing
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-insubria-600 mb-3">
                  Digital Marketing
                </h3>
                <p className="text-neutral-500 mb-4">
                  Strategie digitali personalizzate per aumentare la visibilità e l'engagement del tuo brand.
                </p>
                <a
                  href="/contatti"
                  className="inline-block text-insubria-600 font-medium hover:text-insubria-700 transition-colors"
                >
                  Richiedi un preventivo →
                </a>
              </div>
            </div>
            <div className="animate-fade-in-right hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                <div className="mb-4">
                  <span className="bg-insubria-200 text-insubria-700 px-3 py-1 rounded-full text-sm font-medium">
                    Tecnologia
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-insubria-600 mb-3">
                  Sviluppo Software
                </h3>
                <p className="text-neutral-500 mb-4">
                  Soluzioni software innovative e personalizzate per automatizzare i tuoi processi.
                </p>
                <a
                  href="/contatti"
                  className="inline-block text-insubria-600 font-medium hover:text-insubria-700 transition-colors"
                >
                  Richiedi un preventivo →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* I nostri numeri */}
      <section className="py-20 section-green relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
        <div className="decorative-strip decorative-strip-bottom"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6 newspaper-headline">
              I nostri numeri
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Risultati che testimoniano il nostro impegno e la nostra crescita nel territorio insubre
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="animate-scale-in hover-lift">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  50+
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
                  30+
                </div>
                <div className="text-lg font-semibold mb-1">
                  Aziende partner
                </div>
                <div className="text-sm opacity-90">
                  Soddisfatte
                </div>
              </div>
            </div>
            <div className="animate-scale-in hover-lift" style={{animationDelay: '0.2s'}}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  25+
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
                  3
                </div>
                <div className="text-lg font-semibold mb-1">
                  Anni di esperienza
                </div>
                <div className="text-sm opacity-90">
                  Nel settore
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio/Case Studies */}
      <section className="py-20 section-green-light relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6 newspaper-headline">
              I nostri progetti
            </h2>
            <p className="text-neutral-500 text-xl max-w-3xl mx-auto">
              Alcuni esempi dei progetti che abbiamo realizzato per i nostri clienti, 
              dimostrando la nostra capacità di innovazione e problem solving.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-fade-in-left hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="h-48 bg-insubria-50 flex items-center justify-center">
                  <div className="text-insubria-600 text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <div className="text-sm font-medium">Digitalizzazione Processi</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-insubria-600 font-medium mb-2">
                    Azienda Manifatturiera
                  </p>
                  <h3 className="text-lg font-semibold text-insubria-600 mb-2">
                    Digitalizzazione Processi
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    Implementazione di un sistema digitale per automatizzare i processi di gestione documentale.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Digital Transformation
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Process Automation
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Efficiency
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-up hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="h-48 bg-insubria-50 flex items-center justify-center">
                  <div className="text-insubria-600 text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <div className="text-sm font-medium">Strategia Social Media</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-insubria-600 font-medium mb-2">
                    Startup Tech
                  </p>
                  <h3 className="text-lg font-semibold text-insubria-600 mb-2">
                    Strategia Social Media
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    Sviluppo e implementazione di una strategia social media per aumentare l'engagement.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Social Media
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Marketing
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Brand Awareness
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-right hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="h-48 bg-insubria-50 flex items-center justify-center">
                  <div className="text-insubria-600 text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <div className="text-sm font-medium">Analisi di Mercato</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-insubria-600 font-medium mb-2">
                    PMI Innovativa
                  </p>
                  <h3 className="text-lg font-semibold text-insubria-600 mb-2">
                    Analisi di Mercato
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    Ricerca approfondita del mercato target per lanciare un nuovo prodotto innovativo.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Market Research
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Strategy
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Innovation
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-left hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="h-48 bg-insubria-50 flex items-center justify-center">
                  <div className="text-insubria-600 text-center">
                    <div className="text-4xl mb-2">💻</div>
                    <div className="text-sm font-medium">Sito Web Aziendale</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-insubria-600 font-medium mb-2">
                    Azienda Locale
                  </p>
                  <h3 className="text-lg font-semibold text-insubria-600 mb-2">
                    Sito Web Aziendale
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    Progettazione e sviluppo di un sito web moderno e responsive per una PMI locale.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Web Development
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      UI/UX
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Responsive Design
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-up hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="h-48 bg-insubria-50 flex items-center justify-center">
                  <div className="text-insubria-600 text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <div className="text-sm font-medium">Ottimizzazione SEO</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-insubria-600 font-medium mb-2">
                    E-commerce
                  </p>
                  <h3 className="text-lg font-semibold text-insubria-600 mb-2">
                    Ottimizzazione SEO
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    Miglioramento del posizionamento sui motori di ricerca per aumentare la visibilità online.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      SEO
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Digital Marketing
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Visibility
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-right hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="h-48 bg-insubria-50 flex items-center justify-center">
                  <div className="text-insubria-600 text-center">
                    <div className="text-4xl mb-2">🎓</div>
                    <div className="text-sm font-medium">Formazione Team</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-insubria-600 font-medium mb-2">
                    Azienda Servizi
                  </p>
                  <h3 className="text-lg font-semibold text-insubria-600 mb-2">
                    Formazione Team
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    Programma di formazione personalizzato per migliorare le competenze digitali del team.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Training
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Digital Skills
                    </span>
                    <span className="bg-insubria-50 text-insubria-600 px-2 py-1 rounded text-xs">
                      Team Development
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
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

      {/* Contatto rapido */}
      <section className="py-20 section-white relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <ContactForm
              title="Contatto rapido"
              description="Hai un progetto in mente? Contattaci per una consulenza gratuita e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi."
            />
          </div>
        </div>
      </section>
    </main>
  )
}
