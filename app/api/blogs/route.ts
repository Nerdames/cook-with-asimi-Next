import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanityClient'
import { blogsQuery, blogsCountQuery } from '@/lib/queries'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '6', 10)
    const tag = searchParams.get('tag') || ''

    const offset = (page - 1) * limit

    const blogs = await sanityClient.fetch(blogsQuery(offset, limit, tag))
    const total = await sanityClient.fetch(blogsCountQuery(tag))

    return NextResponse.json({
      success: true,
      data: blogs,
      total
    })
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}
