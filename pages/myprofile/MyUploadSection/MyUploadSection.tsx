import React, { useState } from 'react';
import styles from './MyUploadSection.module.css';
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
        <div className={styles.myComment}>내가 쓴 후기 내용</div>
      ) : (
        <div className={styles.Registerwine}>내가 등록한 와인 목록</div>
      )}
    </div>
  );
};
export default MyUploadSection;
