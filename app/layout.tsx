import { Navbar, Footer, ScrollToTop } from '@/shared';
import { SidebarWrapper } from '@/LayoutModules';
import type { Metadata } from 'next';
import './globals.css';

// Use the Metadata type for better IntelliSense and build stability
export const metadata: Metadata = {
  title: 'Cook With Asimi',
  description: 'Tasty recipes, cooking hacks, and mouth-watering food videos to inspire your next meal',
  viewport: 'width=device-width, initial-scale=1', // Good for mobile production
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* 
        Add suppressHydrationWarning if you use themes or 
        browser-specific attributes to prevent hydration mismatch errors 
      */}
      <body suppressHydrationWarning>
        <div className="container">
          <header>
            <Navbar />
          </header>

          <main>{children}</main>

          {/* Sidebar is usually inside <main> or handled via CSS grid */}
          <aside>
            <SidebarWrapper />
          </aside>

          <ScrollToTop />

          <footer>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}