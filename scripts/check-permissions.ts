import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkPermissions() {
  try {
    // Trova l'utente admin@jeins.it
    const user = await prisma.user.findUnique({
      where: { email: 'admin@jeins.it' },
      include: {
        role: {
          include: {
            permissions: true
          }
        }
      }
    })

    if (!user) {
      console.log('❌ Utente admin@jeins.it non trovato')
      return
    }

    console.log('👤 Utente:', user.email)
    console.log('🆔 User ID:', user.id)
    console.log('🔑 Role ID:', user.roleId)
    
    if (!user.role) {
      console.log('❌ L\'utente non ha un ruolo assegnato')
      return
    }

    console.log('👥 Ruolo:', user.role.name)
    console.log('📋 Descrizione:', user.role.description)
    console.log('🔒 Permessi:')
    
    if (user.role.permissions.length === 0) {
      console.log('  ⚠️  Nessun permesso trovato!')
    } else {
      user.role.permissions.forEach((perm, index) => {
        const hasSettings = perm.menuItem === 'settings'
        console.log(`  ${index + 1}. ${perm.menuItem}${hasSettings ? ' ✅' : ''}`)
      })
    }

    // Verifica specificamente il permesso settings
    const hasSettings = user.role.permissions.some(p => p.menuItem === 'settings')
    console.log('\n🔍 Permesso "settings":', hasSettings ? '✅ PRESENTE' : '❌ MANCANTE')

    // Verifica il permesso dashboard
    const hasDashboard = user.role.permissions.some(p => p.menuItem === 'dashboard')
    console.log('🔍 Permesso "dashboard":', hasDashboard ? '✅ PRESENTE' : '❌ MANCANTE')

    // Lista tutti i ruoli e i loro permessi
    console.log('\n📊 Tutti i ruoli nel database:')
    const allRoles = await prisma.role.findMany({
      include: {
        permissions: true,
        _count: {
          select: {
            users: true
          }
        }
      }
    })

    for (const role of allRoles) {
      console.log(`\n  👥 Ruolo: ${role.name} (${role._count.users} utenti)`)
      console.log(`     Permessi (${role.permissions.length}):`)
      role.permissions.forEach(perm => {
        console.log(`       - ${perm.menuItem}`)
      })
    }

  } catch (error) {
    console.error('❌ Errore:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkPermissions()

