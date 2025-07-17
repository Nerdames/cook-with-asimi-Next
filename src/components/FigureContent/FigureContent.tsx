import React from 'react'
import styles from './FigureContent.module.css'

interface FigureContentProps {
  image: string
  text: string
}

export default function FigureContent({ image, text }: FigureContentProps) {
  return (
    <div className={styles.figContent}>
      <div className={styles.figImg}>
        <img src={image} alt={text} />
      </div>
      <div className={styles.figBrief}>
        <p>{text}</p>
      </div>
    </div>
  )
}
