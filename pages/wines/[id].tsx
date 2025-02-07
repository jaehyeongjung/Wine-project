import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/layout/Header';
import styles from './detail.module.css';
import useDevice from '../../hooks/useDevice';

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
        <p className={styles.descripotion}>Western Cape, South Africa</p>
        <p className={styles.price}>￦ 64,990</p>
      </div>
      <div className={`${styles.review} ${styles[`review_${mode}`]}`}>
        <p>리뷰 목록</p>
      </div>
    </div>
  );
};

export default DetailPage;
