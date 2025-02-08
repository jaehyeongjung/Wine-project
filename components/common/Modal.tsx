import { ReactNode } from 'react';
import Image from 'next/image';
import styles from './Modal.module.css';

interface Props {
  className?: string;
  showModal: boolean;
  closeModal: () => void;
  children?: ReactNode;
  closeBtn?: boolean;
}

const Modal = ({
  className,
  showModal,
  closeModal,
  children,
  closeBtn,
}: Props) => {
  if (!showModal) return null;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div
        className={`${styles.content} ${className || ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {closeBtn && (
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
      </div>
    </div>
  );
};

export default Modal;
