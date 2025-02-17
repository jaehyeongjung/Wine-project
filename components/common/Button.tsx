import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type?: 'default' | 'kakao' | 'google'; // 버튼 타입
  size?:
    | 'width40'
    | 'width96x42'
    | 'width96x54'
    | 'width100'
    | 'width108'
    | 'width113'
    | 'width137'
    | 'width156'
    | 'width169'
    | 'width223'
    | 'width279'
    | 'width280'
    | 'width284'
    | 'width294'
    | 'width400'
    | 'width480';

  radius?: number;
  color?: 'purple' | 'gray' | 'white' | 'lite_purple';
  text: string;
  textColor?: 'white' | 'gray' | 'purple' | 'black';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size,
  radius,
  color = 'purple',
  text,
  textColor = 'white',
  onClick,
  disabled,
}) => {
  const buttonClass =
    type === 'kakao'
      ? styles.kakao
      : type === 'google'
        ? styles.google
        : `${styles.button} ${size ? styles[size] : ''} ${styles[color]} ${styles[`text-${textColor}`]}
        ${disabled ? styles.disabled : ''}`;
  return (
    <button
      className={buttonClass}
      style={{ borderRadius: radius ? `${radius}px` : undefined }}
      onClick={onClick}
      disabled={disabled}
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
