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

      <div
        className={`${styles.reviewContent} ${styles[`reviewContent_${mode}`]}`}
      >
        {/* 태블릿, 모바일에서는 WineRating을 위로 이동 */}
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

        {/* 데스크톱에서는 기존 순서 유지 */}
        {mode === 'desktop' && <WineRating />}
      </div>
    </div>
  );
};

export default DetailPage;
