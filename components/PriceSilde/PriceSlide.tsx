import { useState } from 'react';
import styles from './PriceSlide.module.css';
import useDevice from '@/hooks/useDevice';

interface PriceSlideProps {
  minValue?: number; // 기본값 설정을 위해 선택적 프로퍼티로 변경
  maxValue?: number;
  onChange: (newRange: [number, number]) => void;
}

const PriceSlide = ({
  minValue = 10000,
  maxValue = 50000,
  onChange,
}: PriceSlideProps) => {
  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);
  const minLimit = 0;
  const maxLimit = 100000;
  const step = 1000;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (value > maxValue - step) value = maxValue - step;
    setMin(value);
    onChange([value, max]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (value < minValue + step) value = minValue + step;
    setMax(value);
    onChange([min, value]);
  };

  const minPercent = (minValue / maxLimit) * 100;
  const maxPercent = (maxValue / maxLimit) * 100;
  const { mode } = useDevice();
  return (
    <div>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className={styles.rangeInput}
          style={{ zIndex: minValue > maxLimit - 50 ? 5 : 1 }}
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className={styles.rangeInput}
          style={{ zIndex: maxValue < minLimit + 50 ? 5 : 2 }}
        />
        <div
          className={styles.sliderTrack}
          style={{
            background: `linear-gradient(to right, #ddd ${minPercent}%, #6A42DB ${minPercent}%, #6A42DB ${maxPercent}%, #ddd ${maxPercent}%)`,
          }}
        />
      </div>

      <div
        className={`${styles.selectedValuesLeft} ${styles[`selectedValuesLeft_${mode}`]}`}
        style={{
          left: `${minPercent}%`,
        }}
      >
        <span className={styles.numberText}>₩{minValue.toLocaleString()}</span>
      </div>

      <div
        className={`${styles.selectedValuesRight} ${styles[`selectedValuesRight_${mode}`]}`}
        style={{
          left: `${maxPercent}%`,
        }}
      >
        <span
          className={`${styles.numberText} ${styles[`numberText_${mode}`]}`}
        >
          ₩{maxValue.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PriceSlide;
