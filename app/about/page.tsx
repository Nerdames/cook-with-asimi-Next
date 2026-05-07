import Image from 'next/image'
import styles from './AboutPage.module.css'

export const metadata = {
  title: 'About | Cook with Asimi',
  description: 'Chef, Recipe developer, and Food storyteller.',
}

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      {/* Hero Banner */}
      <section className={styles.hero}>
       
        <div className={styles.heroText}>
          <p>The Heart Behind the Plate</p>
          <h1>Hi, I&apos;m Asimi</h1>
        </div>
      </section>

      {/* Profile / Bio */}
      <section className={styles.profile}>
        <div className={styles.avatarWrapper}>
          <Image
            src="/profileimage.jpg"
            alt="Asimi Profile"
            width={500}
            height={600}
            className={styles.avatar}
          />
        </div>

        <div className={styles.bio}>
          <h2>My Story</h2>
          <p>
            For me, food is more than just sustenance—it&apos;s a creative playground and a 
            vessel for memory. I started <strong>Cook with Asimi</strong> to bridge the gap between 
            complex culinary techniques and the home kitchen.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Whether it&apos;s a spicy West African stew or a delicate French pastry, 
            I believe every dish tells a story. I&apos;m here to help you write yours.
          </p>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className={styles.skills}>
        <h2>What We Create Here</h2>
        <div className={styles.skillGrid}>
          <div className={styles.skillCard}>
            <span className={styles.skillIcon}>📝</span>
            <h3>Culinary Stories</h3>
            <p>Deep dives into the history and culture behind your favorite ingredients.</p>
          </div>
          <div className={styles.skillCard}>
            <span className={styles.skillIcon}>🍽️</span>
            <h3>Soulful Recipes</h3>
            <p>Tested, approachable, and authentic dishes for every skill level.</p>
          </div>
          <div className={styles.skillCard}>
            <span className={styles.skillIcon}>🎥</span>
            <h3>Visual Guides</h3>
            <p>High-quality tutorials that make complex steps feel like a breeze.</p>
          </div>
        </div>
      </section>
    </main>
  )
}