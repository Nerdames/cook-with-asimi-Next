'use client'

import styles from './RelatedTopics.module.css'

export default function RelatedTopics() {
  return (
    <section className={styles.relatedTopics}>
      <h2 className={styles.title}>Related Topics</h2>
      <ul className={styles.topicList}>
        <li className={styles.topicItem}>Healthy Eating</li>
        <li className={styles.topicItem}>Quick Snacks</li>
        <li className={styles.topicItem}>Budget Meals</li>
      </ul>
    </section>
  )
}
