'use client'

import { useState, useEffect } from 'react'
import ContentCard from '@/components/ContentCard/ContentCard'
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard'
import Pager from '@/components/Pager/Pager'
import TagFilter from '@/shared/TagFilter/TagFilter'
import styles from './ContentFeed.module.css'

interface Blog {
  _id: string
  slug: { current: string }
  title: string
  description: string
  thumbnail?: { asset?: { url?: string } }
  video?: string
  tags: string[]
  date?: string
  author: { name: string } | string
  category: { title: string } | string
}

export default function ContentFeed() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedTag, setSelectedTag] = useState('All')
  const [uniqueTags, setUniqueTags] = useState<string[]>(['All'])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedCategory, setSelectedCategory] = useState('')

  const blogsPerPage = 6

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams()
        queryParams.set('page', currentPage.toString())
        queryParams.set('limit', blogsPerPage.toString())
        if (selectedTag !== 'All') queryParams.set('tag', selectedTag)
        if (searchQuery) queryParams.set('search', searchQuery)
        if (sortOrder) queryParams.set('sort', sortOrder)
        if (selectedCategory) queryParams.set('category', selectedCategory)

        const res = await fetch(`/api/blogs?${queryParams.toString()}`)
        const data = await res.json()

        if (data.success && Array.isArray(data.data)) {
          const allBlogs = data.data
          setTotalPages(Math.ceil(data.total / blogsPerPage))
          setBlogs(allBlogs)

          if (selectedTag === 'All') {
            const tags = allBlogs.flatMap((blog: Blog) => blog.tags || [])
            const unique = Array.from(new Set(tags))
            setUniqueTags(['All', ...Array.from(new Set(tags as string[]))])
          }
        } else {
          console.error('Unexpected API response:', data)
          setBlogs([])
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [currentPage, selectedTag, searchQuery, sortOrder, selectedCategory])

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag)
    setCurrentPage(1)
  }

  return (
    <section className={styles.contentFeed}>
      <TagFilter
        tags={uniqueTags}
        selectedTag={selectedTag}
        onSelectTag={handleTagSelect}
      />

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
        <p>No blogs found for this filter.</p>
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
