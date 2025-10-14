import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  primaryCtaHref: string
  secondaryCtaHref: string
  backgroundImage?: string
}

export default function Hero({ 
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta, 
  primaryCtaHref, 
  secondaryCtaHref,
  backgroundImage 
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: 'grayscale(100%) brightness(1.2)',
            opacity: 0.3
          }}
        />
      )}
      
      {/* Overlay semitrasparente */}
      <div className="absolute inset-0 bg-white/70" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-neutral-500 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={primaryCtaHref}
            className="cta-primary px-8 py-4 text-lg"
          >
            {primaryCta}
          </Link>
          <Link
            href={secondaryCtaHref}
            className="cta-secondary px-8 py-4 text-lg"
          >
            {secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  )
}
