'use client';

import React from 'react';
import styles from './SidebarToggleButton.module.css';

interface SidebarToggleButtonProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ isOpen, onOpen, onClose }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className={styles['sidebar-toggle-wrapper']}>
      {!isOpen ? (
        <div
          className={`${styles.showsidebar} ${styles['sidebar-open']}`}
          onClick={onOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyPress(e, onOpen)}
          aria-label="Open sidebar"
        >
          <i className={`bx bx-menu ${styles.icon}`}></i>
        </div>
      ) : (
        <div
          className={`${styles.showsidebar} ${styles['sidebar-close']}`}
          onClick={onClose}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyPress(e, onClose)}
          aria-label="Close sidebar"
        >
          <i className={`bx bx-x ${styles.icon}`}></i>
        </div>
      )}
    </div>
  );
};

export default SidebarToggleButton;
