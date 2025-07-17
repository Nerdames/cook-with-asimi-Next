import FooterCategories from '@/components/Footer/FooterCategories'
import FooterPages from '@/components/Footer/FooterPages'
import FooterSocials from '@/components/Footer/FooterSocials'
import Newsletter from '@/components/Footer/Newsletter/Newsletter'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer1}>
        <Newsletter />
        <FooterCategories />
        <FooterPages />
        <FooterSocials />
      </div>
      <div className={styles.footer2}>
        <p>&copy; {new Date().getFullYear()} Foodie Vlogs. All rights reserved.</p>
        <p>Built by James Orjiene</p>
      </div>
    </footer>
  )
}
