import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/layout/Header';
import styles from '../../components/common/wines/detail.module.css';
import useDevice from '../../hooks/useDevice';
import WineReview from '../../components/common/wines/WineReview';
import WineRating from '../../components/common/wines/WineRating';
import WineDetailCard from '../../components/common/wines/WineDetailCard';

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

      <div
        className={`${styles.reviewContent} ${styles[`reviewContent_${mode}`]}`}
      >
        {(mode === 'tablet' || mode === 'mobile') && <WineRating />}

        <div>
          <p
            className={`${styles.reviewTitle} ${styles[`reviewTitle_${mode}`]}`}
          >
            리뷰 목록
          </p>
          <WineReview />
          <WineReview />
          <WineReview />
        </div>

        {mode === 'desktop' && <WineRating />}
      </div>
    </div>
  );
};

export default DetailPage;
