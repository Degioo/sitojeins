import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const policyUpdateSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  isActive: z.boolean(),
  version: z.string().min(1),
})

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const policy = await prisma.policy.findUnique({
      where: { id: params.id }
    })

    if (!policy) {
      return NextResponse.json({ error: 'Policy not found' }, { status: 404 })
    }

    return NextResponse.json(policy)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch policy' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const data = policyUpdateSchema.parse(body)

    const policy = await prisma.policy.update({
      where: { id: params.id },
      data
    })

    return NextResponse.json(policy)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update policy' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await prisma.policy.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete policy' }, { status: 500 })
  }
}
