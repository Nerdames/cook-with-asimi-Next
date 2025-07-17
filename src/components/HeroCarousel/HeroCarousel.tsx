import styles from './HeroCarousel.module.css'

const posts = [
  {
    id: 1,
    title: 'Featured Post',
    description: 'This is a brief description of the featured post.',
    image: 'https://picsum.photos/800/400?random=1',
  },
  {
    id: 2,
    title: 'Hot Post 1',
    description: 'Brief description for hot post 1.',
    image: 'https://picsum.photos/400/200?random=2',
  },
  {
    id: 3,
    title: 'Hot Post 2',
    description: 'Brief description for hot post 2.',
    image: 'https://picsum.photos/400/200?random=3',
  },
]

export default function HeroCarousel() {
  return (
    <section className={styles.heroSection}>
      <h2 className={styles.heroTitle}>Featured & Hot Posts</h2>
      <div className={styles.heroCarouselGrid}>
        <div className={`${styles.featuredPost} ${styles.post}`}>
          <img src={posts[0].image} alt={posts[0].title} />
          <div className={styles.postOverlay}>
            <h2>{posts[0].title}</h2>
            <p>{posts[0].description}</p>
          </div>
        </div>

        <div className={styles.hotPosts}>
          {posts.slice(1).map(post => (
            <div key={post.id} className={`${styles.hotPost} ${styles.post}`}>
              <img src={post.image} alt={post.title} />
              <div className={styles.postOverlay}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
