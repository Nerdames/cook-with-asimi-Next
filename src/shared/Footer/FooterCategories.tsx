import React from 'react'
import Link from 'next/link'
import { groq } from 'next-sanity'
import { sanityClient } from '@/lib/sanityClient'
import styles from './Footer.module.css'

// 1. Define the interface to replace 'any'
interface Category {
  _id: string
  title: string
}

const FooterCategories = async () => {
  const query = groq`*[_type == "category"] | order(title asc)[0...12] {
    _id,
    title
  }`

  // 2. Explicitly type the array
  let categories: Category[] = []
  
  try {
    categories = await sanityClient.fetch(query)
  } catch (error) {
    // Silently log or handle error to prevent the entire footer from crashing
    console.error("Sanity Fetch Error (Footer):", error)
  }

  return (
    <div className={styles.footer1Item}>
      <p className={styles.itemTopic}>Explore Categories</p>
      <ul className={styles.categoryFlex}>
        {categories.length > 0 ? (
          categories.map((cat: Category) => ( // 3. Use the Category type here
            <li key={cat._id} className={styles.categoryChip}>
              <Link href={`/search?category=${encodeURIComponent(cat.title)}`}>
                <span>{cat.title}</span>
              </Link>
            </li>
          ))
        ) : (
          /* Fallback if no categories are returned from Sanity */
          <li className={styles.categoryChip}>
            <Link href="/search?category=Recipes">
              <span>Recipes</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default FooterCategories