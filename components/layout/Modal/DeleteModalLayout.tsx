import Button from '@/components/common/Button';
import styles from './DeleteModalLayout.module.css';
import { ProductDelete } from '@/pages/api/product';
import { ReviewDelete } from '@/pages/api/review';

interface Props {
  closeModal: () => void;
  wineId?: number;
  reviewId?: number;
}

const DeleteModalLayout = ({ closeModal, wineId, reviewId }: Props) => {
  const handleRequest = async () => {
    try {
      if (wineId) await ProductDelete(wineId);
      if (reviewId) await ReviewDelete(reviewId);
      closeModal();
    } catch (error: any) {
      console.error('삭제 오류:', error.response?.data || error.message);
    }
  };

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
          onClick={handleRequest}
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

export default DeleteModalLayout;
