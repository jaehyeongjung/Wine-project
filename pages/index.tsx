import { NextPage } from 'next';
import Head from 'next/head';
import Button from '@/pages/components/common/Button';
import indexStyles from './index.module.css';
import homeStyles from '@/styles/Home.module.css';
import Header from '../components/layout/Header';
import Image from 'next/image';
import useDevice from '../hooks/useDevice';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { mode } = useDevice();
  const router = useRouter();

  return (
    <div className={indexStyles.container}>
      <Head>
        <title>Wine Project</title>
        <meta name="description" content="와인 추천 서비스" />
      </Head>

      <Header />

      <main
        className={`${indexStyles.main_section} ${indexStyles[`main_section_${mode}`]}`}
      >
        <section
          className={`${indexStyles.hero_section} ${indexStyles[`hero_section_${mode}`]}`}
        >
          <Image
            src="/images/landing_01.svg"
            alt="와인추천 서비스 소개 이미지"
            fill
            style={{ objectFit: 'cover' }}
          />
        </section>

        <section
          className={`${indexStyles.feature_section} ${indexStyles[`feature_section_${mode}`]}`}
        >
          <div className={indexStyles.image_container}>
            <Image
              src="/images/landing_02.svg"
              alt="와인 추천 콘텐츠 이미지 소개"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={indexStyles.image_container}>
            <Image
              src="/images/landing_03.svg"
              alt="내 맞춤 와인 이미지 소개"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={indexStyles.image_container}>
            <Image
              src="/images/landing_04.svg"
              alt="리뷰 시스템 이미지 소개"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <Button
            type="default"
            size="width279"
            text="와인 보러가기"
            color="purple"
            textColor="white"
            onClick={() => router.push('/wines')}
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
