import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanityClient'
import { blogsQuery } from '@/lib/queries'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '6', 10)
    const tag = searchParams.get('tag')

    // Fetch all blogs
    const allBlogs = await sanityClient.fetch(blogsQuery)

    // Optionally filter by tag
    const filteredBlogs = tag && tag !== 'All'
      ? allBlogs.filter((blog: any) => blog.tags.includes(tag))
      : allBlogs

    const total = filteredBlogs.length
    const startIndex = (page - 1) * limit

    // ❌ If there’s not enough content for this page, don't fetch
    if (startIndex >= total) {
      return NextResponse.json({
        success: true,
        data: [],
        total,
        message: 'No more content for this page'
      })
    }

    // ✅ Apply pagination
    const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      success: true,
      data: paginatedBlogs,
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
