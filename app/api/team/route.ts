import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  image: z.string().optional(),
  description: z.string().optional(),
  order: z.number().min(0),
  isActive: z.boolean().default(true),
})

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = teamMemberSchema.parse(body)

    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        order: data.order,
        isActive: data.isActive,
        ...(data.image && { image: data.image }),
        ...(data.description && { description: data.description }),
      }
    })

    // Invalida la cache delle pagine pubbliche e admin
    revalidatePath('/')
    revalidatePath('/chi-siamo')
    revalidatePath('/admin/team')

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
  }
}
