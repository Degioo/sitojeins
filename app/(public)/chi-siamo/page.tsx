import { Target, Eye, Users, Award, CheckCircle } from 'lucide-react'
import TeamMember from '@/components/TeamMember'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Siamo - JEIns | Il Team e la Nostra Missione',
  description: 'Scopri JEIns, la Junior Enterprise dell\'Università dell\'Insubria. Conosci il nostro team di studenti motivati, la nostra missione e i valori che ci guidano nel fornire consulenza aziendale di qualità.',
  keywords: 'team JEIns, missione Junior Enterprise, valori universitari, studenti Insubria, chi siamo JEIns',
  openGraph: {
    title: 'Chi Siamo - JEIns | Il Team e la Nostra Missione',
    description: 'Scopri JEIns, la Junior Enterprise dell\'Università dell\'Insubria. Conosci il nostro team di studenti motivati e la nostra missione.',
    url: 'https://jeins.it/chi-siamo',
  },
  alternates: {
    canonical: 'https://jeins.it/chi-siamo',
  },
}

export default function ChiSiamoPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 section-green relative overflow-hidden">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
        <div className="decorative-strip decorative-strip-bottom"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 newspaper-headline">
              Chi siamo
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              JEIns è la Junior Enterprise dell'Università dell'Insubria, 
              un ponte tra il mondo accademico e quello professionale.
            </p>
          </div>
        </div>
      </section>

      {/* Mission e Vision */}
      <section className="py-20 section-white relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white border-2 border-insubria-200 rounded-2xl p-8 hover-lift animate-fade-in-left shadow-sm">
              <div className="flex items-center mb-6">
                <div className="bg-insubria-600 p-3 rounded-2xl mr-4">
                  <Target className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-bold newspaper-headline">Mission</h2>
              </div>
              <p className="text-neutral-500 text-lg leading-relaxed">
                Valorizzare il talento degli studenti dell'Università dell'Insubria 
                attraverso progetti di consulenza reali, offrendo alle aziende 
                soluzioni innovative e agli studenti esperienze professionali concrete.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white border-2 border-insubria-200 rounded-2xl p-8 hover-lift animate-fade-in-right shadow-sm">
              <div className="flex items-center mb-6">
                <div className="bg-insubria-300 p-3 rounded-2xl mr-4">
                  <Eye className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-bold newspaper-headline">Vision</h2>
              </div>
              <p className="text-neutral-500 text-lg leading-relaxed">
                Diventare il punto di riferimento per l'innovazione e la consulenza 
                nel territorio insubre, creando un ecosistema virtuoso tra università, 
                studenti e imprese.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valori */}
      <section className="py-20 bg-gradient-newspaper relative">
        {/* Pattern di sfondo */}
        <div className="absolute inset-0 bg-pattern-halftone opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6 newspaper-headline">
              I nostri valori
            </h2>
            <p className="text-neutral-500 text-xl max-w-3xl mx-auto">
              I principi che guidano il nostro lavoro e la nostra crescita
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in hover-lift">
              <div className="newspaper-card rounded-2xl p-6">
                <div className="bg-newspaper-yellow rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Users className="text-newspaper-blue" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Collaborazione
                </h3>
                <p className="text-neutral-500 text-sm">
                  Lavoriamo insieme per raggiungere obiettivi comuni
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in hover-lift" style={{animationDelay: '0.1s'}}>
              <div className="newspaper-card rounded-2xl p-6">
                <div className="bg-newspaper-yellow rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Award className="text-newspaper-orange" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Eccellenza
                </h3>
                <p className="text-neutral-500 text-sm">
                  Cerchiamo sempre la massima qualità nei nostri progetti
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in hover-lift" style={{animationDelay: '0.2s'}}>
              <div className="newspaper-card rounded-2xl p-6">
                <div className="bg-newspaper-yellow rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle className="text-newspaper-red" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Professionalità
                </h3>
                <p className="text-neutral-500 text-sm">
                  Approccio serio e competente in ogni attività
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in hover-lift" style={{animationDelay: '0.3s'}}>
              <div className="newspaper-card rounded-2xl p-6">
                <div className="bg-newspaper-yellow rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Target className="text-newspaper-blue" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Innovazione
                </h3>
                <p className="text-neutral-500 text-sm">
                  Sviluppiamo soluzioni creative e all'avanguardia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Il Team */}
      <section className="py-20 bg-white relative">
        {/* Pattern di sfondo */}
        <div className="absolute inset-0 bg-pattern-dots opacity-15"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Il nostro team
            </h2>
            <p className="text-neutral-500 text-xl max-w-3xl mx-auto">
              Gli studenti che rendono possibile JEIns e che portano innovazione 
              nel territorio insubre
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-fade-in-left hover-lift">
              <TeamMember
                name="Marco Rossi"
                role="Presidente"
                description="Studente di Economia e Management, appassionato di leadership e strategia aziendale."
              />
            </div>
            <div className="animate-fade-in-up hover-lift">
              <TeamMember
                name="Sofia Bianchi"
                role="Vice Presidente"
                description="Laureanda in Marketing, esperta di comunicazione digitale e social media strategy."
              />
            </div>
            <div className="animate-fade-in-right hover-lift">
              <TeamMember
                name="Alessandro Verdi"
                role="Project Manager"
                description="Studente di Informatica, specializzato in sviluppo software e gestione progetti IT."
              />
            </div>
            <div className="animate-fade-in-left hover-lift">
              <TeamMember
                name="Giulia Neri"
                role="Marketing Manager"
                description="Laureanda in Comunicazione, creativa e strategica nel digital marketing."
              />
            </div>
            <div className="animate-fade-in-up hover-lift">
              <TeamMember
                name="Luca Ferrari"
                role="Finance Manager"
                description="Studente di Economia, esperto in analisi finanziarie e business planning."
              />
            </div>
            <div className="animate-fade-in-right hover-lift">
              <TeamMember
                name="Emma Romano"
                role="HR Manager"
                description="Laureanda in Psicologia, specializzata in gestione risorse umane e team building."
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
