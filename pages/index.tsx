import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Button from './components/common/Button';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Button Component Test</title>
      </Head>


      <h1>버튼 컴포넌트 테스트</h1>

      <Button
        type="default"
        size="width400"
        text="가입하기"
        color="purple"
        textColor="white"
      />
      <Button
        type="default"
        size="width279"
        text="와인 보러가기"
        color="purple"
        textColor="white"
      />
      <Button
        type="default"
        size="width284"
        text="와인 등록하기"
        color="purple"
        textColor="white"
      />
      <Button
        type="default"
        size="width96x42"
        text="초기화"
        color="lite_purple"
        textColor="purple"
      />
      <Button
        type="default"
        size="width223"
        text="필터 적용하기"
        color="purple"
        textColor="white"
      />

      <Button
        type="default"
        size="width280"
        text="280"
        color="purple"
        textColor="white"
      />

      <Button
        type="default"
        size="width108"
        text="확인"
        color="purple"
        textColor="white"
      />

      <Button
        type="default"
        size="width113"
        text="113"
        color="purple"
        textColor="white"
      />

      <Button
        type="default"
        size="width480"
        text="리뷰 남기기"
        color="purple"
        textColor="white"
      />

      <Button type="kakao" text="kakao로 시작하기" />
      <Button type="google" text="Google로 시작하기" />

    </div>
  );
};

export default Home;
