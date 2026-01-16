import { NextResponse } from 'next/server'
import { getSortedPostsData } from '@/lib/api'

export async function GET() {
  try {
    const posts = await getSortedPostsData()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Failed to load posts', error)
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 })
  }
}
