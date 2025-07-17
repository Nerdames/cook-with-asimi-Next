'use client'


import ContentFeed from '@/components/ContentFeed/ContentFeed'
import styles from './Home.module.css'

export default function Home() {
  return (
    <main className={styles.homeMain}>
      
      <ContentFeed />
    </main>
  )
}
