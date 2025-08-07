// app/api/blogs/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanityClient'
import { groq } from 'next-sanity'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '6', 10)
  const tag = searchParams.get('tag') || ''
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'desc' // asc or desc
  const category = searchParams.get('category') || ''

  const start = (page - 1) * limit

  const filters = [
    `_type == "blog"`,
    tag ? `"${tag}" in tags` : '',
    category ? `category->title match "${category}"` : '',
    search ? `(title match "*${search}*" || description match "*${search}*")` : '',
  ].filter(Boolean).join(' && ')

  const baseQuery = `*[${
    filters
  }]`

  const query = groq`
  {
    "blogs": ${baseQuery} | order(date ${sort}) [${start}...${start + limit}] {
      _id,
      slug,
      title,
      description,
      date,
      tags,
      video,
      thumbnail {
        asset -> {
          url
        }
      },
      author-> {
        name
      },
      category-> {
        title
      }
    },
    "total": count(${baseQuery})
  }
  `

  try {
    const data = await sanityClient.fetch(query)
    return NextResponse.json({ success: true, data: data.blogs, total: data.total })
  } catch (error) {
    console.error('[API ERROR]', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}
