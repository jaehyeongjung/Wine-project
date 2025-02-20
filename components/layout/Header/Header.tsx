import styles from './header.module.css';
import useDevice from '../../../hooks/useDevice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header = () => {
  const { mode } = useDevice();
  const router = useRouter();

  if (!mode) return null;

  const handleLogoClick = () => {
    if (router.pathname === '/') {
      router.reload();
    } else {
      router.push('/');
    }
  };

  return (
    <header
      className={`${styles.header_container} ${styles[`header_container_${mode}`]}`}
    >
      <nav className={`${styles.header_box} ${styles[`header_box${mode}`]}`}>
        <button
          onClick={handleLogoClick}
          className={`${styles.wine_logo} ${styles[`logo_${mode}`]}`}
        >
          <Image
            src="/images/whitelogo.svg"
            alt="와인 로고 이미지"
            fill
            style={{ objectFit: 'cover' }}
          />
        </button>
        <nav
          className={`${styles.sign_container} ${styles[`sign_container_${mode}`]}`}
        >
          <Link
            href="/login"
            className={`${styles.login} ${styles[`login_${mode}`]}`}
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className={`${styles.signup} ${styles[`signup_${mode}`]}`}
          >
            회원가입
          </Link>
        </nav>
      </nav>
    </header>
  );
};

export default Header;
