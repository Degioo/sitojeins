import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const contactSchema = z.object({
  type: z.enum(['email', 'phone', 'address', 'facebook', 'instagram', 'linkedin']),
  value: z.string().min(1),
  label: z.string().optional(),
  order: z.number().min(0),
  isActive: z.boolean().default(true),
})

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const contact = await prisma.contact.create({
      data: {
        type: data.type,
        value: data.value,
        label: data.label || null,
        order: data.order,
        isActive: data.isActive,
      }
    })

    // Invalida la cache delle pagine pubbliche e admin
    revalidatePath('/')
    revalidatePath('/contatti')
    revalidatePath('/admin/contacts')

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
  }
}
