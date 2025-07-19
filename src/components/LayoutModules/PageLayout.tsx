'use client'

import LayoutSidebar from './LayoutSidebar'

interface PageLayoutProps {
  children: React.ReactNode
  modules?: Array<'recomended' | 'newsletter' | 'related'>
}

export default function PageLayout({ children, modules = [] }: PageLayoutProps) {
  return (
    <div className="page-layout">
      <main>{children}</main>
      <aside>
        <LayoutSidebar modules={modules} />
      </aside>
    </div>
  )
}
