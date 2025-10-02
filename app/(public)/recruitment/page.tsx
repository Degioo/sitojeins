import RecruitmentForm from '@/components/RecruitmentForm'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recruitment - JEIns | Unisciti al Nostro Team di Studenti',
  description: 'Candidati per entrare a far parte di JEIns! Offriamo opportunità di crescita professionale, progetti reali e esperienza pratica per studenti dell\'Università dell\'Insubria. Scopri i ruoli disponibili.',
  keywords: 'recruitment JEIns, candidature studenti, opportunità lavoro universitario, team JEIns, posizioni aperte, carriera studenti',
  openGraph: {
    title: 'Recruitment - JEIns | Unisciti al Nostro Team di Studenti',
    description: 'Candidati per entrare a far parte di JEIns! Opportunità di crescita professionale per studenti dell\'Università dell\'Insubria.',
    url: 'https://jeins.it/recruitment',
  },
  alternates: {
    canonical: 'https://jeins.it/recruitment',
  },
}

async function getRecruitmentStatus() {
  return await prisma.recruitment.findFirst({
    where: { isOpen: true },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function RecruitmentPage() {
  const recruitment = await getRecruitmentStatus()
  const faqs = [
    {
      question: "Come funziona il processo di selezione?",
      answer: "Il processo prevede una prima valutazione del CV, seguita da un colloquio conoscitivo e, se necessario, da un test pratico specifico per il ruolo."
    },
    {
      question: "Quali competenze sono richieste?",
      answer: "Cerchiamo studenti motivati con buone capacità comunicative, spirito di squadra e voglia di mettersi in gioco. Le competenze tecniche specifiche dipendono dal ruolo."
    },
    {
      question: "Quanto tempo richiede l'impegno?",
      answer: "L'impegno varia da 5 a 15 ore settimanali, compatibilmente con gli studi universitari. Offriamo flessibilità negli orari."
    },
    {
      question: "Quali sono i benefici di far parte di JEIns?",
      answer: "Esperienza professionale reale, networking con aziende, sviluppo di competenze trasversali, certificazioni e possibilità di crescita personale e professionale."
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
            Unisciti al nostro team
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {recruitment?.description || "Candidati per diventare parte di JEIns e sviluppa le tue competenze professionali attraverso progetti reali e un ambiente stimolante."}
          </p>
          {recruitment && (
            <div className="mt-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Recruitment aperto
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Form di candidatura */}
      <section className="py-20 section-white relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecruitmentForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 section-green-light relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 newspaper-headline">
              Domande frequenti
            </h2>
            <p className="text-neutral-500 text-lg">
              Risposte alle domande più comuni sul processo di recruitment
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm animate-fade-in-up hover-lift" style={{animationDelay: `${index * 0.1}s`}}>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-500">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefici */}
      <section className="py-20 section-white relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 newspaper-headline">
              Perché scegliere JEIns?
            </h2>
            <p className="text-neutral-500 text-lg">
              I vantaggi di far parte della nostra Junior Enterprise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-scale-in hover-lift">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                <div className="bg-insubria-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Esperienza Reale
                </h3>
                <p className="text-neutral-500 text-sm">
                  Lavora su progetti concreti con aziende reali, sviluppando competenze professionali autentiche.
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in hover-lift" style={{animationDelay: '0.1s'}}>
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                <div className="bg-insubria-300 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Networking
                </h3>
                <p className="text-neutral-500 text-sm">
                  Entra in contatto con professionisti del settore e costruisci la tua rete di contatti.
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in hover-lift" style={{animationDelay: '0.2s'}}>
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm">
                <div className="bg-insubria-200 text-insubria-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Crescita Personale
                </h3>
                <p className="text-neutral-500 text-sm">
                  Sviluppa soft skills, leadership e capacità di problem solving in un ambiente stimolante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
