import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type?: 'default' | 'kakao' | 'google'; // 버튼 타입
  size: 'large' | 'medium' | 'small' | 'filter' | 'social';
  radius?: number;
  color?: 'purple' | 'gray' | 'white';
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
      {text}
    </button>
  );
};

export default Button;
