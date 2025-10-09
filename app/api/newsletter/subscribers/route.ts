import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Lista iscritti
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(subscribers)
  } catch (error) {
    console.error('Errore nel caricamento degli iscritti:', error)
    return NextResponse.json(
      { error: 'Errore nel caricamento degli iscritti' },
      { status: 500 }
    )
  }
}

// POST - Aggiungi iscritto
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

    // Verifica se esiste già
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email già presente' },
        { status: 400 }
      )
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        name: name || null
      }
    })

    return NextResponse.json(subscriber)
  } catch (error) {
    console.error('Errore nell\'aggiunta dell\'iscritto:', error)
    return NextResponse.json(
      { error: 'Errore nell\'aggiunta dell\'iscritto' },
      { status: 500 }
    )
  }
}

