'use client'

export default function CookiePreferencesButton() {
  const handleClick = () => {
    // Rimuove il valore del localStorage che controlla se i cookie sono stati accettati
    localStorage.removeItem('jeins-cookies-accepted')
    // Ricarica la pagina per mostrare nuovamente il banner
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

