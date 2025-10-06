import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sections = await prisma.homeSection.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(sections)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch home sections' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const sections = await request.json()
    
    // Aggiorna o crea ogni sezione
    for (const section of sections) {
      await prisma.homeSection.upsert({
        where: { name: section.name },
        update: {
          title: section.title,
          subtitle: section.subtitle,
          description: section.description,
          isActive: section.isActive,
          order: section.order,
          config: section.config
        },
        create: {
          name: section.name,
          title: section.title,
          subtitle: section.subtitle,
          description: section.description,
          isActive: section.isActive,
          order: section.order,
          config: section.config
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update home sections' }, { status: 500 })
  }
}
