import React, { useState, useEffect } from 'react';
import styles from './wineDetailCard.module.css';
import useDevice from '../../../hooks/useDevice';
import Button from '../Button';
import { useRouter } from 'next/router';
import { getWineDetail } from '../../../pages/api/wines/wineReviewApi';

const DetailPage: React.FC = () => {
  const { mode } = useDevice();
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [wineData, setWineData] = useState<{
    name: string;
    region: string;
    price: number;
    image: string;
  } | null>(null);

  useEffect(() => {
    if (!router.isReady || !id) return;
    getWineDetail(id, router).then((data) => {
      if (data) {
        const { name, region, image, price } = data;
        setWineData({ name, region, image, price });
      }
    });
  }, [id, router.isReady]);

  if (!wineData) return <p>로딩 중...</p>;

  return (
    <div className={`${styles.container} ${styles[`container_${mode}`]}`}>
      <div className={`${styles.cardBox} ${styles[`cardBox_${mode}`]}`}>
        <div className={styles.imageContainer}>
          <img
            src={wineData.image}
            alt={wineData.name}
            className={`${styles.image} ${styles[`image_${mode}`]}`}
          />
        </div>
        <div className={`${styles.info} ${styles[`info_${mode}`]}`}>
          <p className={`${styles.wineName} ${styles[`wineName_${mode}`]}`}>
            {wineData.name}
          </p>
          <p
            className={`${styles.description} ${styles[`description_${mode}`]}`}
          >
            {wineData.region}
          </p>
          <p className={`${styles.price} ${styles[`price_${mode}`]}`}>
            ￦{wineData.price.toLocaleString()}
          </p>
        </div>
        <div className={styles.backButton}>
          <Button
            type="default"
            size="width40"
            color="lite_purple"
            textColor="purple"
            text="←"
            onClick={() => router.push('/wines')}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
