import Link from 'next/link'
import styles from './ContentCard.module.css'

interface ContentCardProps {
  id: string
  image?: string
  video?: string
  date: string
  title: string
  description: string
  primaryAction: string
  category: string
  author: string
  tags: string[]
  onTagClick?: (tag: string) => void
}

export default function ContentCard({
  id,
  image,
  video,
  date,
  title,
  description,
  primaryAction,
  category,
  author,
  tags,
  onTagClick,
}: ContentCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className={styles.contentCard}>
      <div className={styles.contentImage}>
        {image ? (
          <img src={image} alt={title} />
        ) : video ? (
          <iframe
            src={video}
            title={title}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className={styles.noPreview}>No preview available</div>
        )}
      </div>

      <div className={styles.contentText}>
        <div className={styles.contentHeader}>
          <p className={styles.contentCategory}>{category}</p>

          <h5 className={styles.contentTitle}>
            <Link href={`/blogs/${id}`}>{title}</Link>
          </h5>

          <p className={styles.contentMeta}>
            <small>By <span>{author}</span> on <span>{formattedDate}</span></small>
          </p>
        </div>

        <div className={styles.contentDescription}>
          <p>{description}</p>
        </div>

        {tags.length > 0 && (
          <div className={styles.contentTags}>
            <ul>
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className={styles.tag}
                  onClick={() => onTagClick?.(tag)}
                  style={{ cursor: onTagClick ? 'pointer' : 'default' }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.contentFooter}>
          <Link href={`/blogs/${id}`}>
            <button>{primaryAction}</button>
          </Link>
        </div>
      </div>
    </article>
  )
}
