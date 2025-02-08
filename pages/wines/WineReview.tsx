import React from 'react';
import styles from './WineReview.module.css';

const WineReview: React.FC = () => {
  return (
    <div>
      <div className={styles.reviewBox}>
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
        <p>
          Deep maroon color, tasting notes of blackberry, dark chocolate, plum.
          Super jammy and bold with some smoky after notes. Big flavor. Amazing
          value (would pay three times the price for it), well balanced flavor.
          Could drink all day everyday with or without food. I need more
          immediately.
        </p>
      </div>
    </div>
  );
};

export default WineReview;
