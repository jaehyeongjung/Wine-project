import styles from './Header.module.css';
import useDevice from '../../hooks/useDevice';
import { useRouter } from 'next/router';

interface HeaderProps {
  imageUrl: string;
}

const Header: React.FC<HeaderProps> = ({ imageUrl }) => {
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
        <div className={styles.header_img}>
          <img src={imageUrl}></img>
        </div>
      </nav>
    </header>
  );
};

export default Header;
