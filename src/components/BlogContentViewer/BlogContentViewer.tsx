import Link from 'next/link'
import styles from './BlogContentViewer.module.css'

// You may want to add a PortableText renderer if you want to render the `body` content properly
import { PortableText } from '@portabletext/react'  

interface BlogContentViewerProps {
  title: string
  date: string
  author: { name: string }
  category: { title: string }
  description: string
  video?: string
  body: any[]  // Portable Text block content from Sanity
  tags: string[]
  thumbnail?: { asset: { url: string } }
  related?: { title: string; _id: string }[]
}

export default function BlogContentViewer({
  title,
  date,
  author,
  category,
  description,
  video,
  body,
  tags,
  thumbnail,
  related = [],
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
        By <strong>{author?.name}</strong> in <em>{category?.title}</em> | {formattedDate}
      </p>

      {thumbnail?.asset?.url && (
        <img className={styles.thumbnail} src={thumbnail.asset.url} alt={title} />
      )}

      <p className={styles.description}>{description}</p>

      {video && (
        <div className={styles.videoSection}>
          <iframe
            src={video}
            title="Video Preview"
            width="100%"
            height="400"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      )}

      <section className={styles.section}>
        <h3>Content</h3>
        {/* Render Portable Text body content */}
        <PortableText value={body} />
      </section>

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

      {related.length > 0 && (
        <section className={styles.section}>
          <h4>Related Posts</h4>
          <ul className={styles.relatedList}>
            {related.map((rel, idx) => (
              <li key={idx}>
                <Link href={`/blogs/${rel._id}`}>{rel.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
