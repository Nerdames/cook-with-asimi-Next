'use client'

import React from 'react'
import styles from './SearchFilterToggleButton.module.css'

interface SearchFilterToggleButtonProps {
  isOpen: boolean
  toggleFilter: () => void
}

const SearchFilterToggleButton: React.FC<SearchFilterToggleButtonProps> = ({ isOpen, toggleFilter }) => {
  return (
    <div className={styles.searchFilterToggleWrapper}>
      <div
        className={styles.showfilter}
        onClick={toggleFilter}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleFilter()
        }}
        aria-label={isOpen ? 'Close search filter' : 'Open search filter'}
        title={isOpen ? 'Close Search' : 'Open Search'}
      >
        <i className="bx bx-search bx-sm"></i>
      </div>
    </div>
  )
}

export default SearchFilterToggleButton
