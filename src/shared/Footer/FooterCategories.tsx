import React from 'react'
import Link from 'next/link'
import { groq } from 'next-sanity'
import { sanityClient } from '@/lib/sanityClient'
import styles from './Footer.module.css'

const FooterCategories = async () => {
  const query = groq`*[_type == "category"] | order(title asc)[0...12] {
    _id,
    title
  }`

  let categories = []
  try {
    categories = await sanityClient.fetch(query)
  } catch (e) {
    console.error(e)
  }

  return (
    <div className={styles.footer1Item}>
      <p className={styles.itemTopic}>Explore Categories</p>
      <ul className={styles.categoryFlex}>
        {categories.length > 0 ? (
          categories.map((cat: any) => (
            <li key={cat._id} className={styles.categoryChip}>
              <Link href={`/search?category=${encodeURIComponent(cat.title)}`}>
                <span>{cat.title}</span>
              </Link>
            </li>
          ))
        ) : (
          <li className={styles.categoryChip}>
            <Link href="/search?category=Recipes"><span>Recipes</span></Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default FooterCategories