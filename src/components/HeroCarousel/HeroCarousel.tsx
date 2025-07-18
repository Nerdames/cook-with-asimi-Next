'use client'

import { useEffect, useState } from 'react'
import { sanityClient } from '@/lib/sanityClient'
import { groq } from 'next-sanity'
import styles from './HeroCarousel.module.css'

interface BlogPost {
  _id: string
  title: string
  description: string
  thumbnail?: { asset: { url: string } }
}

export default function HeroCarousel() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const query = groq`
        *[_type == "blog"] | order(date desc)[0...3] {
          _id,
          title,
          description,
          thumbnail { asset->{ url } }
        }
      `
      try {
        const data: BlogPost[] = await sanityClient.fetch(query)
        setPosts(data)
      } catch (err) {
        console.error('Failed to fetch hero carousel posts', err)
      }
    }

    fetchPosts()
  }, [])

  if (posts.length === 0) return <p>Loading posts...</p>

  return (
    <section className={styles.heroSection}>
      <h2 className={styles.heroTitle}>Featured & Hot Posts</h2>
      <div className={styles.heroCarouselGrid}>
        <div className={`${styles.featuredPost} ${styles.post}`}>
          <img
            src={posts[0].thumbnail?.asset.url || 'https://via.placeholder.com/800x400'}
            alt={posts[0].title}
          />
          <div className={styles.postOverlay}>
            <h2>{posts[0].title}</h2>
            <p>{posts[0].description}</p>
          </div>
        </div>

        <div className={styles.hotPosts}>
          {posts.slice(1).map(post => (
            <div key={post._id} className={`${styles.hotPost} ${styles.post}`}>
              <img
                src={post.thumbnail?.asset.url || 'https://via.placeholder.com/400x200'}
                alt={post.title}
              />
              <div className={styles.postOverlay}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
