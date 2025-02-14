import React from 'react';
import styles from './wineDetailCard.module.css';
import useDevice from '../../../hooks/useDevice';
import Button from '../Button';
import router from 'next/router';

const DetailPage: React.FC = () => {
  const { mode } = useDevice();

  const wineData = {
    name: 'Ciel du Cheval Vineyard Collaboration Series II 2012',
    region: 'Western Cape, South Africa',
    price: 64990,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/686/1738855781446/type=image2.png',
  };

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
