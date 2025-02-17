import styles from './headerwithProfile.module.css';
import useDevice from '../../../hooks/useDevice';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { fetchUserInfo } from '@/pages/api/wineApi';
import { UserInfo } from '@/pages/myprofile/ProfileSection/ProfileSection';

const Header: React.FC = () => {
  const { mode } = useDevice();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('유저 정보 로드 실패:', error);
      }
    };

    getUserInfo();
  }, []);

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

    setIsOpen(false);
    router.push('/');
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
              src={userInfo?.image || '/images/wineProfile.svg'}
              alt="사용자 프로필 이미지"
              fill
              unoptimized
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                // 이미지 로드 실패시 기본 이미지로 대체
                const target = e.target as HTMLImageElement;
                target.src = '/images/wineProfile.svg';
              }}
            />
          </div>
          {isOpen && (
            <ul className={styles.dropdown_menu}>
              <Link
                href={`/myprofile/${userInfo?.id || ''}`}
                className={styles.mypage}
              >
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
