import { ReactNode } from 'react';
import styles from '@/styles/Modal.module.css';
import Image from 'next/image';
import Button from './Button';

interface Props {
  className?: string;
  showModal: boolean;
  closeModal: () => void;
  children?: ReactNode;
  clossBtn?: boolean;
}

const Modal = ({
  className,
  showModal,
  closeModal,
  children,
  clossBtn,
}: Props) => {
  if (!showModal) return null;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div
        className={`${styles.content} ${className || ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {clossBtn && (
          <Image
            className={styles.closeIcon}
            onClick={closeModal}
            src="/images/CloseIcon.svg"
            alt="닫기 이미지"
            width={13}
            height={13}
          />
        )}
        {children} {/* 모달 내부에 원하는 내용을 삽입 가능 */}
        <Button
          onClick={closeModal}
          type="default"
          size="width96x42"
          text="취소"
          color="lite_purple"
          textColor="purple"
        />
      </div>
    </div>
  );
};

export default Modal;
