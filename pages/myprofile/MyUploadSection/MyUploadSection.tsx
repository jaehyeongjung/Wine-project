import React, { useState } from 'react';
import styles from './MyUploadSection.module.css';
import useDevice from '@/hooks/useDevice';
import { symbol } from 'zod';

const MyUploadSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'comment' | 'wine'>('comment');
  const { mode } = useDevice();

  const handleTabChange = (tab: 'comment' | 'wine') => {
    setSelectedTab(tab);
  };

  return (
    <div
      className={`${styles.myUploadSection} ${styles[`myUploadSection_${mode}`]}`}
    >
      <div className={`${styles.myUploadBar} ${styles[`myUploadBar_${mode}`]}`}>
        <div
          className={`${styles.myUploadBarMenu} ${styles[`myUploadBarMenu_${mode}`]}`}
        >
          <div
            className={`${styles.myUploadBarMenuComment} ${styles[`myUploadBarMenuComment_${mode}`]} ${selectedTab === 'comment' ? styles.active : ''}`}
            onClick={() => handleTabChange('comment')}
          >
            <p
              className={`text-xl-bold ${styles.clickableText} ${styles[`clickableText_${mode}`]}`}
            >
              내가 쓴 후기
            </p>
          </div>
          <div
            className={`${styles.myUploadBarMenuRegisterwine} ${styles[`myUploadBarMenuRegisterwine_${mode}`]}  ${selectedTab === 'wine' ? styles.active : ''}`}
            onClick={() => handleTabChange('wine')}
          >
            <p
              className={`text-xl-bold ${styles.clickableText} ${styles[`clickableText_${mode}`]}`}
            >
              내가 등록한 와인
            </p>
          </div>
        </div>
        <div
          className={`${styles.myUploadBarTotal} ${styles[`myUploadBarTotal_${mode}`]}`}
        >
          <p
            className={`${styles.myUploadBarTotalText} ${styles[`myUploadBarTotalText_${mode}`]}`}
          >
            총 12개
          </p>
        </div>
      </div>
      {selectedTab === 'comment' ? (
        <div className={`${styles.myComment} ${styles[`myComment_${mode}`]}`}>
          <div
            className={`${styles.myCommentMap} ${styles[`myCommentMap_${mode}`]}`}
          >
            <div
              className={`${styles.myCommentInner} ${styles[`myCommentInner_${mode}`]}`}
            >
              <div
                className={`${styles.myCommentInnerStarAndTimeContainer} ${styles[`myCommentInnerStarAndTimeContainer_${mode}`]}`}
              >
                <div
                  className={`${styles.myCommentInnerStarAndTime} ${styles[`myCommentInnerStarAndTime_${mode}`]}`}
                >
                  <div
                    className={`${styles.myCommentInnerStar} ${styles[`myCommentInnerStar_${mode}`]}`}
                  >
                    <div
                      className={`${styles.myCommentInnerStarImg} ${styles[`myCommentInnerStarImg_${mode}`]}`}
                    >
                      <img src="/icons/starColor.svg"></img>
                    </div>
                    <p
                      className={`${styles.myCommentInnerStarNum} ${styles[`myCommentInnerStarNum_${mode}`]} text-2lg-bold`}
                    >
                      5.0
                    </p>
                  </div>
                  <p
                    className={`${styles.myCommentInnerTime} ${styles[`myCommentInnerTime_${mode}`]} text-lg-regular`}
                  >
                    10시간전
                  </p>
                </div>
                <div className={styles.myCommentInnerDropdown}>
                  <img src="/icons/dropDown.svg"></img>
                </div>
              </div>
              <div
                className={`${styles.myCommentInnerDeatail} ${styles[`myCommentInnerDetail_${mode}`]}`}
              >
                <p
                  className={`${styles.myCommentInnerDetailTitle} ${styles[`myCommentInnerDetailTitle_${mode}`]} text-lg-medium`}
                >
                  Sentinal Carbernet Sauvignon 2016
                </p>
                <p
                  className={`${styles.myCommentInnerDetailReview} ${styles[`myCommentInnerDetailReview_${mode}`]}`}
                >
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
        <div
          className={`${styles.RegisterwineContainer} ${styles[`RegisterwineContainer_${mode}`]}`}
        >
          <div
            className={`${styles.Registerwine} ${styles[`Registerwine_${mode}`]}`}
          >
            <div
              className={`${styles.RegisterwineMap} ${styles[`RegisterwineMap_${mode}`]}`}
            >
              <div
                className={`${styles.RegisterwineImg} ${styles[`RegisterwineImg_${mode}`]}`}
              >
                <img src="/images/testWine.svg"></img>
              </div>
              <div
                className={`${styles.RegisterwineData} ${styles[`RegisterwineData_${mode}`]}`}
              >
                <div
                  className={`${styles.RegisterwineDataText} ${styles[`RegisterwineDataText_${mode}`]}`}
                >
                  <div
                    className={`${styles.RegisterwineDataTextDetail} ${styles[`RegisterwineDataTextDetail_${mode}`]}`}
                  >
                    <div
                      className={`${styles.RegisterwineDataTextDetailTitle} ${styles[`RegisterwineDataTextDetailTitle_${mode}`]}`}
                    >
                      Sentinel Carbernet Sauvignon 2016
                    </div>
                    <div
                      className={`${styles.RegisterwineDataTextDetailFrom} ${styles[`RegisterwineDataTextDetailFrom_${mode}`]}`}
                    >
                      Western Cape, South Africa
                    </div>
                  </div>
                  <div
                    className={`${styles.RegisterwineDataTextDropdown} ${styles[`RegisterwineDataTextDropdown_${mode}`]}`}
                  >
                    <img src="/icons/dropDown.svg"></img>
                  </div>
                </div>
                <div
                  className={`${styles.RegisterwineDataPrice} ${styles[`RegisterwineDataPrice_${mode}`]}`}
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
