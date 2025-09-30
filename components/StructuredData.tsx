'use client'

import Script from 'next/script'

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JEIns - Junior Enterprise Insubria",
    "alternateName": "JEIns",
    "description": "Junior Enterprise dell'Università dell'Insubria che offre consulenza aziendale, progetti di ricerca e opportunità di crescita per studenti e aziende.",
    "url": "https://jeins.it",
    "logo": "https://jeins.it/images/logo-jeins.png",
    "image": "https://jeins.it/images/og-image.jpg",
    "foundingDate": "2020",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Varese",
      "addressRegion": "Lombardia",
      "addressCountry": "IT"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+39-XXX-XXX-XXXX",
      "contactType": "customer service",
      "email": "info@jeins.it"
    },
    "sameAs": [
      "https://www.linkedin.com/company/jeins",
      "https://www.instagram.com/jeins_insubria",
      "https://www.facebook.com/jeins.insubria"
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Confederazione Nazionale Junior Enterprise Italia",
      "url": "https://www.junior-enterprise.it"
    },
    "parentOrganization": {
      "@type": "EducationalOrganization",
      "name": "Università degli Studi dell'Insubria",
      "url": "https://www.uninsubria.it"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 45.8206,
        "longitude": 8.8251
      },
      "geoRadius": "50000"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Consulenza Aziendale",
        "description": "Servizi di consulenza strategica per aziende",
        "category": "Business Consulting"
      },
      {
        "@type": "Offer", 
        "name": "Sviluppo Web",
        "description": "Sviluppo di siti web e applicazioni",
        "category": "Web Development"
      },
      {
        "@type": "Offer",
        "name": "Marketing Digitale",
        "description": "Servizi di marketing digitale e social media",
        "category": "Digital Marketing"
      }
    ]
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema)
      }}
    />
  )
}
