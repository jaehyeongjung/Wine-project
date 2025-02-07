import { NextPage } from 'next';
import styles from './signup.module.css';
import Button from '@/components/common/Button';
import Link from 'next/link';
import useDevice from '@/hooks/useDevice';

const Signup: NextPage = () => {
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
            placeholder="whyne@email.com"
            className={`${styles.email_input} ${styles[`email_input_${mode}`]}`}
          />
        </div>

        <div className="form_group">
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
            placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
            className={`${styles.password_input} ${styles[`password_input_${mode}`]}`}
          />
        </div>

        <div className="form_group">
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
          />
        </div>

        <Button
          type="default"
          size="width400"
          radius={16}
          color="purple"
          text="가입하기"
          textColor="white"
        />
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
  );
};

export default Signup;
