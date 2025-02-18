import { NextPage } from 'next';
import styles from './login.module.css';
import Button from '@/components/common/Button';
import Link from 'next/link';
import useDevice from '@/hooks/useDevice';
import Image from 'next/image';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BASE_URL, postOAuthLogin, postSignIn } from '@/pages/api/wineApi';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login: NextPage = () => {
  const { mode } = useDevice();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');
  const router = useRouter();

  const handleKakaoLogin = () => {
    //카카오 로그인 처리
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code&state=KAKAO`;

    console.log('Constructed Kakao Auth URL:', kakaoAuthUrl);

    window.location.href = kakaoAuthUrl; // 카카오 동의하기 화면 보여주기, 인증 후 인증코드를 받아오기 위해 redirect_uri설정.
  };

  const exchangeCodeForToken = async (
    provider: 'KAKAO',
    code: { redirectUri: string; token: string },
  ) => {
    console.log('Using BASE_URL:', BASE_URL);

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/signIn/${provider}`,
        code,
      );
      console.log('내가 받은 response는 :', response);
      return response;
    } catch (error) {
      console.warn(`${provider} 로그인 실패:`, error);
    }
  }; //카카오 로그인 후 인증 코드를 서버에 보내서 엑세스 토큰과 리프레시 토큰을 받아온다.

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kakaoCode = params.get('code');
    const state = params.get('state');
    //카카오 로그인 후 리다이렉트 url에서 code와 state를 추출하여 인증 진행

    console.log('Current URL:', window.location.href);
    console.log('Search params:', window.location.search);
    console.log('State:', state);
    console.log('Code:', kakaoCode);

    if (state === 'KAKAO' && kakaoCode) {
      console.log('인가 코드 확인:', kakaoCode); // 디버깅 코드

      const KAKAO_REDIRECT_URL =
        process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL || 'default_redirect_url';

      exchangeCodeForToken('KAKAO', {
        redirectUri: KAKAO_REDIRECT_URL,
        token: kakaoCode,
      })
        .then((response) => {
          console.log('Full response:', response); // 전체 응답 로깅
          if (response && response.data) {
            //서버에서 응답하면 토큰 불러오기
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            if (accessToken && refreshToken) {
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
              localStorage.setItem('userImage', response.data.user.image);
              Cookies.set('accessToken', accessToken, {
                expires: 0.1,
                path: '/',
              });

              console.log('토큰 저장 완료', { accessToken, refreshToken }); // 토큰 저장확인
              router.push('/');
            }
          }
        })
        .catch((error) => {
          console.error('카카오 로그인 오류:', error);
        });
    }
  }, [router]);

  const emailSchema = z.object({
    email: z
      .string()
      .min(1, '이메일은 필수 입력입니다.')
      .email('이메일 형식으로 작성해 주세요.'),
  });

  const pwdSchema = z.object({
    pwd: z.string().min(1, '비밀번호는 필수 입력입니다.'),
  });

  type EmailSchemaType = z.infer<typeof emailSchema>;
  type PwdSchemaType = z.infer<typeof pwdSchema>;

  interface LoginFormData {
    email: string;
    password: string;
  }

  interface GoogleSignInRequest {
    state: string;
    redirectUri: string;
    token: string;
  }

  const emailResult = emailSchema.safeParse({ email: email.trim() });
  const pwdResult = pwdSchema.safeParse({ pwd: pwd.trim() });

  const EmailValidationCheck = () => {
    if (!emailResult.success) {
      setEmailError(emailResult.error.errors[0].message);
    } else {
      setEmailError('');
    }
  };

  const handlePwdBlur = () => {
    if (!pwdResult.success) {
      setPwdError(pwdResult.error.errors[0].message);
    } else {
      setPwdError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //form 자동제출 방지

    const emailResult = emailSchema.safeParse({ email: email.trim() });
    const pwdResult = pwdSchema.safeParse({ pwd: pwd.trim() });

    if (emailResult.success && pwdResult.success) {
      const formData: LoginFormData = {
        email: email.trim(),
        password: pwd.trim(),
      };

      try {
        const result = await postSignIn(formData);
        console.log('result 결과값 !!', result);
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('userImage', result.user.image);
        Cookies.set('accessToken', result.accessToken, {
          expires: 0.1,
          path: '/',
        });
        router.push('/');
      } catch (error: any) {
        alert(`
          ${error.response.data.message} : 이메일 혹은 비밀번호를 확인해주세요.`);
      }
    }
  };

  return (
    <div className={styles.login_background}>
      <main
        className={`${styles.login_container} ${styles[`login_container_${mode}`]}`}
      >
        <div className={`${styles.login_logo} ${styles[`login_logo_${mode}`]}`}>
          <Link href="/">
            <Image
              src="/images/blacklogo.svg"
              alt="와인 로고 이미지"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label
              htmlFor="email"
              className={`${styles.label} ${styles[`label_${mode}`]}`}
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일 입력"
              className={`${styles.email_input} ${styles[`email_input_${mode}`]}`}
              onBlur={EmailValidationCheck}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className={`${styles.error} ${styles[`error_${mode}`]}`}>
                {emailError}
              </p>
            )}
          </div>

          <div className={styles.form_group}>
            <label
              htmlFor="password"
              className={`${styles.label} ${styles[`label_${mode}`]}`}
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호 입력"
              className={`${styles.password_input} ${styles[`password_input_${mode}`]}`}
              onBlur={handlePwdBlur}
              onChange={(e) => setPwd(e.target.value)}
            />
            {pwdError && (
              <p className={`${styles.error} ${styles[`error_${mode}`]}`}>
                {pwdError}
              </p>
            )}
          </div>

          <div
            className={`${styles.button_container} ${styles[`button_container_${mode}`]}`}
          >
            {emailResult.success && pwdResult.success ? (
              <Button
                type="default"
                size="width400"
                radius={16}
                color="purple"
                text="로그인"
                textColor="white"
              />
            ) : (
              <Button
                type="default"
                size="width400"
                radius={16}
                color="gray"
                text="로그인"
                textColor="white"
                disabled={true}
              />
            )}

            <Button
              type="google"
              size="width400"
              radius={16}
              color="white"
              text="Google로 시작하기"
              textColor="black"
              onClick={handleKakaoLogin}
            />

            <Button
              type="kakao"
              size="width400"
              radius={16}
              color="white"
              text="kakao로 시작하기"
              textColor="black"
              onClick={handleKakaoLogin}
            />
          </div>
        </form>

        <div className={styles.signup_link}>
          <p
            className={`${styles.signup_label} ${styles[`signup_label_${mode}`]}}`}
          >
            계정이 없으신가요?
          </p>
          <Link
            href="/signup"
            className={`${styles.link} ${styles[`link_${mode}`]}`}
          >
            회원가입하기
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
