import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Ottiene i permessi per un ruolo o tutti i permessi
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const roleId = searchParams.get('roleId')

    // Permetti accesso se ha ruolo admin nel nuovo sistema O se la session dice che è admin (retrocompatibilità)
    const userRoleName = user.role?.name?.toLowerCase() || ''
    const sessionRoleName = session.user.role?.toLowerCase() || ''
    const isAdmin = userRoleName === 'admin' || 
                    userRoleName === 'amministratore' ||
                    user.role?.name === 'Admin' || 
                    user.role?.name === 'Amministratore' ||
                    sessionRoleName === 'admin' ||
                    sessionRoleName === 'amministratore' ||
                    session.user.role === 'Admin' ||
                    session.user.role === 'Amministratore'

    if (roleId) {
      // Se l'utente richiede i permessi del proprio ruolo, consentiglielo sempre
      // Se richiede i permessi di un altro ruolo, solo gli admin possono farlo
      if (user.roleId === roleId || isAdmin) {
        const role = await prisma.role.findUnique({ where: { id: roleId } })
        const roleNameLower = role?.name?.toLowerCase() || ''
        const isRequestedRoleAdmin = roleNameLower === 'admin' || roleNameLower === 'amministratore'
        
        const permissions = await prisma.rolePermission.findMany({
          where: { roleId },
          orderBy: { menuItem: 'asc' }
        })
        
        // Se il ruolo richiesto è admin, assicurati che abbia sempre i permessi dashboard e settings
        if (isRequestedRoleAdmin) {
          const permissionMenuItems = permissions.map(p => p.menuItem)
          const requiredPermissions = ['dashboard', 'settings']
          let needsReload = false
          
          for (const requiredPermission of requiredPermissions) {
            if (!permissionMenuItems.includes(requiredPermission)) {
              // Aggiungi il permesso mancante al database
              await prisma.rolePermission.create({
                data: {
                  roleId,
                  menuItem: requiredPermission
                }
              })
              needsReload = true
            }
          }
          
          // Ricarica i permessi se ne sono stati aggiunti
          if (needsReload) {
            const updatedPermissions = await prisma.rolePermission.findMany({
              where: { roleId },
              orderBy: { menuItem: 'asc' }
            })
            return NextResponse.json(updatedPermissions)
          }
        }
        
        return NextResponse.json(permissions)
      } else {
        return NextResponse.json({ error: 'Non autorizzato a vedere i permessi di questo ruolo' }, { status: 403 })
      }
    } else {
      // Recupera tutti i permessi raggruppati per ruolo - solo admin
      if (!isAdmin) {
        return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
      }
      
      const permissions = await prisma.rolePermission.findMany({
        include: {
          role: true
        },
        orderBy: [
          { role: { name: 'asc' } },
          { menuItem: 'asc' }
        ]
      })
      return NextResponse.json(permissions)
    }
  } catch (error) {
    console.error('Error fetching permissions:', error)
    return NextResponse.json(
      { error: 'Errore nel recupero dei permessi' },
      { status: 500 }
    )
  }
}

// POST - Aggiunge un permesso a un ruolo
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
    const userRoleName = user.role?.name?.toLowerCase() || ''
    const sessionRoleName = session.user.role?.toLowerCase() || ''
    const isAdmin = userRoleName === 'admin' || 
                    userRoleName === 'amministratore' ||
                    user.role?.name === 'Admin' || 
                    user.role?.name === 'Amministratore' ||
                    sessionRoleName === 'admin' ||
                    sessionRoleName === 'amministratore' ||
                    session.user.role === 'Admin' ||
                    session.user.role === 'Amministratore'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const body = await request.json()
    const { roleId, menuItem } = body

    if (!roleId || !menuItem) {
      return NextResponse.json(
        { error: 'roleId e menuItem sono obbligatori' },
        { status: 400 }
      )
    }

    const permission = await prisma.rolePermission.create({
      data: {
        roleId,
        menuItem
      },
      include: {
        role: true
      }
    })

    return NextResponse.json(permission, { status: 201 })
  } catch (error: any) {
    console.error('Error creating permission:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Questo permesso esiste già per questo ruolo' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Errore nella creazione del permesso' },
      { status: 500 }
    )
  }
}

// PUT - Aggiorna i permessi di un ruolo (sostituisce tutti i permessi)
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
    const userRoleName = user.role?.name?.toLowerCase() || ''
    const sessionRoleName = session.user.role?.toLowerCase() || ''
    const isAdmin = userRoleName === 'admin' || 
                    userRoleName === 'amministratore' ||
                    user.role?.name === 'Admin' || 
                    user.role?.name === 'Amministratore' ||
                    sessionRoleName === 'admin' ||
                    sessionRoleName === 'amministratore' ||
                    session.user.role === 'Admin' ||
                    session.user.role === 'Amministratore'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const body = await request.json()
    const { roleId, menuItems } = body

    if (!roleId || !Array.isArray(menuItems)) {
      return NextResponse.json(
        { error: 'roleId e menuItems (array) sono obbligatori' },
        { status: 400 }
      )
    }

    // Elimina tutti i permessi esistenti per questo ruolo
    await prisma.rolePermission.deleteMany({
      where: { roleId }
    })

    // Crea i nuovi permessi
    if (menuItems.length > 0) {
      await prisma.rolePermission.createMany({
        data: menuItems.map((menuItem: string) => ({
          roleId,
          menuItem
        }))
      })
    }

    // Recupera i permessi aggiornati
    const permissions = await prisma.rolePermission.findMany({
      where: { roleId },
      include: {
        role: true
      }
    })

    return NextResponse.json(permissions)
  } catch (error: any) {
    console.error('Error updating permissions:', error)
    return NextResponse.json(
      { error: 'Errore nell\'aggiornamento dei permessi' },
      { status: 500 }
    )
  }
}

// DELETE - Rimuove un permesso
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
    const userRoleName = user.role?.name?.toLowerCase() || ''
    const sessionRoleName = session.user.role?.toLowerCase() || ''
    const isAdmin = userRoleName === 'admin' || 
                    userRoleName === 'amministratore' ||
                    user.role?.name === 'Admin' || 
                    user.role?.name === 'Amministratore' ||
                    sessionRoleName === 'admin' ||
                    sessionRoleName === 'amministratore' ||
                    session.user.role === 'Admin' ||
                    session.user.role === 'Amministratore'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID permesso è obbligatorio' },
        { status: 400 }
      )
    }

    await prisma.rolePermission.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting permission:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Permesso non trovato' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Errore nell\'eliminazione del permesso' },
      { status: 500 }
    )
  }
}

