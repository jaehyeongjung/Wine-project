import { useState } from 'react';
import styles from './PriceSlide.module.css';

const PriceSlide = () => {
  const [minValue, setMinValue] = useState(10000);
  const [maxValue, setMaxValue] = useState(50000);
  const minLimit = 0;
  const maxLimit = 100000;
  const step = 1000;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (value > maxValue - step) value = maxValue - step;
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (value < minValue + step) value = minValue + step;
    setMaxValue(value);
  };

  const minPercent = (minValue / maxLimit) * 100;
  const maxPercent = (maxValue / maxLimit) * 100;

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
        className={styles.selectedValues}
        style={{
          left: `${minPercent}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <span className={styles.numberText}>₩{minValue.toLocaleString()}</span>
      </div>

      <div
        className={styles.selectedValues}
        style={{
          left: `${maxPercent}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <span className={styles.numberText}>₩{maxValue.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PriceSlide;
