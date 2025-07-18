import React from "react"
import SearchBar from '@/components/SearchBar/SearchBar'
import SkeletonButton from '@/components/SkeletonButton/SkeletonButton'
import styles from "./TagFilter.module.css"

interface TagFilterProps {
  tags: string[]
  selectedTag: string
  onSelectTag: (tag: string) => void
  loading?: boolean  // Add loading prop to control skeleton state
}

const TagFilter: React.FC<TagFilterProps> = ({ tags = [], selectedTag, onSelectTag, loading = false }) => {
  return (
    <div className={styles.tagFilterContainer}>
      
      <div className={styles.filterLeft}>
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonButton key={idx} />
            ))
          : tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={selectedTag === tag ? styles.active : ""}
                onClick={() => onSelectTag(tag)}
                aria-pressed={selectedTag === tag}
              >
                {tag}
              </button>
            ))
        }
      </div>

      <div className={styles.filterRight}>
        <SearchBar />
      </div>

    </div>
  )
}

export default TagFilter
