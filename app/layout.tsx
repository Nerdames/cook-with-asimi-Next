import './globals.css';
import { Navbar, Footer, ScrollToTop } from '@/shared';
import { SidebarWrapper } from '@/LayoutModules';
import 'boxicons/css/boxicons.min.css';

export const metadata = {
  title: 'Cook With Asimi',
  description: 'Tasty recipes, cooking hacks, and mouth-watering food videos to inspire your next meal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav>
            <Navbar />
          </nav>

          <header>{/* Optional */}</header>

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
