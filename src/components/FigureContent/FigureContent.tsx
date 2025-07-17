import React from 'react'
import styles from './FigureContent.module.css'

interface FigureContentProps {
  image: string
  text: string
  tag?: string
}

export default function FigureContent({ image, text, tag }: FigureContentProps) {
  return (
    <div className={styles.figContent}>
      <div className={styles.figImg}>
        <img src={image} alt={text} />

        {tag && <div className={styles.figTag}>{tag}</div>}

        <div className={styles.figOverlay}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}
