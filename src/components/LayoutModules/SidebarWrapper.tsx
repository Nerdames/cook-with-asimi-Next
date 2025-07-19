'use client'

import { usePathname } from 'next/navigation'
import LayoutSidebar from './LayoutSidebar'

export default function SidebarWrapper() {
  const pathname = usePathname()
  let modules: Array<'recomended' | 'newsletter' | 'related'> = []

  if (pathname === '/' || pathname === '/blogs') {
    modules = ['recomended', 'newsletter']
  } else if (pathname.startsWith('/blogs/') && pathname !== '/blogs') {
    modules = ['related']
  }

  if (modules.length === 0) {
    console.log('No sidebar for:', pathname)
    return null
  }

  console.log('Sidebar modules for', pathname, modules)

  return <LayoutSidebar modules={modules} />
}
