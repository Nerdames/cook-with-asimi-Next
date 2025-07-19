'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'
import Logo from '@/components/Logo/Logo'
import clsx from 'clsx'

// ✅ Import Boxicons CSS
import 'boxicons/css/boxicons.min.css'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/recipes', label: 'Recipes' },
  { path: '/blogs', label: 'Blogs' },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isFixed, setIsFixed] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsFixed(currentScrollY > 150)
      setShowNavbar(currentScrollY < lastScrollY.current || currentScrollY < 50)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)

  return (
    <div
      className={clsx(
        styles.nav,
        isFixed ? styles.fixed : styles.sticky,
        showNavbar ? styles.visible : styles.hidden
      )}
    >
      <div className={styles.navLeft}>
        <Logo />
      </div>

      <div className={clsx(styles.navCenter, isMobileMenuOpen && styles.mobileOpen)}>
        <ul className={clsx(styles.pages, isMobileMenuOpen && styles.mobileOpen)}>
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <Link
                href={path}
                className={clsx(
                  pathname === path && 'active' // Use global .active class in CSS
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.navRight}>
        <button
          className={styles.mobileToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          <i
            className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu'}`}
            style={{ fontSize: '24px' }}
          ></i>
        </button>
      </div>
    </div>
  )
}
