interface StatsCardProps {
  number: string
  label: string
  description?: string
}

export default function StatsCard({ number, label, description }: StatsCardProps) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-insubria-600 mb-2">
        {number}
      </div>
      <div className="text-lg font-semibold text-neutral-900 mb-1">
        {label}
      </div>
      {description && (
        <div className="text-neutral-500 text-sm">
          {description}
        </div>
      )}
    </div>
  )
}
