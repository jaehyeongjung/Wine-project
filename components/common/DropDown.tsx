import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DropDown.module.css';

interface Props {
  isScreen: boolean;
  options: string[];
  onSelect: (option: string) => void;
}

const DropDown: React.FC<Props> = ({ isScreen, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

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

  return (
    <div ref={dropdownRef}>
      <div className={styles.container}>
        <div
          className={isScreen ? styles.filterTypeBox : styles.typeBox}
          onClick={handleToggle}
        >
          <div className={styles.boxItem}>{selected}</div>
          <Image
            className={styles.dropdownArrowImage}
            src="/images/WineTypeArrowIcon.svg"
            alt="와인 타입 드롭다운 화살표"
            width={16}
            height={8}
          />
        </div>
        {isOpen && (
          <div className={styles.optionBox}>
            {options.map((option, index) => (
              <div
                className={
                  isScreen ? styles.filterOptionItem : styles.optionItem
                }
                key={index}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
