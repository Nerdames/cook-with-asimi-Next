import React from 'react'
import styles from './Footer.module.css'

const FooterSocials: React.FC = () => {
  return (
    <section className={styles.contact}>
      <h2>Let&apos;s Work Together</h2>
      <p>
        Currently open to collaborations, recipe development, and storytelling projects.
      </p>
      <div className={styles.socials}>
        <a href="mailto:asimi@example.com" className={styles.socialLink}>
          Email Me
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.socialLink}
        >
          Instagram
        </a>
        <a 
          href="https://youtube.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.socialLink}
        >
          YouTube
        </a>
      </div>
    </section>
  )
}

export default FooterSocials