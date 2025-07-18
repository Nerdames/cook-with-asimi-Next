import React from "react";
import SearchBar from '@/components/SearchBar/SearchBar'
import styles from "./TagFilter.module.css";

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags = [], selectedTag, onSelectTag }) => {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  return (
    <div className={styles.tagFilterContainer}>

      <div className={styles.filterLeft}>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"  // prevents accidental form submits if inside a form
            className={selectedTag === tag ? styles.active : ""}
            onClick={() => onSelectTag(tag)}
            aria-pressed={selectedTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className={styles.filterRight}>
        <SearchBar />
      </div>

    </div>
  );
};

export default TagFilter;
