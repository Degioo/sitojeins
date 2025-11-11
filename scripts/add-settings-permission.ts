import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addSettingsPermission() {
  try {
    // Trova il ruolo Amministratore
    const adminRole = await prisma.role.findFirst({
      where: {
        OR: [
          { name: 'admin' },
          { name: 'Admin' },
          { name: 'Amministratore' },
          { name: 'amministratore' }
        ]
      },
      include: {
        permissions: true
      }
    })

    if (!adminRole) {
      console.log('❌ Ruolo admin non trovato')
      return
    }

    console.log('👥 Ruolo trovato:', adminRole.name)
    console.log('🆔 Role ID:', adminRole.id)
    console.log('📋 Permessi attuali:', adminRole.permissions.map(p => p.menuItem).join(', '))

    // Verifica se il permesso settings esiste già
    const hasSettings = adminRole.permissions.some(p => p.menuItem === 'settings')
    
    if (hasSettings) {
      console.log('✅ Il permesso "settings" è già presente')
    } else {
      // Aggiungi il permesso settings
      await prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          menuItem: 'settings'
        }
      })
      console.log('✅ Permesso "settings" aggiunto con successo')
    }

    // Verifica anche dashboard
    const hasDashboard = adminRole.permissions.some(p => p.menuItem === 'dashboard')
    if (!hasDashboard) {
      await prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          menuItem: 'dashboard'
        }
      })
      console.log('✅ Permesso "dashboard" aggiunto con successo')
    }

    // Mostra i permessi finali
    const updatedRole = await prisma.role.findUnique({
      where: { id: adminRole.id },
      include: {
        permissions: true
      }
    })

    console.log('\n📋 Permessi finali:')
    updatedRole?.permissions.forEach((perm, index) => {
      console.log(`  ${index + 1}. ${perm.menuItem}`)
    })

  } catch (error) {
    console.error('❌ Errore:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addSettingsPermission()

