import { NextPage } from 'next';
import styles from './login.module.css';
import Button from '@/components/common/Button';
import Link from 'next/link';
import useDevice from '@/hooks/useDevice';
import Image from 'next/image';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login: NextPage = () => {
  const { mode } = useDevice();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');
  const router = useRouter();

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
    pwd: string;
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //form 자동제출 방지

    const emailResult = emailSchema.safeParse({ email: email.trim() });
    const pwdResult = pwdSchema.safeParse({ pwd: pwd.trim() });

    if (emailResult.success && pwdResult.success) {
      const formData: LoginFormData = {
        email: email.trim(),
        pwd: pwd.trim(),
      };

      try {
        // API 호출성공하면
        router.push('/');
      } catch (error) {}
    }
  };

  return (
    <div className={styles.login_background}>
      <main
        className={`${styles.login_container} ${styles[`login_container_${mode}`]}`}
      >
        <div className={`${styles.login_logo} ${styles[`login_logo_${mode}`]}`}>
          <Image
            src="/images/blacklogo.svg"
            alt="와인 로고 이미지"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <form>
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
            />

            <Button
              type="kakao"
              size="width400"
              radius={16}
              color="white"
              text="kakao로 시작하기"
              textColor="black"
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
