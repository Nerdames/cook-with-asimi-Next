import { Navbar, Footer, ScrollToTop } from '@/shared';
import { SidebarWrapper } from '@/LayoutModules';
import type { Metadata, Viewport } from 'next'; // Import Viewport type
import './globals.css';

export const metadata: Metadata = {
  title: 'Cook With Asimi',
  description: 'Tasty recipes, cooking hacks, and mouth-watering food videos to inspire your next meal',
};

// Move viewport settings here
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className="container">
          <header>
            <Navbar />
          </header>

          <main>{children}</main>

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