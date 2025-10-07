interface ServiceCardProps {
  title: string
  description: string
  sector: string
  ctaText?: string
  ctaHref?: string
}

export default function ServiceCard({ 
  title, 
  description, 
  sector, 
  ctaText = "Richiedi un preventivo",
  ctaHref = "/contatti"
}: ServiceCardProps) {
  return (
    <div className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:scale-[1.02] h-full flex flex-col">
      <div className="mb-4">
        <span className="inline-block bg-insubria-50 text-insubria-600 px-3 py-1 rounded-full text-sm font-medium">
          {sector}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold text-neutral-900 mb-3">
        {title}
      </h3>
      
      <p className="text-neutral-500 mb-4 flex-grow">
        {description}
      </p>
      
      <a
        href={ctaHref}
        className="inline-block text-insubria-600 font-medium hover:text-insubria-700 transition-colors mt-auto"
      >
        {ctaText} →
      </a>
    </div>
  )
}
