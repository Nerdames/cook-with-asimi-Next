'use client'

import { useState, useEffect } from 'react'
import ContentCard from '@/components/ContentCard/ContentCard'
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard'
import Pager from '@/components/Pager/Pager'
import TagFilter from '@/components/TagFilter/TagFilter'
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

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs')
        const data = await res.json()
        if (data.success) {
          setBlogs(data.data)

          const tags = data.data.flatMap((blog: Blog) => blog.tags)
          setUniqueTags(['All', ...Array.from(new Set(tags)) as string[]])
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const filteredBlogs =
    selectedTag === 'All'
      ? blogs
      : blogs.filter(blog => blog.tags.includes(selectedTag))

  return (
    <section className={styles.contentFeed}>
      <TagFilter
        tags={uniqueTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
      />

      {loading ? (
        // Render 4 placeholder skeleton cards while loading
        Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
      ) : (
        filteredBlogs.map(blog => (
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
            onTagClick={setSelectedTag}
          />
        ))
      )}

      {!loading && <Pager />}
    </section>
  )
}
