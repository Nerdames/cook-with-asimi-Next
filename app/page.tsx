'use client'

import { useEffect } from 'react'
import HeroCarousel from '@/components/HeroCarousel/HeroCarousel'
import Home from '@/components/Home/Home'

export default function Page() {
  useEffect(() => {
    // Scroll to top when component mounts
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
