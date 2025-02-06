import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Modal from './components/common/Modal';
import Test from './components/layout/Test';
import Button from './components/common/Button';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Button Component Test</title>
      </Head>

      <h1>첫 페이지</h1>
      <div>
        <Button
          onClick={() => setShowModal(true)}
          type="default"
          size="width96x42"
          text="테스트"
          color="purple"
          textColor="white"
        />
        <Modal
          className={styles.modalBox}
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          clossBtn={true}
        >
          <Test />
        </Modal>
      </div>
    </div>
  );
};

export default Home;
