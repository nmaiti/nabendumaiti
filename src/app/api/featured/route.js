import { NextResponse } from 'next/server'
import { getFeaturedProjects } from '@/lib/api'

export async function GET() {
  try {
    const projects = await getFeaturedProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to load featured projects', error)
    return NextResponse.json({ error: 'Failed to load featured projects' }, { status: 500 })
  }
}
