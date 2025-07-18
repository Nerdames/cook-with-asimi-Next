import styles from './SkeletonCard.module.css'

export default function SkeletonCard() {
  return (
    <article className={styles.skeletonCard}>
      <div className={styles.imageSkeleton} />

      <div className={styles.textSkeleton}>
        <div className={styles.headerSkeleton}>
          <div className={styles.categoryLine} />
          <div className={styles.titleLine} />
          <div className={styles.metaLine} />
        </div>

        <div className={styles.descriptionSkeleton}>
          <div className={styles.descriptionLine} />
          <div className={styles.descriptionLine} />
          <div className={styles.descriptionLineShort} />
        </div>

        <div className={styles.footerSkeleton}>
          <div className={styles.buttonSkeleton} />
          <div className={styles.socialIconsSkeleton}>
            <div className={styles.icon} />
            <div className={styles.icon} />
            <div className={styles.icon} />
          </div>
        </div>
      </div>
    </article>
  )
}
