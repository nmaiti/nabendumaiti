import { NextResponse } from 'next/server'
import { readUpload } from '@/lib/api'

const mimeFromExt = ext => {
  switch (ext.toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.png':
      return 'image/png'
    case '.gif':
      return 'image/gif'
    case '.webp':
      return 'image/webp'
    case '.svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}

export async function GET(_req, { params }) {
  try {
    const parts = Array.isArray(params.path) ? params.path : []
    // console.log('uploads request parts', parts)
    const result = readUpload(parts)
    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const { buffer, ext } = result
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mimeFromExt(ext),
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Failed to serve upload', error)
    return NextResponse.json({ error: 'Failed to load upload' }, { status: 500 })
  }
}
