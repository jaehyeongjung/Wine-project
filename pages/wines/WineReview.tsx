import React, { useState } from 'react';
import SliderGroup from '../../components/common/SliderGroup';
import Modal from '../../components/common/Modal';
import styles from './WineReview.module.css';
import useDevice from '../../hooks/useDevice';

const WineReview: React.FC = () => {
  const { mode } = useDevice();
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div>
      <div
        className={`${styles.reviewBox} ${styles[`reviewBox_${mode}`]} ${expanded ? styles.expanded : ''}`}
      >
        <div className={styles.reviewHeader}>
          <div className={styles.profileBox}>
            <img
              className={`${styles.profile} ${styles[`profile_${mode}`]}`}
              src="/images/profile.svg"
              alt="profile"
            />
            <div className={styles.profileInfo}>
              <p className={`${styles.nickname} ${styles[`nickname_${mode}`]}`}>
                와인러버
              </p>
              <p className={`${styles.timeAgo} ${styles[`timeAgo_${mode}`]}`}>
                10시간 전
              </p>
            </div>
          </div>
          <div className={`${styles.iconBox} ${styles[`iconBox_${mode}`]}`}>
            <img
              className={`${styles.likeIcon} ${styles[`likeIcon_${mode}`]}`}
              src={liked ? '/icons/like.svg' : '/icons/empty-like.svg'}
              alt="like"
              onClick={handleLike}
            />
            <img
              className={`${styles.drop_btn} ${styles[`drop_btn_${mode}`]}`}
              src="/icons/dropDown.svg"
              alt="dropDown-btn"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>

        <div className={styles.infoBox}>
          <div className={`${styles.tagBox} ${styles[`tagBox_${mode}`]}`}>
            <span className={`${styles.tag} ${styles[`tag_${mode}`]}`}>
              체리
            </span>
            <span className={`${styles.tag} ${styles[`tag_${mode}`]}`}>
              카라멜
            </span>
            <span className={`${styles.tag} ${styles[`tag_${mode}`]}`}>
              시트러스
            </span>
          </div>
          <div
            className={`${styles.reviewRating} ${styles[`reviewRating_${mode}`]}`}
          >
            <img
              className={`${styles.ratingStars} ${styles[`ratingStars_${mode}`]}`}
              src="/icons/starColor.svg"
              alt="점수"
            />
            <span
              className={`${styles.ratingNum} ${styles[`ratingNum_${mode}`]}`}
            >
              5.0
            </span>
          </div>
        </div>

        {expanded && (
          <>
            <p className={`${styles.comment} ${styles[`comment_${mode}`]}`}>
              Deep maroon color, tasting notes of blackberry, dark chocolate,
              plum. Super jammy and bold with some smoky after notes. Big
              flavor. Amazing value (would pay three times the price for it),
              well balanced flavor. Could drink all day everyday with or without
              food. I need more immediately.
            </p>

            <SliderGroup
              values={{
                lightBold: 50,
                smoothTannic: 70,
                drySweet: 30,
                softAcidic: 20,
              }}
              disabled
            />
          </>
        )}

        <div className={styles.arrowContainer}>
          <img
            className={styles.arrowIcon}
            src={expanded ? '/icons/arrowUp.svg' : '/icons/arrowDown.svg'}
            alt={expanded ? '접기' : '열기'}
            onClick={() => setExpanded(!expanded)}
          />
        </div>
      </div>

      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div className={styles.option} onClick={() => alert('수정하기 테스트')}>
          수정하기
        </div>
        <div className={styles.option} onClick={() => alert('삭제하기 테스트')}>
          삭제하기
        </div>
      </Modal>
    </div>
  );
};

export default WineReview;
