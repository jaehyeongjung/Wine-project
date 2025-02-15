import styles from './headerwithProfile.module.css';
import useDevice from '../../../hooks/useDevice';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  imageUrl: string;
}

const Header: React.FC<HeaderProps> = ({ imageUrl }) => {
  const { mode } = useDevice();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLogoClick = () => {
    if (router.pathname === '/') {
      router.reload();
    } else {
      router.push('/');
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userImage');

    setIsLogin(false);
    setIsOpen(false);
    router.reload();
  };

  if (!mode) return null;

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
        <div className={styles.header_img} ref={dropdownRef}>
          <div
            className={styles.image_wrapper}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              src={imageUrl === 'null' ? '/images/wineProfile.svg' : imageUrl}
              alt="사용자 프로필 이미지"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          {isOpen && (
            <ul className={styles.dropdown_menu}>
              <Link href="myprofile/1" className={styles.mypage}>
                <li className={styles.dropdown_item}>마이페이지</li>
              </Link>
              <li className={styles.dropdown_item} onClick={handleLogoutClick}>
                로그아웃
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
