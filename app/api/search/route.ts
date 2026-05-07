import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanityClient'
import { groq } from 'next-sanity'

// Force dynamic ensures search results aren't stale
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    
    // 1. Extract and Sanitize Parameters
    const q = searchParams.get('q')?.trim() || ''
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.max(1, parseInt(searchParams.get('limit') || '6'))
    const tag = searchParams.get('tag') || ''
    const category = searchParams.get('category') || ''
    const sort = searchParams.get('sort') === 'asc' ? 'asc' : 'desc'

    // Calculate pagination range
    const start = (page - 1) * limit
    const end = start + limit

    // 2. Build Dynamic Filters
    // We search across title, description, tags, AND the rich text body
    const filterParts = [
      `_type == "blog"`,
      `defined(slug.current)`,
      tag ? `"${tag}" in tags` : '',
      category ? `category->title match "${category}"` : '',
      q ? `(title match $searchQuery || description match $searchQuery || body[].children[].text match $searchQuery || tags[] match $searchQuery)` : ''
    ].filter(Boolean)

    const filterString = filterParts.join(' && ')

    // 3. Construct the GROQ Query
    // Using the field names your UI expects: 'thumbnail' and 'date'
    const query = groq`{
      "results": *[${filterString}] | order(date ${sort}) [$start...$end] {
        _id,
        title,
        slug,
        description,
        date,
        tags,
        video,
        thumbnail {
          asset -> { url }
        },
        author-> { name },
        category-> { title },
        body
      },
      "total": count(*[${filterString}])
    }`

    // 4. Execute with Params
    // We add '*' to the end of the query for "starts with" performance
    const searchQuery = q ? `${q}*` : '*'
    
    const { results, total } = await sanityClient.fetch(query, {
      searchQuery,
      start,
      end
    })

    return NextResponse.json({
      success: true,
      data: results || [],
      total: total || 0
    })

  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch search results' },
      { status: 500 }
    )
  }
}