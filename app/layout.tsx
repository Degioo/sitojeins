import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'JEIns - Junior Enterprise Insubria',
  description: 'Mostriamo il valore degli studenti dell\'Insubria. Consulenza, progetti e crescita: per aziende e studenti.',
  openGraph: {
    title: 'JEIns - Junior Enterprise Insubria',
    description: 'Mostriamo il valore degli studenti dell\'Insubria. Consulenza, progetti e crescita: per aziende e studenti.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={`${montserrat.variable} font-montserrat antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}