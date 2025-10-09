import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Lista email inviate
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    const emails = await prisma.newsletterEmail.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(emails)
  } catch (error) {
    console.error('Errore nel caricamento delle email:', error)
    return NextResponse.json(
      { error: 'Errore nel caricamento delle email' },
      { status: 500 }
    )
  }
}

