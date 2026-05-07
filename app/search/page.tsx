import { Suspense } from 'react'
import { SearchFeed } from '@/components'

export const revalidate = 60

export default function SearchPage() {
  return (
    // The fallback can be a spinner, a skeleton, or null
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchFeed />
    </Suspense>
  )
}