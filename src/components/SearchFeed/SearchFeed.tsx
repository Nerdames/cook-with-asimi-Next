'use client'

import { useEffect, useState } from 'react'
import ContentCard from '@/components/ContentCard/ContentCard'
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard'
import Pager from '@/components/Pager/Pager'
import { useSearchParams } from 'next/navigation'
import styles from './SearchFeed.module.css'

interface Blog {
  _id: string
  slug: { current: string }
  title: string
  description: string
  mainImage?: { asset?: { url?: string } }
  video?: string
  tags: string[]
  publishedAt?: string
  author: { name: string } | string
  category: { title: string } | string
  body?: any[]
}

const POSTS_PER_PAGE = 6

const highlightMatch = (text: string, q: string): string => {
  const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${safeQ})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

const getExcerpt = (body: any[], q: string): string => {
  if (!Array.isArray(body)) return ''
  const lowerQ = q.toLowerCase()
  for (const block of body) {
    if (!block.children) continue
    for (const child of block.children) {
      if (
        typeof child.text === 'string' &&
        child.text.toLowerCase().includes(lowerQ)
      ) {
        return child.text
      }
    }
  }
  return ''
}

export default function SearchFeed() {
  const searchParams = useSearchParams()
  const q = (searchParams.get('q') || '').trim()
  const [currentPage, setCurrentPage] = useState(1)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (!q) return
    async function fetchSearchResults() {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&page=${currentPage}`
        )
        const data = await res.json()
        if (data.success) {
          setBlogs(data.data)
          setTotalPages(Math.ceil(data.total / POSTS_PER_PAGE))
        } else {
          setBlogs([])
        }
      } catch (error) {
        console.error('Search error:', error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [q, currentPage])

  if (!q) {
    return <p className="p-8 text-center">Please enter a search query.</p>
  }

  return (
    <section className={styles.contentFeed}>
      <h1 className="text-2xl font-semibold mb-6">
        Results for <span className="text-primary">&ldquo;{q}&rdquo;</span>
      </h1>

      {loading ? (
        Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
          <SkeletonCard key={i} />
        ))
      ) : blogs.length > 0 ? (
        blogs.map((blog) => {
          const matchedExcerpt = getExcerpt(blog.body || [], q)
          const highlightedDescription = matchedExcerpt
            ? highlightMatch(matchedExcerpt, q)
            : highlightMatch(blog.description || '', q)
          const highlightedTitle = highlightMatch(blog.title, q)

          return (
            <ContentCard
              key={blog._id}
              id={blog._id}
              slug={blog.slug?.current || blog._id}
              image={blog.mainImage?.asset?.url}
              video={blog.video}
              date={blog.publishedAt || 'Unknown Date'}
              title={<span dangerouslySetInnerHTML={{ __html: highlightedTitle }} />}
              description={<span dangerouslySetInnerHTML={{ __html: highlightedDescription }} />}
              category={
                typeof blog.category === 'string'
                  ? blog.category
                  : blog.category?.title || 'General'
              }
              author={
                typeof blog.author === 'string'
                  ? blog.author
                  : blog.author?.name || 'Unknown'
              }
              tags={blog.tags || []}
              primaryAction="Read More"
            />
          )
        })
      ) : (
        <p>No results found.</p>
      )}

      {!loading && totalPages > 1 && (
        <Pager
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  )
}
