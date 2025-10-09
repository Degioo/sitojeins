import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Iscrizione pubblica alla newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email richiesta' },
        { status: 400 }
      )
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email non valida' },
        { status: 400 }
      )
    }

    // Verifica se esiste già
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email già registrata alla newsletter' },
        { status: 400 }
      )
    }

    // Crea nuovo iscritto
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        name: name || null,
        isActive: true
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Iscrizione alla newsletter completata con successo!' 
    })
  } catch (error) {
    console.error('Errore nell\'iscrizione alla newsletter:', error)
    return NextResponse.json(
      { error: 'Errore nell\'iscrizione alla newsletter' },
      { status: 500 }
    )
  }
}

