'use client'

export default function CookiePreferencesButton() {
  const handleClick = () => {
    localStorage.removeItem('cookie_consent')
    window.location.reload()
  }

  return (
    <button 
      onClick={handleClick}
      className="bg-insubria-600 text-white px-4 py-2 rounded-lg hover:bg-insubria-700 transition-colors"
    >
      Modifica Preferenze
    </button>
  )
}

