import Slider from './Slider';

interface Props {
  values: {
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
  };
  onValueChange?: (value: {
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
  }) => void;
  disabled?: boolean;
}

const SliderGroup = ({ values, onValueChange, disabled }: Props) => {
  const handleSliderChange = (type: keyof typeof values, newValue: number) => {
    if (onValueChange) onValueChange({ ...values, [type]: newValue });
  };

  const items: {
    key: keyof typeof values;
    label: string;
    row: string;
    high: string;
  }[] = [
    { key: 'lightBold', label: '바디감', row: '가벼워요', high: '진해요' },
    { key: 'smoothTannic', label: '타닌', row: '부드러워요', high: '떫어요' },
    { key: 'drySweet', label: '당도', row: '드라이해요', high: '달아요' },
    { key: 'softAcidic', label: '산미', row: '안셔요', high: '많이셔요' },
  ];

  return (
    <div>
      {items.map(({ key, label, row, high }) => (
        <Slider
          key={key}
          label={label}
          row={row}
          high={high}
          value={values[key]}
          disabled={disabled}
          onValueChange={(newValue) => handleSliderChange(key, newValue)}
        />
      ))}
    </div>
  );
};

export default SliderGroup;
