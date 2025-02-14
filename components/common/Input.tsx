import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: 'search';
  label?: string;
  name?: string;
  size?: 'login' | 'search' | 'nickname' | 'modal' | 'filter';
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  icon,
  label,
  name,
  size = 'login',
}) => {
  const borderRadius = size === 'search' ? '50px' : '16px';

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label
          className={size === 'filter' ? styles.filterLabel : styles.label}
        >
          {label}
        </label>
      )}

      {/* 검색 아이콘 */}
      {icon === 'search' && (
        <img
          src="/icons/search.svg"
          alt="돋보기 아이콘"
          className={styles.iconImg}
        />
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className={`${styles.input} ${styles[size]} ${type === 'search' ? styles.search : ''}`}
        style={{ borderRadius }}
      />
    </div>
  );
};

export default Input;
