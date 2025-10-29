import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST - Migra gli utenti esistenti al nuovo sistema di ruoli
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

    // Permetti accesso se è admin (nuovo sistema o vecchio)
    const isAdmin = user.role?.name === 'admin' || 
                    user.role?.name === 'Admin' || 
                    session.user.role === 'admin' || 
                    session.user.role === 'Admin'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    // Step 1: Crea o recupera il ruolo admin
    let adminRole = await prisma.role.findUnique({
      where: { name: 'admin' }
    })
    
    if (!adminRole) {
      adminRole = await prisma.role.create({
        data: {
          name: 'admin',
          description: 'Amministratore completo del sistema',
          isSystem: true
        }
      })
    }

    // Step 2: Assegna tutti i permessi al ruolo admin se non li ha già
    const existingPermissions = await prisma.rolePermission.findMany({
      where: { roleId: adminRole.id }
    })
    
    if (existingPermissions.length === 0) {
      const allMenuItems = ['dashboard', 'home', 'services', 'projects', 'blog', 'team', 'recruitment', 'contacts', 'newsletter', 'policies', 'settings']
      await prisma.rolePermission.createMany({
        data: allMenuItems.map(menuItem => ({
          roleId: adminRole!.id,
          menuItem
        }))
      })
    }

    // Step 3: Trova tutti gli utenti senza ruolo e assegnagli il ruolo admin
    // (presumiamo che tutti gli utenti esistenti siano admin)
    const usersWithoutRole = await prisma.user.findMany({
      where: {
        roleId: null
      }
    })

    let migratedCount = 0
    for (const userToMigrate of usersWithoutRole) {
      await prisma.user.update({
        where: { id: userToMigrate.id },
        data: {
          roleId: adminRole.id
        }
      })
      migratedCount++
    }

    // Step 4: Assicurati che l'utente corrente abbia il ruolo admin
    if (!user.roleId) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          roleId: adminRole.id
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Migrazione completata con successo',
      adminRole: {
        id: adminRole.id,
        name: adminRole.name
      },
      permissionsCount: existingPermissions.length === 0 ? 11 : existingPermissions.length,
      usersMigrated: migratedCount + (user.roleId ? 0 : 1)
    })
  } catch (error: any) {
    console.error('Error migrating roles:', error)
    return NextResponse.json(
      { error: 'Errore durante la migrazione', details: error.message },
      { status: 500 }
    )
  }
}

