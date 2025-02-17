import { NextPage } from 'next';
import Head from 'next/head';
import Button from '@/components/common/Button';
import indexStyles from './index.module.css';
import homeStyles from '@/styles/Home.module.css';
import Header from '../components/layout/Header/Header';
import Image from 'next/image';
import useDevice from '../hooks/useDevice';
import { useRouter } from 'next/router';
import HeaderWithProfile from '@/components/layout/Header/HeaderWithProfile';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const { mode } = useDevice();
  const router = useRouter();
  const [userImage, setUserImage] = useState('/images/wineProfile.svg');
  const [isLogin, setIsLogin] = useState(false);

  //페이지가 Client-Side에 마운트 될 때까지 기다렸다가 localStorage에 접근하기
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      // 로그인 상태 체크
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        setIsLogin(true);

        // 유저 이미지 설정
        const storedImage = localStorage.getItem('userImage');
        if (storedImage) {
          setUserImage(storedImage);
        }
      } else {
        setIsLogin(false);
        setUserImage('/images/wineProfile.svg');
      }
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className={indexStyles.container}>
      <Head>
        <title>Wine Project</title>
        <meta name="description" content="와인 추천 서비스" />
      </Head>

      {/* 로그인된 상태면 HeaderWithProfile을, 아니면 Header를 렌더링 */}
      {isLogin === true ? (
        <HeaderWithProfile imageUrl={userImage} />
      ) : (
        <Header />
      )}

      <main
        className={`${indexStyles.main_section} ${indexStyles[`main_section_${mode}`]}`}
      >
        <section
          className={`${indexStyles.hero_section} ${indexStyles[`hero_section_${mode}`]}`}
        >
          <Image
            src={
              mode === 'desktop'
                ? '/images/landing_01.svg'
                : mode === 'tablet'
                  ? '/images/landingTablet_01.svg'
                  : '/images/landingMobile_01.svg'
            }
            alt="와인추천 서비스 소개 이미지"
            fill
            style={{ objectFit: 'cover' }}
          />
        </section>

        <section
          className={`${indexStyles.feature_section} ${indexStyles[`feature_section_${mode}`]}`}
        >
          <div
            className={`${indexStyles.landing02_image_container} ${indexStyles[`landing02_image_container_${mode}`]}`}
          >
            <Image
              src={
                mode === 'mobile'
                  ? '/images/landingMobile_02.svg'
                  : '/images/landing_02.svg'
              }
              alt="와인 추천 콘텐츠 이미지 소개"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div
            className={`${indexStyles.image_container} ${indexStyles[`image_container_${mode}`]}`}
          >
            <Image
              src={
                mode === 'mobile'
                  ? '/images/landingMobile_03.svg'
                  : '/images/landing_03.svg'
              }
              alt="내 맞춤 와인 이미지 소개"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div
            className={`${indexStyles.image_container} ${indexStyles[`image_container_${mode}`]}`}
          >
            <Image
              src={
                mode === 'mobile'
                  ? '/images/landingMobile_04.svg'
                  : '/images/landing_04.svg'
              }
              alt="리뷰 시스템 이미지 소개"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </section>
        <div
          className={`${indexStyles.button_container} ${indexStyles[`button_container_${mode}`]}`}
        >
          <Button
            type="default"
            size="width279"
            text="와인 보러가기"
            color="purple"
            textColor="white"
            onClick={() => router.push('/wines')}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
