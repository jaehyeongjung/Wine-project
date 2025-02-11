import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './BottomSheet.module.css';
import Image from 'next/image';

interface Props {
  children: ReactNode;
  isBottomSheet: boolean;
  handleClose?: () => void;
  closeBtn?: boolean;
}

const BottomSheet = ({
  children,
  isBottomSheet,
  handleClose,
  closeBtn,
}: Props) => {
  return (
    <div>
      <motion.div
        className={`${styles.container} ${styles.hiddenScrollbar}`}
        initial={{ y: '100%', opacity: 0 }} // 초기 상태
        animate={{
          y: isBottomSheet ? 0 : '100%',
          opacity: isBottomSheet ? 1 : 0,
        }} // 상태에 따라 이동
        transition={{ type: 'spring', stiffness: 300, damping: 30 }} // 애니메이션 속도와 스타일
      >
        <div className={styles.content}>
          {closeBtn && (
            <Image
              className={styles.closeIcon}
              onClick={handleClose}
              src="/images/CloseIcon.svg"
              alt="닫기 이미지"
              width={13}
              height={13}
            />
          )}{' '}
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default BottomSheet;
