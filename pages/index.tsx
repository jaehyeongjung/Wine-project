import { NextPage } from 'next';
import Head from 'next/head';
import Button from '@/pages/components/common/Button';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Button Component Test</title>
      </Head>

      <h1>버튼 컴포넌트 테스트</h1>

      <Button
        type="default"
        size="large"
        text="큰 버튼"
        color="purple"
        textColor="white"
      />
      <Button
        type="default"
        size="medium"
        text="중간 버튼"
        color="white"
        textColor="gray"
      />
      <Button
        type="default"
        size="small"
        text="작은 버튼"
        color="gray"
        textColor="white"
      />
      <Button
        type="default"
        size="filter"
        text="필터 버튼"
        color="purple"
        textColor="white"
      />

      <Button type="kakao" size="social" text="카카오로 시작하기" />
      <Button type="google" size="social" text="구글로 시작하기" />
    </div>
  );
};

export default Home;
