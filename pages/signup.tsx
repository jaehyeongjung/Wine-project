import { NextPage } from 'next';
import styles from './signup.module.css';
import Button from '@/components/common/Button';
import Link from 'next/link';
import useDevice from '@/hooks/useDevice';
import Image from 'next/image';
import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { postSignUp } from '@/pages/api/wineApi';

const Signup: NextPage = () => {
  const { mode } = useDevice();
  const [email, setEmail] = useState(''); // ''을 보고 string이라고 자동추론
  const [emailError, setEmailError] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [rePwd, setRePwd] = useState('');
  const [rePwdError, setRePwdError] = useState('');
  const router = useRouter();

  //이메일 스키마 정의
  const emailSchema = z.object({
    email: z
      .string()
      .min(1, '이메일은 필수 입력입니다.')
      .email('올바른 이메일 형식이 아닙니다.'),
  });

  const nicknameSchema = z.object({
    nickname: z
      .string()
      .min(1, '닉네임은 필수 입력입니다.')
      .max(20, '닉네임은 최대 20자까지 가능합니다.'),
  });

  const pwdSchema = z.object({
    pwd: z
      .string()
      .min(1, '비밀번호는 필수 입력입니다.')
      .min(8, '비밀번호는 최소 8자 이상입니다.')
      .regex(
        /^[A-Za-z0-9!@#$%^&*]+$/,
        '비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)로만 가능합니다',
      ),
  });

  const rePwdSchema = z.object({
    rePwd: z
      .string()
      .min(1, '비밀번호 확인을 입력해주세요.')
      .refine((rePwd) => rePwd === pwd, {
        message: '비밀번호가 일치하지 않습니다.',
      }),
  });

  // 타입 추론
  type EmailSchemaType = z.infer<typeof emailSchema>;
  type nicknameSchemaType = z.infer<typeof nicknameSchema>;
  type PwdSchemaType = z.infer<typeof pwdSchema>;
  type rePwdSchemaType = z.infer<typeof rePwdSchema>;

  interface FormData {
    email: string;
    nickname: string;
    password: string;
    passwordConfirmation: string;
  }

  //Result를 여기서 다 선언
  const emailResult = emailSchema.safeParse({ email: email.trim() });
  const nicknameResult = nicknameSchema.safeParse({
    nickname: nickname.trim(),
  });
  const pwdResult = pwdSchema.safeParse({ pwd: pwd.trim() });
  const rePwdResult = rePwdSchema.safeParse({ rePwd: rePwd.trim() });

  const handleEmailBlur = () => {
    if (!emailResult.success) {
      setEmailError(emailResult.error.errors[0].message);
    } else {
      setEmailError('');
    }
  };

  const handleNicknameBlur = () => {
    if (!nicknameResult.success) {
      setNicknameError(nicknameResult.error.errors[0].message);
    } else {
      setNicknameError('');
    }
  };

  const handlePwdBlur = () => {
    if (!pwdResult.success) {
      setPwdError(pwdResult.error.errors[0].message);
    } else {
      setPwdError('');
    }
  };

  const handleRePwdBlur = () => {
    if (!rePwdResult.success) {
      setRePwdError(rePwdResult.error.errors[0].message);
    } else {
      setRePwdError('');
    }
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPwd = e.target.value;
    setPwd(newPwd);

    // 다 입력해놓고, 비밀번호를 바꿀경우 비밀번호 확인 다시검사
    if (rePwd && rePwd.trim() !== newPwd.trim()) {
      setRePwdError('비밀번호가 일치하지 않습니다.');
    } else {
      setRePwdError('');
    }
  };

  const handleRePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRePwd = e.target.value;
    setRePwd(newRePwd);

    // 기존 rePwdSchema를 그대로 사용
    const result = rePwdSchema.safeParse({ rePwd: newRePwd.trim() });
    if (!result.success) {
      setRePwdError(result.error.errors[0].message);
    } else {
      setRePwdError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //form 자동제출 방지

    if (
      emailResult.success &&
      nicknameResult.success &&
      pwdResult.success &&
      rePwdResult.success
    ) {
      const formData: FormData = {
        email: email.trim(),
        nickname: nickname.trim(),
        password: pwd.trim(),
        passwordConfirmation: rePwd.trim(),
      };

      try {
        // API 호출성공하면
        const result = await postSignUp(formData);
        router.push('/');
      } catch (error: any) {
        console.error('API 에러:', error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_background}>
      <main
        className={`${styles.signup_container} ${styles[`signup_container_${mode}`]}`}
      >
        <div
          className={`${styles.signup_logo} ${styles[`signup_logo_${mode}`]}`}
        >
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
              placeholder="whyne@email.com"
              className={`${styles.email_input} ${styles[`email_input_${mode}`]}`}
              onBlur={handleEmailBlur}
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
              htmlFor="nickname"
              className={`${styles.label} ${styles[`label_${mode}`]}`}
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="whyne"
              className={`${styles.nickname_input} ${styles[`nickname_input_${mode}`]}`}
              onBlur={handleNicknameBlur}
              onChange={(e) => setNickname(e.target.value)}
            />
            {nicknameError && (
              <p className={`${styles.error} ${styles[`error_${mode}`]}`}>
                {nicknameError}
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
              placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
              className={`${styles.password_input} ${styles[`password_input_${mode}`]}`}
              onBlur={handlePwdBlur}
              onChange={handlePwdChange}
            />
            {pwdError && (
              <p className={`${styles.error} ${styles[`error_${mode}`]}`}>
                {pwdError}
              </p>
            )}
          </div>

          <div
            className={`${styles.form_group_repassword} ${styles[`form_group_repassword_${mode}`]}`}
          >
            <label
              htmlFor="repassword"
              className={`${styles.label} ${styles[`label_${mode}`]}`}
            >
              비밀번호 확인
            </label>
            <input
              id="repassword"
              type="password"
              placeholder="비밀번호 확인"
              className={`${styles.repassword_input} ${styles[`repassword_input_${mode}`]}`}
              onBlur={handleRePwdBlur}
              onChange={handleRePwdChange}
            />
            {rePwdError && (
              <p className={`${styles.error} ${styles[`error_${mode}`]}`}>
                {rePwdError}
              </p>
            )}
          </div>

          {emailResult.success &&
          nicknameResult.success &&
          pwdResult.success &&
          rePwdResult.success ? (
            <Button
              type="default"
              size="width400"
              radius={16}
              color="purple"
              text="가입하기"
              textColor="white"
            />
          ) : (
            <Button
              type="default"
              size="width400"
              radius={16}
              color="gray"
              text="가입하기"
              textColor="white"
              disabled={true}
            />
          )}
        </form>

        <div className={styles.login_link}>
          <p
            className={`${styles.login_label} ${styles[`login_label_${mode}`]}}`}
          >
            계정이 이미 있으신가요?
          </p>
          <Link
            href="/login"
            className={`${styles.link} ${styles[`link_${mode}`]}`}
          >
            로그인하기
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Signup;
