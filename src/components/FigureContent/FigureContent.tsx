'use client'

import React from 'react'
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard'
import styles from './FigureContent.module.css'

interface FigureContentProps {
  image: string
  text: string
  tag?: string
  loading?: boolean
}

export default function FigureContent({ image, text, tag, loading = false }: FigureContentProps) {
  if (loading) {
    return (
      <div className={styles.figContent}>
        <SkeletonCard />
      </div>
    )
  }

  return (
    <div className={styles.figContent}>
      <div className={styles.figImg}>
        <img src={image} alt={text} />

        {tag && <div className={styles.figTag}>{tag}</div>}

        <div className={styles.figOverlay}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}
