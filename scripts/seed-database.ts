import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedDatabase() {
  console.log('🌱 Seeding database with sample data...')

  // Clear existing data
  await prisma.recruitmentApplication.deleteMany()
  await prisma.recruitment.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.project.deleteMany()
  await prisma.service.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.policy.deleteMany()

  // Create services
  const services = [
    {
      title: "Consulenza Strategica",
      description: "Analisi approfondita dei processi aziendali e sviluppo di strategie personalizzate per il miglioramento dell'efficienza operativa e la crescita del business.",
      sector: "Business Strategy",
      icon: "📊",
      order: 1
    },
    {
      title: "Digital Marketing",
      description: "Strategie digitali complete per aumentare la visibilità online, migliorare l'engagement e generare lead qualificati attraverso canali digitali innovativi.",
      sector: "Marketing Digitale",
      icon: "📱",
      order: 2
    },
    {
      title: "Sviluppo Software",
      description: "Soluzioni software personalizzate per automatizzare processi, migliorare l'efficienza e digitalizzare le operazioni aziendali.",
      sector: "Tecnologia",
      icon: "💻",
      order: 3
    },
    {
      title: "Analisi di Mercato",
      description: "Ricerca di mercato approfondita per comprendere le tendenze, identificare opportunità e sviluppare strategie competitive.",
      sector: "Market Research",
      icon: "📈",
      order: 4
    },
    {
      title: "Formazione e Training",
      description: "Programmi di formazione personalizzati per sviluppare competenze digitali e professionali del team aziendale.",
      sector: "Formazione",
      icon: "🎓",
      order: 5
    },
    {
      title: "Brand Identity",
      description: "Sviluppo dell'identità visiva e strategica del brand per comunicare efficacemente i valori e la mission aziendale.",
      sector: "Branding",
      icon: "🎨",
      order: 6
    }
  ]

  for (const service of services) {
    await prisma.service.create({
      data: service
    })
  }

  // Create projects
  const projects = [
    {
      title: "Digitalizzazione Processi Aziendali",
      description: "Implementazione di un sistema digitale per automatizzare i processi di gestione documentale di un'azienda manifatturiera locale.",
      image: null,
      tags: JSON.stringify(["Digital Transformation", "Process Automation", "Efficiency"]),
      client: "Azienda Manifatturiera Varese",
      year: 2024,
      order: 1
    },
    {
      title: "Strategia Social Media",
      description: "Sviluppo e implementazione di una strategia social media completa per aumentare l'engagement e la brand awareness.",
      image: null,
      tags: JSON.stringify(["Social Media", "Marketing", "Brand Awareness"]),
      client: "Startup Tech Milano",
      year: 2024,
      order: 2
    },
    {
      title: "Analisi di Mercato B2B",
      description: "Ricerca approfondita del mercato target per il lancio di un nuovo prodotto innovativo nel settore B2B.",
      image: null,
      tags: JSON.stringify(["Market Research", "Strategy", "Innovation"]),
      client: "PMI Innovativa",
      year: 2023,
      order: 3
    },
    {
      title: "Sito Web Aziendale",
      description: "Progettazione e sviluppo di un sito web moderno e responsive per una PMI locale con e-commerce integrato.",
      image: null,
      tags: JSON.stringify(["Web Development", "UI/UX", "E-commerce"]),
      client: "Azienda Locale",
      year: 2023,
      order: 4
    },
    {
      title: "Ottimizzazione SEO",
      description: "Miglioramento del posizionamento sui motori di ricerca per aumentare la visibilità online e generare traffico qualificato.",
      image: null,
      tags: JSON.stringify(["SEO", "Digital Marketing", "Visibility"]),
      client: "E-commerce Varese",
      year: 2023,
      order: 5
    },
    {
      title: "Formazione Team Digitale",
      description: "Programma di formazione personalizzato per migliorare le competenze digitali del team aziendale.",
      image: null,
      tags: JSON.stringify(["Training", "Digital Skills", "Team Development"]),
      client: "Azienda Servizi",
      year: 2023,
      order: 6
    }
  ]

  for (const project of projects) {
    await prisma.project.create({
      data: project
    })
  }

  // Create blog posts
  const blogPosts = [
    {
      title: "Il futuro delle Junior Enterprise in Italia",
      slug: "futuro-junior-enterprise-italia",
      content: `
        <h2>Introduzione</h2>
        <p>Le Junior Enterprise rappresentano un modello innovativo che connette il mondo accademico con quello imprenditoriale, offrendo agli studenti opportunità concrete di crescita professionale.</p>
        
        <h2>L'evoluzione del modello</h2>
        <p>Negli ultimi anni, abbiamo assistito a una crescente professionalizzazione delle Junior Enterprise, con un focus sempre maggiore sulla qualità dei servizi offerti e sulla formazione continua dei membri.</p>
        
        <h2>Le sfide del futuro</h2>
        <p>Il settore si trova ad affrontare nuove sfide legate alla digitalizzazione, alla sostenibilità e alla necessità di adattarsi a un mercato in continua evoluzione.</p>
        
        <h2>Conclusioni</h2>
        <p>Le Junior Enterprise sono destinate a svolgere un ruolo sempre più importante nel panorama imprenditoriale italiano, rappresentando un ponte fondamentale tra formazione e mondo del lavoro.</p>
      `,
      excerpt: "Un'analisi approfondita sul futuro delle Junior Enterprise in Italia, tra opportunità e sfide del settore.",
      featuredImage: null,
      tags: JSON.stringify(["Junior Enterprise", "Futuro", "Analisi"]),
      isPublished: true,
      publishedAt: new Date('2024-01-15')
    },
    {
      title: "Come gestire un progetto di consulenza aziendale",
      slug: "gestire-progetto-consulenza-aziendale",
      content: `
        <h2>Pianificazione del progetto</h2>
        <p>La fase di pianificazione è fondamentale per il successo di qualsiasi progetto di consulenza. È importante definire chiaramente obiettivi, tempistiche e risorse disponibili.</p>
        
        <h2>Comunicazione con il cliente</h2>
        <p>Una comunicazione efficace e trasparente con il cliente è essenziale per mantenere la fiducia e garantire la soddisfazione del servizio offerto.</p>
        
        <h2>Gestione del team</h2>
        <p>La coordinazione del team di lavoro richiede leadership, organizzazione e capacità di problem solving per affrontare le sfide quotidiane.</p>
        
        <h2>Consegna e follow-up</h2>
        <p>La fase di consegna del progetto deve essere gestita con attenzione, prevedendo anche un follow-up per garantire la soddisfazione del cliente.</p>
      `,
      excerpt: "Guida pratica per gestire efficacemente un progetto di consulenza aziendale, dalla pianificazione alla consegna.",
      featuredImage: null,
      tags: JSON.stringify(["Consulenza", "Progetto", "Gestione"]),
      isPublished: true,
      publishedAt: new Date('2024-01-10')
    },
    {
      title: "Le competenze digitali per gli studenti del 2024",
      slug: "competenze-digitali-studenti-2024",
      content: `
        <h2>L'importanza delle competenze digitali</h2>
        <p>Nel 2024, le competenze digitali non sono più un optional ma una necessità fondamentale per entrare nel mondo del lavoro.</p>
        
        <h2>Competenze tecniche essenziali</h2>
        <p>Dalla programmazione all'analisi dei dati, passando per il digital marketing e la cybersecurity, le competenze tecniche richieste sono sempre più specifiche.</p>
        
        <h2>Soft skills digitali</h2>
        <p>Oltre alle competenze tecniche, sono fondamentali anche le soft skills digitali come la capacità di collaborare online e la gestione del tempo in ambienti virtuali.</p>
        
        <h2>Come sviluppare queste competenze</h2>
        <p>Esistono numerose risorse online, corsi e opportunità pratiche per sviluppare le competenze digitali necessarie per il futuro.</p>
      `,
      excerpt: "Una panoramica sulle competenze digitali essenziali per gli studenti nel 2024 e come svilupparle.",
      featuredImage: null,
      tags: JSON.stringify(["Competenze Digitali", "Studenti", "2024"]),
      isPublished: true,
      publishedAt: new Date('2024-01-05')
    }
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post
    })
  }

  // Create recruitment status
  await prisma.recruitment.create({
    data: {
      isOpen: true,
      openDate: new Date('2024-01-01'),
      closeDate: new Date('2024-03-31'),
      description: "Stiamo cercando studenti motivati e intraprendenti per entrare a far parte del nostro team. Offriamo opportunità di crescita professionale, progetti reali e un ambiente stimolante per sviluppare le tue competenze.",
      requirements: "Studenti iscritti all'Università dell'Insubria, buone capacità comunicative, spirito di squadra e voglia di mettersi in gioco.",
      benefits: "Esperienza professionale reale, networking con aziende, sviluppo di competenze trasversali, certificazioni e possibilità di crescita personale e professionale."
    }
  })

  // Create sample recruitment applications
  const applications = [
    {
      name: "Marco Rossi",
      email: "marco.rossi@studenti.uninsubria.it",
      course: "Economia e Management",
      year: "3° anno",
      roles: JSON.stringify(["Consulenza", "Marketing"]),
      cvUrl: null,
      notes: "Interessato a progetti di consulenza strategica e marketing digitale.",
      status: "pending"
    },
    {
      name: "Sofia Bianchi",
      email: "sofia.bianchi@studenti.uninsubria.it",
      course: "Informatica",
      year: "2° anno",
      roles: JSON.stringify(["Sviluppo Software", "Tecnologia"]),
      cvUrl: null,
      notes: "Competenze in programmazione web e mobile, interessata a progetti di sviluppo software.",
      status: "reviewed"
    },
    {
      name: "Luca Verdi",
      email: "luca.verdi@studenti.uninsubria.it",
      course: "Comunicazione",
      year: "3° anno",
      roles: JSON.stringify(["Marketing", "Comunicazione"]),
      cvUrl: null,
      notes: "Esperienza in social media management e content creation.",
      status: "accepted"
    }
  ]

  for (const application of applications) {
    await prisma.recruitmentApplication.create({
      data: application
    })
  }

  // Update contacts with real data
  const contacts = [
    { type: 'email', value: 'info@jeins.it', label: 'Email principale' },
    { type: 'phone', value: '+39 0332 218811', label: 'Telefono' },
    { type: 'address', value: 'Via Ravasi, 2, 21100 Varese VA', label: 'Sede principale' },
    { type: 'facebook', value: 'https://facebook.com/jeins.insubria', label: 'Facebook' },
    { type: 'instagram', value: 'https://instagram.com/jeins_insubria', label: 'Instagram' },
    { type: 'linkedin', value: 'https://linkedin.com/company/jeins', label: 'LinkedIn' },
  ]

  for (const contact of contacts) {
    await prisma.contact.create({
      data: {
        type: contact.type,
        value: contact.value,
        label: contact.label,
        order: contacts.indexOf(contact),
      },
    })
  }

  // Update policies with real content
  const policies = [
    {
      type: 'privacy',
      title: 'Privacy Policy',
      content: `
        <h2>1. Informazioni sul trattamento</h2>
        <p>JEIns - Junior Enterprise Insubria, con sede in Via Ravasi, 2, 21100 Varese VA, è il titolare del trattamento dei dati personali.</p>
        
        <h2>2. Dati raccolti</h2>
        <p>Raccogliamo i seguenti tipi di dati personali: nome, cognome, email, telefono, corso di studi, anno di iscrizione.</p>
        
        <h2>3. Finalità del trattamento</h2>
        <p>I dati vengono utilizzati per: gestione delle candidature, comunicazioni relative ai servizi, invio di newsletter.</p>
        
        <h2>4. Diritti dell'interessato</h2>
        <p>L'interessato ha diritto di accesso, rettifica, cancellazione, limitazione del trattamento e portabilità dei dati.</p>
        
        <h2>5. Contatti</h2>
        <p>Per esercitare i propri diritti, contattare: info@jeins.it</p>
      `,
      version: '1.0'
    },
    {
      type: 'cookie',
      title: 'Cookie Policy',
      content: `
        <h2>1. Cosa sono i cookie</h2>
        <p>I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente quando visita il nostro sito web.</p>
        
        <h2>2. Tipi di cookie utilizzati</h2>
        <p>Utilizziamo cookie tecnici necessari per il funzionamento del sito e cookie di terze parti per analisi e marketing.</p>
        
        <h2>3. Gestione dei cookie</h2>
        <p>L'utente può gestire le preferenze sui cookie attraverso le impostazioni del browser o il banner di consenso.</p>
        
        <h2>4. Cookie di terze parti</h2>
        <p>Utilizziamo Google Analytics per analizzare il traffico del sito e migliorare l'esperienza utente.</p>
      `,
      version: '1.0'
    },
    {
      type: 'terms',
      title: 'Termini e Condizioni',
      content: `
        <h2>1. Oggetto</h2>
        <p>I presenti termini e condizioni regolano l'utilizzo del sito web e dei servizi offerti da JEIns.</p>
        
        <h2>2. Servizi offerti</h2>
        <p>JEIns offre servizi di consulenza aziendale, sviluppo software, marketing digitale e formazione.</p>
        
        <h2>3. Responsabilità</h2>
        <p>JEIns si impegna a fornire servizi di qualità, mantenendo la massima professionalità e riservatezza.</p>
        
        <h2>4. Modifiche</h2>
        <p>JEIns si riserva il diritto di modificare i presenti termini e condizioni in qualsiasi momento.</p>
        
        <h2>5. Legge applicabile</h2>
        <p>I presenti termini sono regolati dalla legge italiana.</p>
      `,
      version: '1.0'
    }
  ]

  for (const policy of policies) {
    await prisma.policy.create({
      data: {
        type: policy.type,
        title: policy.title,
        content: policy.content,
        version: policy.version,
      },
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:`)
  console.log(`   - ${services.length} services`)
  console.log(`   - ${projects.length} projects`)
  console.log(`   - ${blogPosts.length} blog posts`)
  console.log(`   - 1 recruitment status`)
  console.log(`   - ${applications.length} applications`)
  console.log(`   - ${contacts.length} contacts`)
  console.log(`   - ${policies.length} policies`)
}

seedDatabase()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
