import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderWithProfile from '../../components/layout/Header/HeaderWithProfile';
import styles from '../../components/common/wines/detail.module.css';
import useDevice from '../../hooks/useDevice';
import WineReview from '../../components/common/wines/WineReview';
import WineRating from '../../components/common/wines/WineRating';
import WineDetailCard from '../../components/common/wines/WineDetailCard';

const DetailPage: React.FC = () => {
  const router = useRouter();
  const { mode } = useDevice();
  const [userImage, setUserImage] = useState('/images/wineProfile.svg');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token && !isRedirected) {
      setIsRedirected(true);
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router, isRedirected]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`${styles.container} ${styles[`container_${mode}`]}`}>
      <HeaderWithProfile imageUrl={userImage} />
      <div className={`${styles.content} ${styles[`content_${mode}`]}`}>
        <WineDetailCard />
      </div>

      <div
        className={`${styles.reviewContent} ${styles[`reviewContent_${mode}`]}`}
      >
        {(mode === 'tablet' || mode === 'mobile') && <WineRating />}

        <div className={styles.reviewBox}>
          <p
            className={`${styles.reviewTitle} ${styles[`reviewTitle_${mode}`]}`}
          >
            리뷰 목록
          </p>
          <WineReview />
        </div>

        {mode === 'desktop' && <WineRating />}
      </div>
    </div>
  );
};

export default DetailPage;
