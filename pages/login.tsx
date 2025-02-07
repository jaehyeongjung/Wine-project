import { NextPage } from 'next';
import styles from './login.module.css';
import Button from '@/components/common/Button';
import Link from 'next/link';
import useDevice from '@/hooks/useDevice';

const Login: NextPage = () => {
  const { mode } = useDevice();

  return (
    <main
      className={`${styles.signup_container} ${styles[`signup_container_${mode}`]}`}
    >
      <h1 className={`${styles.signup_logo} ${styles[`signup_logo_${mode}`]}`}>
        WINE
      </h1>

      <form>
        <div className="form_group">
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
          />
        </div>

        <div className="form_group">
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
          />
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
          <Button
            type="default"
            size="width400"
            radius={16}
            color="purple"
            text="로그인"
            textColor="white"
          />

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
  );
};

export default Login;
