import Link from 'next/link'
import styles from './BlogContentViewer.module.css'

interface BlogContentViewerProps {
  title: string
  date: string
  author: string
  description: string
  videoUrl?: string
  synopsis: string
  background: string
  alternativeTitles: string[]
  tags: string[]
  pictures: { title: string; image: string }[]
  related: { title: string; link: string }[]
}

export default function BlogContentViewer({
  title,
  date,
  author,
  description,
  videoUrl,
  synopsis,
  background,
  alternativeTitles,
  tags,
  pictures,
  related,
}: BlogContentViewerProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className={styles.viewer}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.meta}>
        By <strong>{author}</strong> | {formattedDate}
      </p>

      <p className={styles.description}>{description}</p>

      {videoUrl && (
        <div className={styles.videoSection}>
          <iframe
            src={videoUrl}
            title="Video Preview"
            width="100%"
            height="400"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      )}

      <section className={styles.section}>
        <h3>Synopsis</h3>
        <p>{synopsis}</p>
      </section>

      <section className={styles.section}>
        <h3>Background</h3>
        <p>{background}</p>
      </section>

      {alternativeTitles.length > 0 && (
        <section className={styles.section}>
          <h4>Alternative Titles</h4>
          <p>{alternativeTitles.join(', ')}</p>
        </section>
      )}

      {tags.length > 0 && (
        <section className={styles.section}>
          <h4>Tags</h4>
          <div className={styles.tags}>
            {tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </section>
      )}

      {pictures.length > 0 && (
        <section className={styles.section}>
          <h4>Gallery</h4>
          <div className={styles.gallery}>
            {pictures.map((pic, idx) => (
              <div key={idx} className={styles.pictureItem}>
                <img src={pic.image} alt={pic.title} />
                <small>{pic.title}</small>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className={styles.section}>
          <h4>Related Posts</h4>
          <ul className={styles.relatedList}>
            {related.map((rel, idx) => (
              <li key={idx}>
                <Link href={rel.link}>{rel.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
