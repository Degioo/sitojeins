import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jeins.it' },
    update: {},
    create: {
      email: 'admin@jeins.it',
      name: 'Admin JEIns',
      password: hashedPassword,
      role: 'admin',
    },
  })

  // Create default contacts
  const defaultContacts = [
    { type: 'email', value: 'info@jeins.it', label: 'Email principale' },
    { type: 'phone', value: '+39 0332 218811', label: 'Telefono' },
    { type: 'address', value: 'Via Ravasi, 2, 21100 Varese VA', label: 'Sede principale' },
    { type: 'facebook', value: 'https://facebook.com/jeins.insubria', label: 'Facebook' },
    { type: 'instagram', value: 'https://instagram.com/jeins_insubria', label: 'Instagram' },
    { type: 'linkedin', value: 'https://linkedin.com/company/jeins', label: 'LinkedIn' },
  ]

  for (const contact of defaultContacts) {
    await prisma.contact.upsert({
      where: { 
        type_value: { 
          type: contact.type, 
          value: contact.value 
        } 
      },
      update: {},
      create: {
        type: contact.type,
        value: contact.value,
        label: contact.label,
        order: defaultContacts.indexOf(contact),
      },
    })
  }

  // Create default policies
  const defaultPolicies = [
    {
      type: 'privacy',
      title: 'Privacy Policy',
      content: 'Inserisci qui il contenuto della privacy policy...',
      version: '1.0'
    },
    {
      type: 'cookie',
      title: 'Cookie Policy',
      content: 'Inserisci qui il contenuto della cookie policy...',
      version: '1.0'
    },
    {
      type: 'terms',
      title: 'Termini e Condizioni',
      content: 'Inserisci qui i termini e condizioni...',
      version: '1.0'
    }
  ]

  for (const policy of defaultPolicies) {
    await prisma.policy.upsert({
      where: { 
        type_version: { 
          type: policy.type, 
          version: policy.version 
        } 
      },
      update: {},
      create: {
        type: policy.type,
        title: policy.title,
        content: policy.content,
        version: policy.version,
      },
    })
  }

  console.log('Database initialized successfully!')
  console.log('Admin user created: admin@jeins.it / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
