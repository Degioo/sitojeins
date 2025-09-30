export default function BlogPage() {
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
            Blog
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Articoli, insights e novità dal mondo della consulenza e dell'innovazione
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 section-white relative">
        {/* Elementi decorativi */}
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="bg-insubria-50 border-2 border-insubria-200 rounded-2xl p-12 shadow-sm">
              <h2 className="text-3xl font-bold mb-6 newspaper-headline">
                Prossimamente
              </h2>
              <p className="text-neutral-500 text-lg mb-8">
                Stiamo lavorando per portarti contenuti di qualità su temi di attualità, 
                innovazione e consulenza aziendale. Torna presto per scoprire i nostri articoli!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/newsletter"
                  className="bg-insubria-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-insubria-700 transition-colors"
                >
                  Iscriviti alla newsletter
                </a>
                <a
                  href="/contatti"
                  className="border-2 border-insubria-600 text-insubria-600 px-8 py-4 rounded-2xl font-semibold hover:bg-insubria-50 transition-colors"
                >
                  Contattaci
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
