import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// GET - Lista tutti gli utenti
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non autenticato' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { role: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'Utente non trovato' }, { status: 403 })
    }

    // Permetti accesso se ha ruolo admin nel nuovo sistema O se la session dice che è admin (retrocompatibilità)
    const isAdmin = user.role?.name === 'admin' || 
                    user.role?.name === 'Admin' || 
                    session.user.role === 'admin' || 
                    session.user.role === 'Admin'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const users = await prisma.user.findMany({
      include: {
        role: {
          include: {
            _count: {
              select: {
                permissions: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Rimuovi le password dalla risposta
    const usersWithoutPasswords = users.map(({ password, ...user }) => ({
      ...user,
      password: undefined
    }))

    return NextResponse.json(usersWithoutPasswords)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Errore nel recupero degli utenti' },
      { status: 500 }
    )
  }
}

// POST - Crea un nuovo utente
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

    if (!user) {
      return NextResponse.json({ error: 'Utente non trovato' }, { status: 403 })
    }

    // Permetti accesso se ha ruolo admin nel nuovo sistema O se la session dice che è admin (retrocompatibilità)
    const isAdmin = user.role?.name === 'admin' || 
                    user.role?.name === 'Admin' || 
                    session.user.role === 'admin' || 
                    session.user.role === 'Admin'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const body = await request.json()
    const { email, username, password, name, roleId } = body

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, username e password sono obbligatori' },
        { status: 400 }
      )
    }

    // Verifica se email o username esistono già
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utente con questa email o username esiste già' },
        { status: 409 }
      )
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name: name || null,
        roleId: roleId || null
      },
      include: {
        role: true
      }
    })

    // Rimuovi la password dalla risposta
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error: any) {
    console.error('Error creating user:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Un utente con questa email o username esiste già' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Errore nella creazione dell\'utente' },
      { status: 500 }
    )
  }
}

// PUT - Aggiorna un utente
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

    if (!user) {
      return NextResponse.json({ error: 'Utente non trovato' }, { status: 403 })
    }

    // Permetti accesso se ha ruolo admin nel nuovo sistema O se la session dice che è admin (retrocompatibilità)
    const isAdmin = user.role?.name === 'admin' || 
                    user.role?.name === 'Admin' || 
                    session.user.role === 'admin' || 
                    session.user.role === 'Admin'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const body = await request.json()
    const { id, email, username, password, name, roleId } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID utente è obbligatorio' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (email) updateData.email = email
    if (username) updateData.username = username
    if (name !== undefined) updateData.name = name
    if (roleId !== undefined) updateData.roleId = roleId || null
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        role: true
      }
    })

    // Rimuovi la password dalla risposta
    const { password: _, ...userWithoutPassword } = updatedUser

    return NextResponse.json(userWithoutPassword)
  } catch (error: any) {
    console.error('Error updating user:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Utente non trovato' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Errore nell\'aggiornamento dell\'utente' },
      { status: 500 }
    )
  }
}

// DELETE - Elimina un utente
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

    if (!user) {
      return NextResponse.json({ error: 'Utente non trovato' }, { status: 403 })
    }

    // Permetti accesso se ha ruolo admin nel nuovo sistema O se la session dice che è admin (retrocompatibilità)
    const isAdmin = user.role?.name === 'admin' || 
                    user.role?.name === 'Admin' || 
                    session.user.role === 'admin' || 
                    session.user.role === 'Admin'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID utente è obbligatorio' },
        { status: 400 }
      )
    }

    // Non permettere l'eliminazione di se stessi
    if (id === user.id) {
      return NextResponse.json(
        { error: 'Non puoi eliminare il tuo stesso account' },
        { status: 403 }
      )
    }

    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting user:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Utente non trovato' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Errore nell\'eliminazione dell\'utente' },
      { status: 500 }
    )
  }
}

