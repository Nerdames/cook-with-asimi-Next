'use client'

import HeroCarousel from '@/components/HeroCarousel/HeroCarousel'
import Home from '@/components/Home/Home'

export default function Page() {
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
