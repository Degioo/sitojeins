import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  sector: z.string().min(1),
  icon: z.string().optional(),
  order: z.number().min(0),
  isActive: z.boolean().default(true),
})

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = serviceSchema.parse(body)

    const service = await prisma.service.create({
      data
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
