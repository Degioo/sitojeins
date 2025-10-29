import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Lista tutti i ruoli
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non autenticato' }, { status: 401 })
    }

    // Verifica che l'utente sia admin (controlleremo questo meglio dopo)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { role: true }
    })

    if (!user || (user.role?.name !== 'admin' && user.role?.name !== 'Admin')) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const roles = await prisma.role.findMany({
      include: {
        _count: {
          select: {
            users: true,
            permissions: true
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(roles)
  } catch (error) {
    console.error('Error fetching roles:', error)
    return NextResponse.json(
      { error: 'Errore nel recupero dei ruoli' },
      { status: 500 }
    )
  }
}

// POST - Crea un nuovo ruolo
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non autenticato' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { role: true }
    })

    if (!user || (user.role?.name !== 'admin' && user.role?.name !== 'Admin')) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Il nome del ruolo è obbligatorio' },
        { status: 400 }
      )
    }

    const role = await prisma.role.create({
      data: {
        name,
        description: description || null,
        isSystem: false
      }
    })

    return NextResponse.json(role, { status: 201 })
  } catch (error: any) {
    console.error('Error creating role:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Un ruolo con questo nome esiste già' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Errore nella creazione del ruolo' },
      { status: 500 }
    )
  }
}

// PUT - Aggiorna un ruolo
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non autenticato' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { role: true }
    })

    if (!user || (user.role?.name !== 'admin' && user.role?.name !== 'Admin')) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const body = await request.json()
    const { id, name, description } = body

    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID e nome del ruolo sono obbligatori' },
        { status: 400 }
      )
    }

    const role = await prisma.role.update({
      where: { id },
      data: {
        name,
        description: description || null
      }
    })

    return NextResponse.json(role)
  } catch (error: any) {
    console.error('Error updating role:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Ruolo non trovato' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Errore nell\'aggiornamento del ruolo' },
      { status: 500 }
    )
  }
}

// DELETE - Elimina un ruolo
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non autenticato' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { role: true }
    })

    if (!user || (user.role?.name !== 'admin' && user.role?.name !== 'Admin')) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID del ruolo è obbligatorio' },
        { status: 400 }
      )
    }

    // Verifica se è un ruolo di sistema
    const role = await prisma.role.findUnique({ where: { id } })
    if (role?.isSystem) {
      return NextResponse.json(
        { error: 'Non è possibile eliminare un ruolo di sistema' },
        { status: 403 }
      )
    }

    await prisma.role.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting role:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Ruolo non trovato' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Errore nell\'eliminazione del ruolo' },
      { status: 500 }
    )
  }
}

