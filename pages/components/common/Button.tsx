import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type?: 'default' | 'kakao' | 'google'; // 버튼 타입
  size:
    | 'width400'
    | 'width279'
    | 'width284'
    | 'width96x54'
    | 'width96x42'
    | 'width280'
    | 'width223'
    | 'width108'
    | 'width294'
    | 'width113'
    | 'width156'
    | 'width480'
    | 'social';

  radius?: number;
  color?: 'purple' | 'gray' | 'white' | 'lite_purple';
  text: string;
  textColor?: 'white' | 'gray' | 'purple';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size,
  radius,
  color = 'purple',
  text,
  textColor = 'white',
  onClick,
}) => {
  const buttonClass =
    type === 'kakao'
      ? styles.kakao
      : type === 'google'
        ? styles.google
        : `${styles.button} ${styles[size]} ${styles[color]} ${styles[`text-${textColor}`]}`;

  return (
    <button
      className={buttonClass}
      style={{ borderRadius: radius ? `${radius}px` : undefined }}
      onClick={onClick}
    >
      {type === 'google' && (
        <img
          src="/images/google.svg"
          alt="Google Logo"
          className={styles.logo}
        />
      )}
      {type === 'kakao' && (
        <img src="/images/kakao.svg" alt="Kakao Logo" className={styles.logo} />
      )}
      {text}
    </button>
  );
};

export default Button;
