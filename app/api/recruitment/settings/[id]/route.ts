import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const recruitmentSettingsSchema = z.object({
  isOpen: z.boolean(),
  openDate: z.string().optional(),
  closeDate: z.string().optional(),
  description: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  googleFormUrl: z.string().url().optional().or(z.literal('')),
})

interface RouteParams {
  params: {
    id: string
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const data = recruitmentSettingsSchema.parse(body)

    const recruitment = await prisma.recruitment.update({
      where: { id: params.id },
      data: {
        ...data,
        openDate: data.openDate ? new Date(data.openDate) : null,
        closeDate: data.closeDate ? new Date(data.closeDate) : null,
      }
    })

    return NextResponse.json(recruitment)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update recruitment settings' }, { status: 500 })
  }
}
