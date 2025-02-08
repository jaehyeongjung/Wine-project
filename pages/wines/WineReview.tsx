import React from 'react';
import styles from './WineReview.module.css';

const WineReview: React.FC = () => {
  return (
    <div>
      <div className={styles.reviewBox}>
        <h1>Wine Review</h1>
        <p>This is the wine very good.</p>
      </div>
    </div>
  );
};

export default WineReview;
