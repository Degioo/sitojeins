import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const recruitmentSettingsSchema = z.object({
  isOpen: z.boolean(),
  openDate: z.string().optional(),
  closeDate: z.string().optional(),
  description: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  tallyFormUrl: z.string().url().optional().or(z.literal('')),
  notionSheetUrl: z.string().url().optional().or(z.literal('')),
  faqs: z.string().optional(),
})

export async function GET() {
  try {
    const recruitment = await prisma.recruitment.findFirst()
    return NextResponse.json(recruitment)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recruitment settings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = recruitmentSettingsSchema.parse(body)

    const recruitment = await prisma.recruitment.create({
      data: {
        isOpen: data.isOpen,
        openDate: data.openDate ? new Date(data.openDate) : null,
        closeDate: data.closeDate ? new Date(data.closeDate) : null,
        description: data.description || null,
        requirements: data.requirements || null,
        benefits: data.benefits || null,
        tallyFormUrl: data.tallyFormUrl || null,
        notionSheetUrl: data.notionSheetUrl || null,
        faqs: data.faqs || null,
      }
    })

    // Invalida la cache delle pagine pubbliche e admin
    revalidatePath('/')
    revalidatePath('/recruitment')
    revalidatePath('/admin/recruitment')

    return NextResponse.json(recruitment, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create recruitment settings' }, { status: 500 })
  }
}
