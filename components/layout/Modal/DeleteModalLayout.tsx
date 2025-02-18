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
  console.log('wineId:', wineId); // wineId가 제대로 전달되는지 확인
  console.log('reviewId:', reviewId); // reviewId가 제대로 전달되는지 확인

  const handleRequest = async () => {
    try {
      if (wineId) {
        console.log('와인 삭제 시작:', wineId);
        await ProductDelete(wineId);
        console.log('와인 삭제 성공');
      }

      if (reviewId) {
        console.log('리뷰 삭제 시작:', reviewId);
        await ReviewDelete(reviewId);
        console.log('리뷰 삭제 성공');
      }

      console.log('모달 닫기 전에 호출');
      closeModal(); // 모달을 닫기 전에 로그 추가
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
