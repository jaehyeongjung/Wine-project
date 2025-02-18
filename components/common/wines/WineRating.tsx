import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router';
import styles from './wineRating.module.css';
import useDevice from '../../../hooks/useDevice';
import { getWineDetail } from '../../../pages/api/wines/wineReviewApi';
import Button from '../Button';
import Review from '../../layout/Modal/Review';
import Modal from '@/components/common/Modal';
import BottomSheet from '@/components/common/BottomSheet';

const WineRating: React.FC = () => {
  const { mode } = useDevice(); // `mode`만 반환되므로 이 값을 활용
  const [wineData, setWineData] = useState<any>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const wineId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (typeof wineId === 'string') {
      getWineDetail(wineId, router).then((data) => {
        if (data) {
          setWineData(data);
        }
      });
    }
  }, [wineId, router]);

  const isMobile = mode === 'mobile';

  if (
    !wineData ||
    !wineData.avgRatings ||
    wineData.reviewCount === 0 ||
    wineData.avgRating === undefined
  ) {
    return null;
  }

  const { avgRating, reviewCount, avgRatings } = wineData;
  const totalRatings = Object.values(avgRatings).reduce(
    (acc: number, count) => acc + Number(count),
    0,
  );

  const getStars = (rating: number) => {
    const stars = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={i < stars ? '/icons/starColor.svg' : '/icons/star.svg'}
        alt={i < stars ? 'full star' : 'empty star'}
        className={`${styles.ratingStar} ${styles[`ratingStar_${mode}`]}`}
      />
    ));
  };

  const RatingBars = () => (
    <div className={`${styles.ratingBars} ${styles[`ratingBars_${mode}`]}`}>
      {Object.entries(avgRatings)
        .reverse()
        .map(([score, count]) => (
          <div key={score} className={styles.ratingBarRow}>
            <p className={styles.ratingScore}>{score}점</p>
            <div className={styles.ratingBarContainer}>
              <div
                className={styles.ratingBar}
                style={{
                  width: `${((Number(count) ?? 0) / totalRatings) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );

  const DesktopLayout = () => (
    <div className={styles.ratingBox}>
      <div className={styles.ratingStarsInfo}>
        <p className={styles.ratingAvg}>{avgRating.toFixed(1)}</p>
        <div className={styles.review_Star_box}>
          <div>{getStars(avgRating)}</div>
          <p className={styles.ratingCount}>{reviewCount}개의 후기</p>
        </div>
      </div>
      <RatingBars />
      <Button
        type="default"
        size="width113"
        color="purple"
        textColor="white"
        text="리뷰 남기기"
        onClick={() => setShowReviewModal(true)}
      />
    </div>
  );

  const TabletLayout = () => (
    <div className={`${styles.ratingBox} ${styles[`ratingBox_${mode}`]}`}>
      <div className={styles.leftBox}>
        <div className={styles.ratingAvgBox_tablet}>
          <p className={styles.ratingAvg}>{avgRating.toFixed(1)}</p>
          <div className={styles.review_Star_box}>
            <div>{getStars(avgRating)}</div>
            <p className={styles.ratingCount}>{reviewCount}개의 후기</p>
          </div>
        </div>
        <Button
          type="default"
          size="width113"
          color="purple"
          textColor="white"
          text="리뷰 남기기"
          onClick={() => setShowReviewModal(true)}
        />
      </div>
      <RatingBars />
    </div>
  );

  const MobileLayout = () => (
    <div className={styles.ratingBox}>
      <div className={`${styles.rating} ${styles[`rating_${mode}`]}`}>
        <div className={styles.test}>
          <p className={`${styles.ratingAvg} ${styles[`ratingAvg_${mode}`]}`}>
            {avgRating.toFixed(1)}
          </p>
          <div className={styles.review_Star_box}>
            <div>{getStars(avgRating)}</div>
            <p className={styles.ratingCount}>{reviewCount}개의 후기</p>
          </div>
        </div>
        <div>
          <Button
            type="default"
            size="width100"
            color="purple"
            textColor="white"
            text="리뷰 작성하기"
            onClick={() => setShowReviewModal(true)}
          />
        </div>
      </div>
      <RatingBars />
    </div>
  );

  const modal = showReviewModal
    ? ReactDOM.createPortal(
        <div>
          <div>
            {isMobile ? (
              <BottomSheet
                closeBtn
                handleClose={() => setShowReviewModal(false)}
                isBottomSheet={true}
              >
                <Review
                  closeModal={() => setShowReviewModal(false)}
                  reviewData={{
                    wineName: wineData.name,
                    wineId: Number(wineId),
                  }}
                  type="post"
                />
              </BottomSheet>
            ) : (
              <Modal
                className={`${styles.reviewModalBox} ${styles[`reviewModalBox_${mode}`]}`}
                showModal={showReviewModal}
                closeModal={() => setShowReviewModal(false)}
                closeBtn={true}
              >
                <Review
                  closeModal={() => setShowReviewModal(false)}
                  reviewData={{
                    wineName: wineData.name,
                    wineId: Number(wineId),
                  }}
                  type="post"
                />
              </Modal>
            )}
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <div className={`${styles.ratingBox} ${styles[`ratingBox_${mode}`]}`}>
      {mode === 'desktop' && <DesktopLayout />}
      {mode === 'tablet' && <TabletLayout />}
      {mode === 'mobile' && <MobileLayout />}
      {modal}
    </div>
  );
};

export default WineRating;
