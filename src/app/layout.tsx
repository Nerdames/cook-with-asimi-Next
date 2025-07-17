import './globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Logo from '@/components/Logo/Logo'  // import Logo
import Aside from '@/components/Aside/Aside'
import Footer from '@/components/Footer/Footer'
import 'boxicons/css/boxicons.min.css'


export const metadata = {
  title: 'Cook With Asimi',
  description: 'Tasty recipes, cooking hacks, and mouth-watering food videos to inspire your next meal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav>
            <Navbar />
            <Logo />   {/* Logo just below Navbar */}
          </nav>

          <header>

          </header>

          {children}

          <aside>
            <Aside />
          </aside>

          <footer>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  )
}
