import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/layout/Header';
import styles from './detail.module.css';
import useDevice from '../../hooks/useDevice';
import WineReview from './WineReview';
import WineRating from './WineRating';
import WineDetailCard from './WineDetailCard';

const DetailPage: React.FC = () => {
  const router = useRouter();
  const { wineid } = router.query;
  const { mode } = useDevice();

  return (
    <div className={`${styles.container} ${styles[`container_${mode}`]}`}>
      <Header />
      <div className={`${styles.content} ${styles[`content_${mode}`]}`}>
        <WineDetailCard />
      </div>

      <div>
        <div className={styles.reviewContent}>
          <div>
            <p className={styles.reviewTitle}>리뷰 목록</p>
            <WineReview />
            <WineReview />
            <WineReview />
            <WineReview />
            <WineReview />
          </div>
          <div className={styles.reviewRating}>
            <WineRating />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
