import { NextPage } from 'next';
import styles from './login.module.css';
import Button from '@/components/common/Button';
import Link from 'next/link';
import useDevice from '@/hooks/useDevice';
import Image from 'next/image';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { postOAuthLogin, postSignIn } from '@/pages/api/wineApi';
import { signIn, signOut, useSession } from 'next-auth/react';

const Login: NextPage = () => {
  const { mode } = useDevice();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

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
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        router.push('/');
      } catch (error: any) {
        console.error('API 에러:', error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    try {
      await signIn(provider, {
        callbackUrl: '/callback/kakao',
        redirect: true,
      });
    } catch (error) {
      console.error('로그인 중 에러발생:', error);
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

            <Link
              href="/signup"
              className={`${styles.forgetpwd} ${styles[`forgetpwd_${mode}`]}`}
            >
              비밀번호를 잊으셨나요?
            </Link>
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
              onClick={() => handleOAuthLogin('google')}
            />

            <Button
              type="kakao"
              size="width400"
              radius={16}
              color="white"
              text="kakao로 시작하기"
              textColor="black"
              onClick={() => handleOAuthLogin('kakao')}
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
