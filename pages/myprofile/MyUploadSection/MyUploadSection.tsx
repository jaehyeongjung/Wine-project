import React from 'react';
import styles from './MyUploadSection.module.css';
const MyUploadSection: React.FC = () => (
  <div className={styles.myUploadSection}>
    <div className={styles.myUploadBar}>
      <div className={styles.myUploadBarMenu}>
        <div className={styles.myUploadBarMenuComment}>
          <p className="text-xl-bold">내가 쓴 후기</p>
        </div>
        <div className={styles.myUploadBarMenuRegisterwine}>
          <p className="text-xl-bold">내가 등록한 와인</p>
        </div>
      </div>
      <div className={styles.myUploadBarTotal}>
        <p className="text-md-regular">총 12개</p>
      </div>
    </div>
    <div></div>
  </div>
);

export default MyUploadSection;
