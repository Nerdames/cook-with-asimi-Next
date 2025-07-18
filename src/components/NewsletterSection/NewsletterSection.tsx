'use client'

import { useEffect, useState } from 'react'
import { sanityClient } from '@/lib/sanityClient'
import { groq } from 'next-sanity'
import styles from './NewsletterSection.module.css'

export default function NewsletterSection() {
  const [backgroundImage, setBackgroundImage] = useState<string>('')

  useEffect(() => {
    async function fetchThumbnails() {
      try {
        const query = groq`
          *[_type == "blog" && defined(thumbnail.asset->url)]{
            thumbnail { asset->{ url } }
          }
        `
        const data = await sanityClient.fetch(query)
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length)
          setBackgroundImage(data[randomIndex].thumbnail.asset.url)
        }
      } catch (err) {
        console.error('Failed to fetch thumbnails from Sanity', err)
      }
    }

    fetchThumbnails()
  }, [])

  return (
    <section
      className={styles.newsletterSection}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.overlay}>
        <div className={styles.textContent}>
          <h2>Join My Exclusive Cooking Newsletter</h2>
          <p>
            Get a taste of delicious updates! Join thousands of food lovers on my free email list.
            Be the first to receive new recipes, cooking tips, and exclusive kitchen hacks straight to your inbox.
          </p>

          <form className={styles.form}>
            <input type="text" placeholder="Your first name" required />
            <input type="email" placeholder="Your email address" required />

            <label className={styles.checkbox}>
              <input type="checkbox" required />
              <span>I agree to receive emails from Cook With Asimi.</span>
            </label>

            <button type="submit" className={styles.submitButton}>Yes, Sign Me Up</button>
          </form>

          <small className={styles.privacyNote}>We respect your privacy. You can unsubscribe anytime.</small>
        </div>
      </div>
    </section>
  )
}
