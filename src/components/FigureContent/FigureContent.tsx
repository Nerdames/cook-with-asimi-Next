'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard'
import styles from './FigureContent.module.css'

interface FigureContentProps {
  image: string
  text: string
  tag?: string
  slug?: string
  loading?: boolean
  priority?: boolean
}

export default function FigureContent({
  image,
  text,
  tag,
  slug,
  loading = false,
  priority = false,
}: FigureContentProps) {
  
  if (loading) {
    return (
      <div className={styles.figContent}>
        <SkeletonCard />
      </div>
    )
  }

  // Define the core UI
  const content = (
    <div className={styles.figContent}>
      <div className={styles.figImg}>
        <Image
          src={image}
          alt={text}
          fill
          priority={priority}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 360px"
          className={styles.actualImage}
          quality={75}
        />

        {tag && <div className={styles.figTag}>{tag}</div>}

        <div className={styles.figOverlay}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )

  // If there is a slug, wrap the whole thing in a Link. 
  // We use "legacyBehavior" if you are on an older Next.js 13/14 version, 
  // but for Next.js 15, wrapping a div directly is fine as long as the Link is a block.
  return slug ? (
    <Link href={`/blogs/${slug}`} className={styles.linkWrap}>
      {content}
    </Link>
  ) : (
    content
  )
}