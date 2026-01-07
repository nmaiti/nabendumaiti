import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/api'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to load projects', error)
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 })
  }
}
