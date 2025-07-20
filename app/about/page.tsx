import Image from 'next/image'
import styles from './AboutPage.module.css'

export const metadata = {
  title: 'About | Cook with Asimi',
  description: 'Get to know the creator of Cook with Asimi: a recipe and food storytelling platform.',
}

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <Image
          src="/profileimage.jpg" // ✅ Local image in /public
          alt="Asimi Profile Banner"
          className={styles.heroImage}
          width={1600}
          height={600}
          priority
        />
        <div className={styles.heroText}>
          <h1>Hi, I&apos;m Asimi 👩‍🍳</h1>
          <p>Home cook. Recipe developer. Food storyteller.</p>
        </div>
      </section>

      {/* Profile / Bio */}
      <section className={styles.profile}>
        <Image
          src="/profileimage.jpg"
          alt="Asimi Profile"
          width={150}
          height={150}
          className={styles.avatar}
        />

        <div className={styles.bio}>
          <h2>About Me</h2>
          <p>
            I&apos;m Asimi, and food is my creative playground. I started this platform to help people
            find joy in cooking simple, soulful dishes from around the world. From spicy stews to
            quick snacks, I&apos;m here to share recipes, techniques, and a love for storytelling through food.
          </p>
        </div>
      </section>

      {/* Skills / What I Do */}
      <section className={styles.skills}>
        <h2>What I Share</h2>
        <ul>
          <li>📝 Personal food blogs & experiences</li>
          <li>🍽️ Easy, authentic recipes</li>
          <li>🎥 Step-by-step cooking tutorials</li>
          <li>📸 Styled food photography</li>
          <li>📚 Meal planning tips & cultural deep-dives</li>
        </ul>
      </section>

      {/* Contact / Socials */}
      <section className={styles.contact}>
        <h2>Let&apos;s Connect</h2>
        <p>
          Have a recipe idea, collab request, or just want to say hi? Reach out!
        </p>
        <div className={styles.socials}>
          <a href="mailto:asimi@example.com">📧 Email</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">▶️ YouTube</a>
        </div>
      </section>
    </main>
  )
}
