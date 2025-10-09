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
    
    console.log('Saving sections:', sections.length)
    
    // Aggiorna o crea ogni sezione
    const results = []
    for (const section of sections) {
      const result = await prisma.homeSection.upsert({
        where: { name: section.name },
        update: {
          title: section.title || null,
          subtitle: section.subtitle || null,
          description: section.description || null,
          isActive: section.isActive,
          order: section.order,
          config: section.config || null
        },
        create: {
          name: section.name,
          title: section.title || null,
          subtitle: section.subtitle || null,
          description: section.description || null,
          isActive: section.isActive,
          order: section.order,
          config: section.config || null
        }
      })
      results.push(result)
    }

    console.log('Sections saved successfully:', results.length)
    return NextResponse.json({ success: true, count: results.length })
  } catch (error) {
    console.error('Error saving sections:', error)
    return NextResponse.json({ 
      error: 'Failed to update home sections',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
