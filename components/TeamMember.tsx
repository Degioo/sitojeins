interface TeamMemberProps {
  name: string
  role: string
  image?: string
  description?: string
}

export default function TeamMember({ name, role, image, description }: TeamMemberProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
      <div className="w-24 h-24 bg-insubria-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <span className="text-2xl font-bold text-insubria-green-700">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-neutral-900 mb-1">
        {name}
      </h3>
      
      <p className="text-insubria-green-700 font-medium mb-3">
        {role}
      </p>
      
      {description && (
        <p className="text-neutral-700 text-sm">
          {description}
        </p>
      )}
    </div>
  )
}
