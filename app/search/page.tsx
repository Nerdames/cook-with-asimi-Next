import { groq } from 'next-sanity'
import { sanityClient } from '@/lib/sanityClient'
import { notFound } from 'next/navigation'
import ContentCard from '@/components/ContentCard'
import type { Blog } from '@/lib/types/blog'

const POSTS_PER_PAGE = 6
export const revalidate = 60 // ISR every 60s

export async function generateMetadata({ searchParams }: any) {
  const q = searchParams.q || ''
  return { title: `Search results for "${q}"` }
}

// Highlight matched word
const highlightMatch = (text: string, q: string): string => {
  const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape RegExp special chars
  const regex = new RegExp(`(${safeQ})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// Extract first body text block that matches the query
const getExcerpt = (body: any[], q: string): string => {
  if (!Array.isArray(body)) return ''
  const lowerQ = q.toLowerCase()

  for (const block of body) {
    if (!block.children) continue
    for (const child of block.children) {
      if (typeof child.text === 'string' && child.text.toLowerCase().includes(lowerQ)) {
        return child.text
      }
    }
  }

  return ''
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string }
}) {
  const q = (searchParams.q || '').trim()
  const page = parseInt(searchParams.page || '1', 10)

  if (!q) return <p className="p-8 text-center">Please enter a search query.</p>

  const start = (page - 1) * POSTS_PER_PAGE

  const searchQuery = groq`
    *[_type == "post" && (title match $q || body[].children[].text match $q)]
    | order(publishedAt desc)
    [$start...$end] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      author->{name},
      category->{title},
      tags,
      description,
      video,
      body
    }
  `

  const countQuery = groq`
    count(*[_type == "post" && (title match $q || body[].children[].text match $q)])
  `

  const [results, total] = await Promise.all([
    sanityClient.fetch(searchQuery, {
      q: `*${q}*`,
      start,
      end: start + POSTS_PER_PAGE,
    }),
    sanityClient.fetch(countQuery, {
      q: `*${q}*`,
    }),
  ])

  if (!results.length && page !== 1) notFound()

  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Results for <span className="text-primary">&ldquo;{q}&rdquo;</span> ({total})
      </h1>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((post: Blog) => {
              const matchedExcerpt = getExcerpt(post.body || [], q)
              const safeDescription = matchedExcerpt
                ? highlightMatch(matchedExcerpt, q)
                : post.description || ''

              const safeTitle =
                typeof post.title === 'string'
                  ? highlightMatch(post.title, q)
                  : post.title

              return (
                <ContentCard
                  key={post._id}
                  id={post._id}
                  slug={post.slug?.current}
                  image={post.mainImage}
                  video={post.video}
                  date={post.publishedAt}
                  title={
                    <span dangerouslySetInnerHTML={{ __html: safeTitle }} />
                  }
                  description={
                    <span dangerouslySetInnerHTML={{ __html: safeDescription }} />
                  }
                  primaryAction="Read More"
                  category={post.category?.title || 'Uncategorized'}
                  author={post.author?.name || 'Unknown Author'}
                  tags={post.tags || []}
                />
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`/search?q=${encodeURIComponent(q)}&page=${p}`}
                  className={`px-3 py-1 rounded text-sm ${
                    p === page
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {p}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
