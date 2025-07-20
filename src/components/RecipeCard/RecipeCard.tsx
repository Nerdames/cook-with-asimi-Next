'use client'

import Link from 'next/link'
import styles from './RecipeCard.module.css'

export type RecipeCardProps = {
  _id: string
  title: string
  description: string
  slug: { current: string }
  mainImage?: { asset?: { url: string } }
  cookingTime?: number
  categories?: { _id: string; title: string }[]
}

export default function RecipeCard({
  _id,
  title,
  description,
  slug,
  mainImage,
  cookingTime,
  categories = [],
}: RecipeCardProps) {
  if (!slug?.current) return null

  return (
    <Link href={`/recipes/${slug.current}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {categories?.[0]?.title && (
          <span className={styles.tag}>{categories[0].title}</span>
        )}
        <div className={styles.imageWrapper}>
          {mainImage?.asset?.url ? (
            <img
              src={mainImage.asset.url}
              alt={title}
              loading="lazy"
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder}>No Image</div>
          )}
          <div className={styles.overlay}>
            <p>{description}</p>
          </div>
        </div>
      </div>

      <div className={styles.meta}>
        <h3 className={styles.title}>{title}</h3>
        {cookingTime && <span className={styles.time}>⏱ {cookingTime} mins</span>}
      </div>
    </Link>
  )
}
