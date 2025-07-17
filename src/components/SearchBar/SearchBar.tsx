'use client';

import 'boxicons/css/boxicons.min.css';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.search}>
      <form action="">
        <div className={styles['form-input']}>
          <input type="text" placeholder="Search..." id="search-text" />
          <div className={styles['search-btn']}>
            <i className="bx bx-search"></i>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
