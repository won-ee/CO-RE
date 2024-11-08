import React from 'react';
import styles from './LoadingPage.module.css'; 

const LoadingPage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.divider} aria-hidden="true"></div>
        <p className={styles.loadingText} aria-label="Loading">
          <span className={styles.letter} aria-hidden="true">L</span>
          <span className={styles.letter} aria-hidden="true">o</span>
          <span className={styles.letter} aria-hidden="true">a</span>
          <span className={styles.letter} aria-hidden="true">d</span>
          <span className={styles.letter} aria-hidden="true">i</span>
          <span className={styles.letter} aria-hidden="true">n</span>
          <span className={styles.letter} aria-hidden="true">g</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
