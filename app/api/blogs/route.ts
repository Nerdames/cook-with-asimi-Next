import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanityClient'
import { blogsQuery } from '@/lib/queries'

// GET /api/blogs
export async function GET() {
  try {
    const blogs = await sanityClient.fetch(blogsQuery)
    return NextResponse.json({ success: true, data: blogs })
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 })
  }
}
