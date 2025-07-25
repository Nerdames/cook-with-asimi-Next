'use client'

import { useState, useEffect } from 'react'
import ContentCard from '@/components/ContentCard/ContentCard'
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard'
import Pager from '@/components/Pager/Pager'
import TagFilter from '@/shared/TagFilter/TagFilter'
import styles from './ContentFeed.module.css'

interface Blog {
  _id: string
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

  const blogsPerPage = 6

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: blogsPerPage.toString(),
          ...(selectedTag !== 'All' && { tag: selectedTag }),
        })

        const res = await fetch(`/api/blogs?${queryParams}`)
        const data = await res.json()

        if (data.success) {
          const allBlogs = data.data
          setTotalPages(Math.ceil(data.total / blogsPerPage))
          setBlogs(allBlogs)

          if (selectedTag === 'All') {
            const tags = allBlogs.flatMap((blog: Blog) => blog.tags)
            setUniqueTags(['All', ...Array.from(new Set(tags as string[]))])
          }
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [currentPage, selectedTag])

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag)
    setCurrentPage(1) // Reset to first page when a new tag is selected
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
      ) : (
        blogs.map((blog) => (
          <ContentCard
            key={blog._id}
            id={blog._id}
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
            tags={blog.tags}
            primaryAction="Read More"
            onTagClick={handleTagSelect}
          />
        ))
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
