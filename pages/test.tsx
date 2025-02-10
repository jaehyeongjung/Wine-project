import { useState } from 'react';
import Modal from '../components/common/Modal';
import DeleteModalLayout from '../components/layout/Modal/DeleteModalLayout';
import RegisterModalLayout from '../components/layout/Modal/RegisterModalLayout';
import Button from '../components/common/Button';
import styles from './test.module.css';
import Review from '../components/layout/Review';
import SliderGrop from '@/components/common/SliderGrop';

export default function test() {
  const [showModal, setShowModal] = useState(false);

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
      {/* <br />
      <div>
        <h1>와인 등록 모달 테스트</h1>
        <Button
          onClick={() => setShowModal(true)}
          type="default"
          size="width96x42"
          text="테스트"
          color="purple"
          textColor="white"
        />
        <Modal
          className={styles.registerModalBox}
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        >
          <RegisterModalLayout closeModal={() => setShowModal(false)} />
        </Modal>
      </div> */}
      <br />
      <div>
        <h1>리뷰 등록 모달 테스트</h1>
        <Button
          onClick={() => setShowModal(true)}
          type="default"
          size="width96x42"
          text="테스트"
          color="purple"
          textColor="white"
        />
        <Modal
          className={styles.reviewModalBox}
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          closeBtn={true}
        >
          <Review
            wineName={'Sentinel Carbernet Sauvignon 2016'}
            closeModal={() => setShowModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
}
