import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// IMPORTANTE: Questo endpoint va rimosso dopo l'inizializzazione del database!
export async function POST(request: NextRequest) {
  try {
    // Protezione con secret (imposta INIT_SECRET nelle env vars di Vercel)
    const secret = request.headers.get('x-init-secret')
    const expectedSecret = process.env.INIT_SECRET
    
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verifica se esiste già un utente admin
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@jeins.it' }
    })

    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'Database già inizializzato',
        admin: { email: 'admin@jeins.it', note: 'Utente già esistente' }
      })
    }

    // Crea admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@jeins.it',
        name: 'Admin JEIns',
        password: hashedPassword,
        role: 'admin',
      },
    })

    // Crea default contacts
    const defaultContacts = [
      { type: 'email', value: 'info@jeins.it', label: 'Email principale', order: 0 },
      { type: 'phone', value: '+39 0332 218811', label: 'Telefono', order: 1 },
      { type: 'address', value: 'Via Ravasi, 2, 21100 Varese VA', label: 'Sede principale', order: 2 },
      { type: 'facebook', value: 'https://facebook.com/jeins.insubria', label: 'Facebook', order: 3 },
      { type: 'instagram', value: 'https://instagram.com/jeins_insubria', label: 'Instagram', order: 4 },
      { type: 'linkedin', value: 'https://linkedin.com/company/jeins', label: 'LinkedIn', order: 5 },
    ]

    for (const contact of defaultContacts) {
      await prisma.contact.create({
        data: contact
      })
    }

    // Crea default policies
    const defaultPolicies = [
      {
        type: 'privacy',
        title: 'Privacy Policy',
        content: '<h2>Privacy Policy</h2><p>Inserisci qui il contenuto della privacy policy...</p>',
        version: '1.0'
      },
      {
        type: 'cookie',
        title: 'Cookie Policy',
        content: '<h2>Cookie Policy</h2><p>Inserisci qui il contenuto della cookie policy...</p>',
        version: '1.0'
      },
    ]

    for (const policy of defaultPolicies) {
      await prisma.policy.create({
        data: policy
      })
    }

    // Crea recruitment settings
    await prisma.recruitment.create({
      data: {
        isOpen: false,
        description: 'Recruitment non ancora attivo',
        requirements: 'Da definire',
        benefits: 'Da definire',
      }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Database inizializzato con successo!',
      admin: { 
        email: 'admin@jeins.it', 
        password: 'admin123',
        note: 'IMPORTANTE: Cambia subito la password dopo il primo accesso!'
      }
    })

  } catch (error) {
    console.error('Error initializing database:', error)
    return NextResponse.json({ 
      error: 'Errore durante l\'inizializzazione',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

