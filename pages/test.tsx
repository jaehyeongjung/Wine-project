import { useState, useEffect } from 'react';
import useDevice from '@/hooks/useDevice';
import Modal from '../components/common/Modal';
import DeleteModalLayout from '../components/layout/Modal/DeleteModalLayout';
import RegisterModalLayout from '../components/layout/Modal/RegisterModalLayout';
import Button from '../components/common/Button';
import Review from '../components/layout/Modal/Review';
import SliderGrop from '@/components/common/Slider';
import styles from './test.module.css';
import BottomSheet from '@/components/common/BottomSheet';

export default function test() {
  const [showModal, setShowModal] = useState(false);
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [isScreen, setIsScreen] = useState(false);
  const { mode } = useDevice();

  // 창 크기 변경 감지
  useEffect(() => {
    if (typeof window === 'undefined') return; // 서버에서 실행되지 않도록 방어 코드 추가

    const checkScreenSize = () => {
      setIsScreen(window.innerWidth <= 375);
    };

    checkScreenSize(); // 초기 실행
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 버튼 클릭 시 모달 또는 바텀시트 열기
  const handleOpen = () => {
    if (isScreen) {
      setIsBottomSheet(true);
    } else {
      setShowModal(true);
    }
  };

  // 닫기 함수
  const handleClose = () => {
    setShowModal(false);
    setIsBottomSheet(false);
  };

  return (
    <div>
      <h1>삭제하기 버튼 모달 테스트</h1>
      <div>
        {/* <Button
          onClick={() => setShowModal(true)}
          type="default"
          size="width96x42"
          text="테스트"
          color="purple"
          textColor="white"
        />
        <Modal
          className={styles.deleteModalBox}
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        >
          <DeleteModalLayout closeModal={() => setShowModal(false)} />
        </Modal> */}
      </div>
      <br />
      <div>
        <h1>와인 등록 모달 테스트</h1>
        {/* <Button
          onClick={handleOpen}
          type="default"
          size="width96x42"
          text="테스트"
          color="purple"
          textColor="white"
        />
        {isScreen ? (
          <BottomSheet isBottomSheet={isBottomSheet}>
            <RegisterModalLayout isScreen closeModal={handleClose} />
          </BottomSheet>
        ) : (
          <Modal
            className={`${styles.registerModalBox} ${styles[`registerModalBox_${mode}`]}`}
            showModal={showModal}
            closeModal={handleClose}
          >
            <RegisterModalLayout isScreen closeModal={handleClose} />
          </Modal>
        )} */}
      </div>
      <br />
      <div>
        <h1>리뷰 등록 모달 테스트</h1>
        <Button
          onClick={handleOpen}
          type="default"
          size="width96x42"
          text="테스트"
          color="purple"
          textColor="white"
        />
        {isScreen ? (
          <BottomSheet
            closeBtn
            handleClose={handleClose}
            isBottomSheet={isBottomSheet}
          >
            <Review
              isScreen
              closeModal={handleClose}
              wineId={703}
              wineName={'Sentinel Carbernet Sauvignon 2016'}
            />
          </BottomSheet>
        ) : (
          <Modal
            className={`${styles.reviewModalBox} ${styles[`reviewModalBox_${mode}`]}`}
            showModal={showModal}
            closeModal={() => setShowModal(false)}
            closeBtn={true}
          >
            <Review
              isScreen
              closeModal={handleClose}
              wineId={703}
              wineName={'Sentinel Carbernet Sauvignon 2016'}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
