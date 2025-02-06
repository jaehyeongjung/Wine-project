import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'search'; // 타입 설정
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: 'search';
  label?: string;
  size?: 'login' | 'search';
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  icon,
  label,
  size = 'login',
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}

      {icon === 'search' && (
        <img
          src="/icons/search.png"
          alt="돋보기 아이콘"
          className={styles.iconImg}
        />
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${styles[size]} ${type === 'search' ? styles.search : ''}`}
      />
    </div>
  );
};

export default Input;
