import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST - Invia email a tutti gli iscritti
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    const body = await request.json()
    const { subject, content } = body

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Oggetto e contenuto richiesti' },
        { status: 400 }
      )
    }

    // Recupera gli iscritti attivi
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { isActive: true }
    })

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'Nessun iscritto attivo' },
        { status: 400 }
      )
    }

    // Verifica che SENDER_TOKEN sia presente
    const senderToken = process.env.SENDER_TOKEN
    if (!senderToken) {
      return NextResponse.json(
        { error: 'SENDER_TOKEN non configurato' },
        { status: 500 }
      )
    }

    // Invia email tramite Sender.net
    const emailAddresses = subscribers.map(s => s.email)
    
    try {
      // API Sender.net per inviare email
      // Documentazione: https://api.sender.net/v2/
      const senderResponse = await fetch('https://api.sender.net/v2/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${senderToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          subject: subject,
          html: content,
          recipients: emailAddresses.map(email => ({ email })),
          from: {
            email: process.env.SENDER_FROM_EMAIL || 'noreply@jeins.it',
            name: process.env.SENDER_FROM_NAME || 'JEIns Newsletter'
          }
        })
      })

      if (!senderResponse.ok) {
        const errorData = await senderResponse.json()
        console.error('Errore Sender.net:', errorData)
        throw new Error('Errore nell\'invio tramite Sender.net')
      }

      const senderData = await senderResponse.json()

      // Salva l'email nel database
      const emailRecord = await prisma.newsletterEmail.create({
        data: {
          subject,
          content,
          recipientCount: subscribers.length,
          senderEmailId: senderData.id || null,
          status: 'sent',
          sentAt: new Date()
        }
      })

      return NextResponse.json({ 
        success: true, 
        recipientCount: subscribers.length,
        emailId: emailRecord.id
      })
    } catch (senderError) {
      console.error('Errore Sender.net:', senderError)
      
      // Salva come fallita
      await prisma.newsletterEmail.create({
        data: {
          subject,
          content,
          recipientCount: subscribers.length,
          status: 'failed'
        }
      })

      return NextResponse.json(
        { error: 'Errore nell\'invio tramite Sender.net' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Errore nell\'invio della newsletter:', error)
    return NextResponse.json(
      { error: 'Errore nell\'invio della newsletter' },
      { status: 500 }
    )
  }
}

