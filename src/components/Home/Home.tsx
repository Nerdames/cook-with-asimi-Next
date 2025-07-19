'use client'

import ContentFeed from '@/components/ContentFeed/ContentFeed'
import NewsletterSection from '@/components/NewsletterSection/NewsletterSection'
import styles from './Home.module.css'

export default function Home() {
  return (
    <main className={styles.homeMain}>
      <ContentFeed />
      <NewsletterSection />
    </main>
  )
}
