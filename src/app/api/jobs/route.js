import { NextResponse } from 'next/server'
import { getJobs } from '@/lib/api'

export async function GET() {
  try {
    const jobs = await getJobs()
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Failed to load jobs', error)
    return NextResponse.json({ error: 'Failed to load jobs' }, { status: 500 })
  }
}
