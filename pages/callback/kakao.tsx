import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { postOAuthLogin } from '../api/wineApi';
import { useSearchParams } from 'next/navigation';

const CallbackKakao = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  console.log('코드 여기에요', code);

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
            router.push('/'); // 성공시 홈으로 리다이렉트
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
  }, [router]);

  return <div>로그인 처리중...</div>;
};

export default CallbackKakao;
