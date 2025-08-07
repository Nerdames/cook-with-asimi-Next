// src/LayoutModules/Recomended/Recomended.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanityClient'
import { groq } from 'next-sanity'
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard'
import FigureContent from '@/components/FigureContent/FigureContent'
import styles from './Recomended.module.css'

interface RecommendedPost {
  _id: string
  title: string
  slug: string
  tags: string[]
  thumbnail?: { asset: { url: string } }
}

export default function Recomended() {
  const [recommended, setRecommended] = useState<RecommendedPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommended() {
      const query = groq`
        *[_type == "blog"] | order(date desc)[0...20] {
          _id,
          title,
          "slug": slug.current,
          tags,
          thumbnail { asset->{url} }
        }
      `
      try {
        const data: RecommendedPost[] = await sanityClient.fetch(query)
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 8)
        setRecommended(shuffled)
      } catch (err) {
        console.error('Failed to fetch recommended posts', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommended()
  }, [])

  return (
    <section className={styles.recomendedSection}>
      <h3 className={styles.title}>Recommended</h3>

      <div className={styles.figureContainer}>
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : recommended.map(item => (
              <FigureContent
                key={item._id}
                slug={item.slug}
                image={item.thumbnail?.asset.url || 'https://via.placeholder.com/140x100'}
                text={item.title}
                tag={item.tags[0] || undefined}
              />
            ))}
      </div>
    </section>
  )
}
