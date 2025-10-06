import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  tags: z.string().optional(),
  client: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  order: z.number().min(0),
  isActive: z.boolean().default(true),
})

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = projectSchema.parse(body)

    const project = await prisma.project.create({
      data: {
        ...data,
        image: data.image || '',
        tags: data.tags || '',
        client: data.client || '',
        year: data.year || new Date().getFullYear(),
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
