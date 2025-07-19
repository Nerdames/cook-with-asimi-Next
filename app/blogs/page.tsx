'use client'

import '../globals.css'
import ContentFeed from '@/components/ContentFeed/ContentFeed'
import { useEffect } from 'react'

export default function BlogsPage() {
  // Scroll to top when this page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <header>
        <div className="headerTopic">
          <h1>Blogs</h1>
        </div>
      </header>

      <main>
        <ContentFeed />
      </main>
    </>
  )
}
