interface PortfolioCardProps {
  title: string
  description: string
  tags: string[]
  image?: string
  client?: string
}

export default function PortfolioCard({ 
  title, 
  description, 
  tags, 
  image, 
  client 
}: PortfolioCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] h-full flex flex-col">
      {image && (
        <div className="h-48 bg-insubria-green-100 flex items-center justify-center">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        {client && (
          <p className="text-sm text-insubria-green-700 font-medium mb-2">
            {client}
          </p>
        )}
        
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          {title}
        </h3>
        
        <p className="text-neutral-700 mb-4 flex-grow">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
