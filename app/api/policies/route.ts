import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const policySchema = z.object({
  type: z.enum(['privacy', 'cookie']),
  title: z.string().min(1),
  content: z.string().min(1),
  isActive: z.boolean(),
  version: z.string().min(1),
})

export async function GET() {
  try {
    const policies = await prisma.policy.findMany({
      orderBy: { updatedAt: 'desc' }
    })
    return NextResponse.json(policies)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch policies' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = policySchema.parse(body)

    // Check if a policy of this type already exists
    const existingPolicy = await prisma.policy.findFirst({
      where: { type: data.type }
    })

    if (existingPolicy) {
      return NextResponse.json({ error: 'A policy of this type already exists' }, { status: 400 })
    }

    const policy = await prisma.policy.create({
      data
    })

    return NextResponse.json(policy, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create policy' }, { status: 500 })
  }
}
