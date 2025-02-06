import Button from '@/pages/components/common/Button';
import styles from './DeleteModalLayout.module.css';

interface Props {
  closeModal: () => void;
}

const DeleteModalLayOut = ({ closeModal }: Props) => {
  return (
    <div>
      <div className={styles.deletTitle}>정말 삭제하시겠습니까?</div>
      <div className={styles.btnBox}>
        <Button
          onClick={closeModal}
          type="default"
          size="width156"
          text="취소"
          color="white"
          textColor="gray"
        />
        <Button
          type="default"
          size="width156"
          text="삭제하기"
          color="purple"
          textColor="white"
        />
      </div>
    </div>
  );
};

export default DeleteModalLayOut;
