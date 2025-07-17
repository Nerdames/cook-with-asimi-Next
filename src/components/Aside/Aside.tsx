import SearchBar from '@/components/SearchBar/SearchBar'
import FigureContent from '@/components/FigureContent/FigureContent'
import styles from './Aside.module.css'

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

export default function Aside() {
  return (
    <aside>
      <SearchBar />

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Recommended for You</legend>

        {figureItems.map(item => (
          <FigureContent
            key={item.id}
            image={item.image}
            text={item.text}
          />
        ))}
      </fieldset>
    </aside>
  )
}
