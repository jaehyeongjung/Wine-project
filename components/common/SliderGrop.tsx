import { useState } from 'react';
import styles from './SliderGrop.module.css';

interface Props {
  items: { label: string; row: string; high: string; value: number }[];
  type: boolean;
}

const SliderGrop: React.FC<Props> = ({ items, type }: Props) => {
  const [values, setValues] = useState(items.map((item) => item.value));
  console.log(values);
  const handleChange = (index: number, newValue: number) => {
    setValues((prev) => {
      const newValues = [...prev]; // 기존 값을 복사하여 수정
      newValues[index] = newValue; // 특정 인덱스만 수정
      return newValues;
    });
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className={styles.sliderContainer}>
          <span className={styles.labelItem}>{item.label}</span>
          <div className={styles.sliderBox}>
            <span className={styles.rowItem}>{item.row}</span>
            <input
              className={styles.range}
              type="range"
              min={0}
              max={100}
              value={values[index]}
              disabled={!type}
              onChange={(e) => handleChange(index, Number(e.target.value))}
            />
            <span className={styles.highItem}>{item.high}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SliderGrop;
