import React from 'react';
import SliderGrop from '../../components/common/SliderGrop';
import styles from './wineReview.module.css';
import useDevice from '../../hooks/useDevice';

const WineReview: React.FC = () => {
  const { mode } = useDevice();
  const sliders = [
    { label: '향', row: '약함', high: '강함', value: 50 },
    { label: '바디감', row: '가벼움', high: '무거움', value: 70 },
    { label: '단맛', row: '적음', high: '많음', value: 30 },
  ];

  return (
    <div>
      <div className={`${styles.reviewBox} ${styles[`reviewBox_${mode}`]}`}>
        <div className={styles.reviewHeader}>
          <div className={styles.profileBox}>
            <img
              className={styles.profile}
              src="/images/profile.svg"
              alt="profile"
            />
            <div className={styles.profileInfo}>
              <p className={styles.nickname}>와인러버</p>
              <p className={styles.timeAgo}>10시간 전</p>
            </div>
          </div>
          <div className={styles.iconBox}>
            <img
              className={styles.likeIcon}
              src="/icons/empty-like.svg"
              alt="empty-like"
            />
            <img src="/icons/ellipsis.svg" alt="ellipsis" />
          </div>
        </div>
        <div className={styles.tagBox}>
          <span>체리</span>
          <span>오크</span>
        </div>
        <p className={styles.comment}>
          Deep maroon color, tasting notes of blackberry, dark chocolate, plum.
          Super jammy and bold with some smoky after notes. Big flavor. Amazing
          value (would pay three times the price for it), well balanced flavor.
          Could drink all day everyday with or without food. I need more
          immediately.
        </p>
        <div className={styles.sliderSection}>
          <SliderGrop items={sliders} type={false} />
        </div>
      </div>
    </div>
  );
};

export default WineReview;
