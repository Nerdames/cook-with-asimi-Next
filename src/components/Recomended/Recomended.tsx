
import FigureContent from '@/components/FigureContent/FigureContent'
import styles from './Recomended.module.css'

const figureItems = [
  { id: 1, image: 'https://picsum.photos/140/100?random=1', text: "How to Clean Your Car's Undercarriage" },
  { id: 2, image: 'https://picsum.photos/140/100?random=2', text: "How to Clean Your Car's Undercarriage" },
  { id: 3, image: 'https://picsum.photos/140/100?random=3', text: "How to Clean Your Car's Undercarriage" },
  { id: 4, image: 'https://picsum.photos/140/100?random=4', text: "How to Clean Your Car's Undercarriage" },
  { id: 5, image: 'https://picsum.photos/140/100?random=5', text: "How to Clean Your Car's Undercarriage" },
  { id: 6, image: 'https://picsum.photos/140/100?random=6', text: "How to Clean Your Car's Undercarriage" },
  { id: 7, image: 'https://picsum.photos/140/100?random=7', text: "How to Clean Your Car's Undercarriage" },
  { id: 8, image: 'https://picsum.photos/140/100?random=8', text: "How to Clean Your Car's Undercarriage" },
]

export default function Recomended() {
  return (
    <section className={styles.recomendedSection}>

      <h3 className={styles.title}>Recommended for You</h3>

      <div className={styles.figureContainer}>
        {figureItems.map(item => (
          <FigureContent
            key={item.id}
            image={item.image}
            text={item.text}
          />
        ))}
      </div>
    </section>
  )
}
