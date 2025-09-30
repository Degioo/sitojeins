'use client'

interface FiligranaProps {
  position?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg'
  opacity?: number
}

export default function Filigrana({ 
  position = 'right', 
  size = 'md', 
  opacity = 0.05 
}: FiligranaProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48', 
    lg: 'w-64 h-64'
  }

  const positionClasses = {
    left: 'left-4 top-1/2 transform -translate-y-1/2',
    right: 'right-4 top-1/2 transform -translate-y-1/2',
    top: 'top-4 left-1/2 transform -translate-x-1/2',
    bottom: 'bottom-4 left-1/2 transform -translate-x-1/2'
  }

  return (
    <div 
      className={`absolute ${sizeClasses[size]} ${positionClasses[position]} pointer-events-none`}
      style={{ opacity }}
    >
      {/* Pattern geometrico minimal */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-insubria-300"
      >
        {/* Cerchi concentrici */}
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2"/>
        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.1"/>
        
        {/* Linee radiali */}
        <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        <line x1="35.36" y1="35.36" x2="164.64" y2="164.64" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        <line x1="164.64" y1="35.36" x2="35.36" y2="164.64" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        
        {/* Punti decorativi */}
        <circle cx="100" cy="100" r="2" fill="currentColor" opacity="0.3"/>
        <circle cx="100" cy="50" r="1.5" fill="currentColor" opacity="0.2"/>
        <circle cx="100" cy="150" r="1.5" fill="currentColor" opacity="0.2"/>
        <circle cx="50" cy="100" r="1.5" fill="currentColor" opacity="0.2"/>
        <circle cx="150" cy="100" r="1.5" fill="currentColor" opacity="0.2"/>
      </svg>
    </div>
  )
}
