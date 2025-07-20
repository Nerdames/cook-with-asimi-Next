'use client'

import { useEffect } from 'react'
import { HeroCarousel, Home } from '@/components'

export default function Page() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <header>
        <HeroCarousel />
      </header>

      <main>
        <Home />
      </main>
    </>
  )
}
