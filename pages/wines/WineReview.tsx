import React, { useState } from 'react';
import SliderGroup from '../../components/common/SliderGroup';
import Modal from '../../components/common/Modal';
import styles from './WineReview.module.css';
import useDevice from '../../hooks/useDevice';
import { likeReview } from '../api/like';

const WineReview: React.FC = () => {
  const { mode } = useDevice();
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const sliders = {
    lightBold: 50,
    smoothTannic: 70,
    drySweet: 30,
    softAcidic: 20,
  };

  const handleLike = async () => {
    if (liked) return;

    const response = await likeReview(1);
    if (response) {
      setLiked(true);
    }
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

        <div className={styles.tagBox}>
          <span>체리</span>
          <span>오크</span>
        </div>

        <p className={`${styles.comment} ${styles[`comment_${mode}`]}`}>
          Deep maroon color, tasting notes of blackberry, dark chocolate, plum.
          Super jammy and bold with some smoky after notes. Big flavor. Amazing
          value (would pay three times the price for it), well balanced flavor.
          Could drink all day everyday with or without food. I need more
          immediately.
        </p>

        {expanded && <SliderGroup values={sliders} disabled />}
        <div className={styles.arrowContainer}>
          {!expanded ? (
            <img
              className={styles.arrowIcon}
              src="/icons/arrowDown.svg"
              alt="열기"
              onClick={() => setExpanded(true)}
            />
          ) : (
            <img
              className={styles.arrowIcon}
              src="/icons/arrowUp.svg"
              alt="접기"
              onClick={() => setExpanded(false)}
            />
          )}
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
