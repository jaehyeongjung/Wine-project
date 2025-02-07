import styles from './Header.module.css';
import useDevice from '../../hooks/useDevice';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
          WINE
        </button>
        <nav
          className={`${styles.sign_container} ${styles[`sign_container_${mode}`]}`}
        >
          <Link href="/login" className={styles.login}>
            로그인
          </Link>
          <Link href="/signup" className={styles.signup}>
            회원가입
          </Link>
        </nav>
      </nav>
    </header>
  );
};

export default Header;
