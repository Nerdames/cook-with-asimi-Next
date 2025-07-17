import React from "react";
import styles from "./TagFilter.module.css";

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags = [], selectedTag, onSelectTag }) => {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  return (
    <div className={styles.tagFilter}>
      {tags.map((tag) => (
        <button
          key={tag}
          className={selectedTag === tag ? styles.active : ""}
          onClick={() => onSelectTag(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
