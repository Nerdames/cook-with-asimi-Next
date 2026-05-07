'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ContentCard from '@/components/ContentCard/ContentCard'
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard'
import Pager from '@/components/Pager/Pager'
import styles from './SearchFeed.module.css'

// Updated to match your exact ContentCard properties
interface Blog {
  _id: string
  slug?: { current: string }
  title: string
  description: string
  thumbnail?: { asset?: { url?: string } } // Changed from mainImage
  video?: string
  tags: string[]
  date?: string // Changed from publishedAt
  author: { name: string } | string
  category: { title: string } | string
}

const blogsPerPage = 6 // Renamed to match your snippet

export default function SearchFeed() {
  const searchParams = useSearchParams()
  const router = useRouter()
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
          `/api/search?q=${encodeURIComponent(q)}&page=${currentPage}&limit=${blogsPerPage}`
        )
        const data = await res.json()
        
        if (data.success) {
          setBlogs(data.data)
          setTotalPages(Math.ceil(data.total / blogsPerPage))
        } else {
          setBlogs([])
        }
      } catch (error) {
        console.error('Search error:', error)
        setBlogs([])
      } finally {
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    fetchSearchResults()
  }, [q, currentPage])

  // Handles clicking a tag inside the ContentCard from the Search page
  const handleTagSelect = (tag: string) => {
    // Navigates back to the main blog feed and filters by that tag
    router.push(`/blogs?tag=${encodeURIComponent(tag)}`)
  }

  if (!q) {
    return <p className="p-8 text-center text-gray-500">Please enter a search query.</p>
  }

  return (
    <section className={styles.contentFeed}>
      <h1 className="text-2xl font-semibold mb-6">
        Results for <span className="text-primary">&ldquo;{q}&rdquo;</span>
      </h1>

      <div className="grid gap-8">
        {/* Your exactly provided correct rendering block */}
        {loading ? (
          Array.from({ length: blogsPerPage }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <ContentCard
              key={blog._id}
              id={blog._id}
              slug={blog.slug?.current || blog._id}
              image={blog.thumbnail?.asset?.url}
              video={blog.video}
              date={blog.date || 'Unknown Date'}
              title={blog.title}
              description={blog.description}
              category={
                typeof blog.category === 'string'
                  ? blog.category
                  : blog.category?.title || 'General'
              }
              author={
                typeof blog.author === 'string'
                  ? blog.author
                  : blog.author?.name || 'Samuel Asimi'
              }
              tags={blog.tags || []}
              primaryAction="Read More"
              onTagClick={handleTagSelect}
            />
          ))
        ) : (
          <p className="text-gray-500 py-10">No blogs found for this filter.</p>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pager
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  )
}