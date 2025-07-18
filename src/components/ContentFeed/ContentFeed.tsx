'use client'

import { useState, useEffect } from 'react'
import ContentCard from '@/components/ContentCard/ContentCard'
import Pager from '@/components/Pager/Pager'
import TagFilter from '@/components/TagFilter/TagFilter'
import styles from './ContentFeed.module.css'

interface Blog {
  _id: string
  title: string
  description: string
  thumbnail?: { asset: { url: string } }
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

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs')
        const data = await res.json()
        if (data.success) {
          setBlogs(data.data)

          // Collect all tags, flatten, deduplicate, and add 'All' option
          const tags = data.data.flatMap((blog: Blog) => blog.tags) as string[]
          setUniqueTags(['All', ...Array.from(new Set(tags))])
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
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

      {filteredBlogs.map(blog => (
        <ContentCard
          key={blog._id}
          id={blog._id}
          image={blog.thumbnail?.asset?.url}
          video={blog.video}
          date={blog.date || 'Unknown Date'}
          title={blog.title}
          description={blog.description}
          category={
            typeof blog.category === 'string' ? blog.category : blog.category?.title || 'General'
          }
          author={typeof blog.author === 'string' ? blog.author : blog.author?.name || 'Unknown'}
          tags={blog.tags}
          primaryAction="Read More"
          onTagClick={setSelectedTag}
        />
      ))}

      <Pager />
    </section>
  )
}
