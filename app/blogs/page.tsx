'use client'

import '../globals.css'
import ContentFeed from '@/components/ContentFeed/ContentFeed'

export default function BlogsPage() {
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
