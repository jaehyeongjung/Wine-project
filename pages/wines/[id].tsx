import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/layout/Header';
import styles from './detail.module.css';
import useDevice from '../../hooks/useDevice';
import WineReview from './WineReview';
import WineRating from './WineRating';

const DetailPage: React.FC = () => {
  const router = useRouter();
  const { wineid } = router.query;
  const { mode } = useDevice();

  return (
    <div className={`${styles.container} ${styles[`container_${mode}`]}`}>
      <Header />
      <div className={`${styles.content} ${styles[`content_${mode}`]}`}>
        <h1>
          Sentinel Carbernet
          <br />
          Sauvignon 2016
        </h1>
        <p className={styles.description}>Western Cape, South Africa</p>
        <p className={styles.price}>￦ 64,990</p>
      </div>

      <div>
        <div className={styles.reviewContent}>
          <div className={styles.reviewList}>
            <p className={styles.reviewTitle}>리뷰 목록</p>
            <WineReview />
          </div>
          <div className={styles.reviewRating}>
            <WineRating rating={4.8} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
