import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

// Usa il token personalizzato di Vercel
process.env.BLOB_READ_WRITE_TOKEN = process.env.jeins_READ_WRITE_TOKEN

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'Nessun file caricato' }, { status: 400 })
    }

    // Verifica che sia un'immagine
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Il file deve essere un\'immagine' }, { status: 400 })
    }

    // Genera nome file unico
    const timestamp = Date.now()
    const cleanFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `jeins/${folder}/${timestamp}-${cleanFilename}`

    // Upload su Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
    })

    return NextResponse.json({
      url: blob.url,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Errore durante l\'upload' },
      { status: 500 }
    )
  }
}
