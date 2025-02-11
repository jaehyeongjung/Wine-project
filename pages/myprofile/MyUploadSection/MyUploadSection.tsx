import React, { useState } from 'react';
import styles from './MyUploadSection.module.css';
import { symbol } from 'zod';
const MyUploadSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'comment' | 'wine'>('comment');

  const handleTabChange = (tab: 'comment' | 'wine') => {
    setSelectedTab(tab);
  };

  return (
    <div className={styles.myUploadSection}>
      <div className={styles.myUploadBar}>
        <div className={styles.myUploadBarMenu}>
          <div
            className={`${styles.myUploadBarMenuComment} ${selectedTab === 'comment' ? styles.active : ''}`}
            onClick={() => handleTabChange('comment')}
          >
            <p className={`text-xl-bold ${styles.clickableText}`}>
              내가 쓴 후기
            </p>
          </div>
          <div
            className={`${styles.myUploadBarMenuRegisterwine} ${selectedTab === 'wine' ? styles.active : ''}`}
            onClick={() => handleTabChange('wine')}
          >
            <p className={`text-xl-bold ${styles.clickableText}`}>
              내가 등록한 와인
            </p>
          </div>
        </div>
        <div className={styles.myUploadBarTotal}>
          <p className="text-md-regular">총 12개</p>
        </div>
      </div>
      {selectedTab === 'comment' ? (
        <div className={styles.myComment}>
          <div className={styles.myCommentMap}>
            <div className={styles.myCommentInner}>
              <div className={styles.myCommentInnerStarAndTimeContainer}>
                <div className={styles.myCommentInnerStarAndTime}>
                  <div className={styles.myCommentInnerStar}>
                    <div className={styles.myCommentInnerStarImg}>
                      <img src="/icons/starColor.svg"></img>
                    </div>
                    <p
                      className={`${styles.myCommentInnerStarNum} text-2lg-bold`}
                    >
                      5.0
                    </p>
                  </div>
                  <p className={`${styles.myCommentInnerTime} text-lg-regular`}>
                    10시간전
                  </p>
                </div>
                <div className={styles.myCommentInnerDropdown}>
                  <img src="/icons/dropDown.svg"></img>
                </div>
              </div>
              <div className={styles.myCommentInnerDeatail}>
                <p
                  className={`${styles.myCommentInnerDetailTitle} text-lg-medium`}
                >
                  Sentinal Carbernet Sauvignon 2016
                </p>
                <p className={styles.myCommentInnerDetailReview}>
                  Deep maroon color, tasting notes of blackberry, dark
                  chocolate, plum. Super jammy and bold with some smoky after
                  notes. Big flavor. Amazing value (would pay three times the
                  price for it), well balanced flavor. Could drink all day
                  everyday with or without food. I need more immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.RegisterwineContainer}>
          <div className={styles.Registerwine}>
            <div className={styles.RegisterwineMap}>
              <div className={styles.RegisterwineImg}>
                <img src="/images/testWine.svg"></img>
              </div>
              <div className={styles.RegisterwineData}>
                <div className={styles.RegisterwineDataText}>
                  <div className={styles.RegisterwineDataTextDetail}>
                    <div className={styles.RegisterwineDataTextDetailTitle}>
                      Sentinel Carbernet Sauvignon 2016
                    </div>
                    <div
                      className={`${styles.RegisterwineDataTextDetailFrom} text-lg-regular`}
                    >
                      Western Cape, South Africa
                    </div>
                  </div>
                  <div className={styles.RegisterwineDataTextDropdown}>
                    <img src="/icons/dropDown.svg"></img>
                  </div>
                </div>
                <div
                  className={`${styles.RegisterwineDataPrice} text-2lg-bold`}
                >
                  ₩ 64,990
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MyUploadSection;
