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
  thumbnail: { asset: { url: string } }
  video: string
  tags: string[]
  date?: string
  author: string
  category: string
}

export default function ContentFeed() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedTag, setSelectedTag] = useState('All')
  const [uniqueTags, setUniqueTags] = useState<string[]>(['All'])

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch('/api/blogs')
      const data = await res.json()
      if (data.success) {
        setBlogs(data.data)

        const tags = data.data.flatMap((blog: Blog) => blog.tags)
        setUniqueTags(['All', ...Array.from(new Set(tags)) as string[]])
      }
    }
    fetchBlogs()
  }, [])

  const filteredData =
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

      {filteredData.map(blog => (
        <ContentCard
          key={blog._id}
          image={blog.thumbnail?.asset?.url}
          date={blog.date || 'Unknown Date'}
          title={blog.title}
          description={blog.description}
          category={blog.category || 'General'}
          author={blog.author || 'Unknown'}
          primaryAction="Read More"
        />
      ))}

      <Pager />
    </section>
  )
}
