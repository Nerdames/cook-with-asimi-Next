'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sanityClient } from '@/lib/sanityClient'
import { groq } from 'next-sanity'
import styles from './HeroCarousel.module.css'

interface BlogPost {
  _id: string
  slug: string
  title: string
  thumbnail?: { asset: { url: string } }
}

export default function HeroCarousel() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch posts
  useEffect(() => {
    let isMounted = true

    async function fetchPosts() {
      const query = groq`
        *[_type == "blog"] | order(date desc)[0...10] {
          _id,
          title,
          "slug": slug.current,
          thumbnail { asset->{ url } }
        }
      `
      try {
        const data: BlogPost[] = await sanityClient.fetch(query)
        if (isMounted) setPosts(data)
      } catch (err) {
        console.error('Failed to fetch hero carousel posts', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPosts()
    return () => { isMounted = false }
  }, [])

  // Auto-slide carousel
  useEffect(() => {
    if (posts.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % posts.length)
      }, 5000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [posts.length]) // Depend on length to avoid resetting interval on every state change

  const goToSlide = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrentSlide(index)
  }

  const nextSlide = () => goToSlide((currentSlide + 1) % posts.length)
  const prevSlide = () => goToSlide((currentSlide - 1 + posts.length) % posts.length)

  // Inline Skeleton: Mirrors the exact DOM structure to prevent layout shift
  if (loading || posts.length === 0) {
    const skeletonStyle = { backgroundColor: '#e5e7eb', borderRadius: '8px', minHeight: '100%' }
    
    return (
      <section className={styles.heroSection}>
        <h2 className={styles.heroTitle}>Featured & Hot Posts</h2>
        <div className={styles.heroCarouselGrid}>
          {/* Featured Skeleton */}
          <div className={styles.carouselWrapper} style={{ ...skeletonStyle, minHeight: '400px' }} />
          
          {/* Hot Posts Skeleton */}
          <div className={styles.hotPosts}>
            <div className={`${styles.hotPost} ${styles.hotPostTop}`} style={{ ...skeletonStyle, minHeight: '190px' }} />
            <div className={styles.hotPostBottom}>
              <div className={styles.hotPost} style={{ ...skeletonStyle, minHeight: '190px' }} />
              <div className={styles.hotPost} style={{ ...skeletonStyle, minHeight: '190px' }} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const featuredPost = posts[currentSlide]
  const hotPosts = posts.filter(post => post._id !== featuredPost._id)
  const hotPostsTop = hotPosts[0]
  const hotPostsBottom = hotPosts.slice(1, 3)

  return (
    <section className={styles.heroSection}>
      <h2 className={styles.heroTitle}>Featured & Hot Posts</h2>
      <div className={styles.heroCarouselGrid}>
        
        {/* Featured Carousel */}
        <div className={styles.carouselWrapper}>
          <Link
            href={`/blogs/${featuredPost.slug}`}
            className={`${styles.featuredPost} ${styles.post}`}
            key={featuredPost._id}
          >
            <Image
              src={featuredPost.thumbnail?.asset.url || 'https://via.placeholder.com/800x400'}
              alt={featuredPost.title}
              className={styles.carouselImage}
              width={800}
              height={400}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              priority
            />
            <div className={styles.featuredPostTitle}>
              <h2>{featuredPost.title}</h2>
            </div>
          </Link>

          {/* Arrows */}
          <div className={styles.navButtons}>
            <button onClick={prevSlide} aria-label="Previous slide">
              <i className="bx bx-chevron-left"></i>
            </button>
            <button onClick={nextSlide} aria-label="Next slide">
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            {posts.map((_, idx) => (
              <span
                key={idx}
                className={`${styles.dot} ${idx === currentSlide ? styles.activeDot : ''}`}
                onClick={() => goToSlide(idx)}
              />
            ))}
          </div>
        </div>

        {/* Hot Posts */}
        <div className={styles.hotPosts}>
          {hotPostsTop && (
            <Link
              href={`/blogs/${hotPostsTop.slug}`}
              className={`${styles.hotPost} ${styles.post} ${styles.hotPostTop}`}
              key={hotPostsTop._id}
            >
              <Image
                src={hotPostsTop.thumbnail?.asset.url || 'https://via.placeholder.com/400x200'}
                alt={hotPostsTop.title}
                width={400}
                height={200}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
              <div className={styles.postOverlay}>
                <h2 className={styles.hotPostTitle}>{hotPostsTop.title}</h2>
              </div>
            </Link>
          )}

          <div className={styles.hotPostBottom}>
            {hotPostsBottom.map(post => (
              <Link
                href={`/blogs/${post.slug}`}
                key={post._id}
                className={`${styles.hotPost} ${styles.post}`}
              >
                <Image
                  src={post.thumbnail?.asset.url || 'https://via.placeholder.com/400x200'}
                  alt={post.title}
                  width={400}
                  height={200}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <div className={styles.postOverlay}>
                  <h2 className={styles.hotPostTitle}>{post.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}