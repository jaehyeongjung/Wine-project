import useDevice from '@/hooks/useDevice';
import styles from './Slider.module.css';

interface Props {
  label: string;
  row: string;
  high: string;
  value: number;
  disabled?: boolean;
  onValueChange?: (newValue: number) => void;
}

const Slider: React.FC<Props> = ({
  label,
  row,
  high,
  value,
  disabled,
  onValueChange,
}) => {
  const { mode } = useDevice();
  return (
    <div className={styles.sliderContainer}>
      <span className={`${styles.labelItem} ${styles[`labelItem_${mode}`]}`}>
        {label}
      </span>
      <div className={`${styles.sliderBox} ${styles[`sliderBox_${mode}`]}`}>
        <span className={`${styles.rowItem} ${styles[`rowItem_${mode}`]}`}>
          {row}
        </span>
        <input
          className={styles.range}
          type="range"
          min={0}
          max={10}
          value={value}
          disabled={disabled}
          onChange={(e) => onValueChange?.(Number(e.target.value))}
        />
        <span className={`${styles.highItem} ${styles[`highItem_${mode}`]}`}>
          {high}
        </span>
      </div>
    </div>
  );
};

export default Slider;
