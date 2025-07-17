import styles from './ContentCard.module.css'

interface ContentCardProps {
  image: string
  date: string
  title: string
  description: string
  primaryAction: string
  category: string
  author: string
}

export default function ContentCard({
  image,
  date,
  title,
  description,
  primaryAction,
  category,
  author,
}: ContentCardProps) {

  return (
    <article className={styles.contentCard}>

      <div className={styles.contentImage}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.contentText}>
        <div className={styles.contentHeader}>
          <p className={styles.contentCategory}>{category}</p>

          <h5 className={styles.contentTitle}>
            <a href="#">{title}</a>
          </h5>

          <p className={styles.contentMeta}>
            <small>By <a href="#">{author}</a> on <a href="#">{date}</a></small>
          </p>
        </div>

        <div className={styles.contentDescription}>
          <p>{description}</p>
        </div>

        <div className={styles.contentFooter}>
          <button>{primaryAction}</button>

          <div className={styles.contentSocials}>
            <i className="bx bxl-facebook"></i>
            <i className="bx bxl-twitter"></i>
            <i className="bx bxl-youtube"></i>
          </div>
        </div>
      </div>

    </article>
  )
}
