import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanityClient'
import { groq } from 'next-sanity'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 6
  const start = (page - 1) * limit
  const end = start + limit

  const query = groq`
    *[_type == "post" && (title match $q || body[].children[].text match $q)]
    | order(publishedAt desc)
    [$start...$end] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      video,
      description,
      tags,
      author->{name},
      category->{title},
      body
    }
  `

  const countQuery = groq`
    count(*[_type == "post" && (title match $q || body[].children[].text match $q)])
  `

  try {
    const [results, total] = await Promise.all([
      sanityClient.fetch(query, { q: `*${q}*`, start, end }),
      sanityClient.fetch(countQuery, { q: `*${q}*` }),
    ])

    return NextResponse.json({ success: true, data: results, total })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: 'Search failed' }, { status: 500 })
  }
}
