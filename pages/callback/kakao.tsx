import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { postOAuthLogin } from '../api/wineApi';
import { useSearchParams } from 'next/navigation';

const CallbackKakao = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = router.query.code as string; // useSearchParams 대신 router.query 사용

  console.log('콜백카카오 컴포넌트 마운트');

  console.log(code);

  // URL 파라미터 디버깅을 위한 로깅 추가
  useEffect(() => {
    // 전체 URL 확인
    console.log('Current URL:', window.location.href);

    console.log('코드 이거에요', code);

    // searchParams 전체 내용 확인
    console.log('All Search Params:');
    searchParams.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // router.query 확인 (Next.js 라우터의 쿼리 파라미터)
    console.log('Router Query:', router.query);
  }, [code, router.query]);

  useEffect(() => {
    const handleCallback = async () => {
      const session = await getSession();
      if (session?.user && code) {
        console.log('코드 여기에요222', code);
        try {
          const result = await postOAuthLogin('KAKAO', {
            state: 'login',
            redirectUri: 'http://localhost:3000/api/auth/callback/kakao',
            token: code,
          });

          if (result?.ok) {
            router.push('/');
          } else {
            router.push('/auth/error');
          }
        } catch (error) {
          console.error('Backend error:', error);
          router.push('/auth/error');
        }
      }
    };

    handleCallback();
  }, [router, code]);

  return (
    <div>
      <div>로그인 처리중...</div>
    </div>
  );
};

export default CallbackKakao;
