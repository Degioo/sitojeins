import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const cookiePreferencesSchema = z.object({
  cookieId: z.string().min(1),
  necessary: z.boolean().default(true),
  analytics: z.boolean().default(false),
  marketing: z.boolean().default(false),
  functional: z.boolean().default(false),
})

// GET - Recupera le preferenze cookie
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cookieId = searchParams.get('cookieId')
    
    if (!cookieId) {
      return NextResponse.json(
        { error: 'cookieId è richiesto' },
        { status: 400 }
      )
    }

    // Prova a recuperare le preferenze per cookieId
    let preferences = await prisma.cookiePreferences.findUnique({
      where: { cookieId },
    })

    // Se l'utente è autenticato, prova anche a recuperare per userId
    const session = await getServerSession(authOptions)
    if (!preferences && session?.user?.id) {
      preferences = await prisma.cookiePreferences.findFirst({
        where: { userId: session.user.id },
      })
    }

    if (!preferences) {
      return NextResponse.json(null)
    }

    return NextResponse.json({
      necessary: preferences.necessary,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      functional: preferences.functional,
    })
  } catch (error) {
    console.error('Errore nel recupero delle preferenze cookie:', error)
    return NextResponse.json(
      { error: 'Errore nel recupero delle preferenze' },
      { status: 500 }
    )
  }
}

// POST - Salva o aggiorna le preferenze cookie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = cookiePreferencesSchema.parse(body)

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || null

    // Cerca se esistono già preferenze per questo cookieId o userId
    const existing = await prisma.cookiePreferences.findFirst({
      where: {
        OR: [
          { cookieId: data.cookieId },
          ...(userId ? [{ userId }] : []),
        ],
      },
    })

    let preferences

    if (existing) {
      // Aggiorna le preferenze esistenti
      preferences = await prisma.cookiePreferences.update({
        where: { id: existing.id },
        data: {
          cookieId: data.cookieId,
          userId: userId || existing.userId,
          necessary: data.necessary,
          analytics: data.analytics,
          marketing: data.marketing,
          functional: data.functional,
        },
      })
    } else {
      // Crea nuove preferenze
      preferences = await prisma.cookiePreferences.create({
        data: {
          cookieId: data.cookieId,
          userId: userId,
          necessary: data.necessary,
          analytics: data.analytics,
          marketing: data.marketing,
          functional: data.functional,
        },
      })
    }

    return NextResponse.json({
      necessary: preferences.necessary,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      functional: preferences.functional,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      )
    }
    console.error('Errore nel salvataggio delle preferenze cookie:', error)
    return NextResponse.json(
      { error: 'Errore nel salvataggio delle preferenze' },
      { status: 500 }
    )
  }
}

