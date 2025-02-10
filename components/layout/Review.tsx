import { useState } from 'react';
import Image from 'next/image';
import SliderGrop from '@/components/common/SliderGrop';
import styles from './Review.module.css';
import Button from '../common/Button';
import ModalStarRating from '../common/ModalStarRating';

interface Props {
  closeModal: () => void;
  wineName: string;
}

const Review = ({ closeModal, wineName }: Props) => {
  const items = [
    { label: '바디감', row: '가벼워요', high: '진해요', value: 50 },
    { label: '타닌', row: '부드러워요', high: '떫어요', value: 50 },
    { label: '당도', row: '드라이해요', high: '달아요', value: 50 },
    { label: '산미', row: '안셔요', high: '많이셔요', value: 50 },
  ];

  const [values, setValues] = useState(items.map((item) => item.value));

  const handleSliderChange = (index: number, newValue: number) => {
    setValues((prev) => {
      const newValues = [...prev];
      newValues[index] = newValue;
      return newValues;
    });
  };
  console.log(values);

  const [tags, setTags] = useState<
    { name: string; selected: boolean; value: string }[]
  >([
    { name: '체리', selected: false, value: 'CHERRY' },
    { name: '베리', selected: false, value: 'BERRY' },
    { name: '오크', selected: false, value: 'OAK' },
    { name: '바닐라', selected: false, value: 'VANILLA' },
    { name: '후추', selected: false, value: 'PEPPER' },
    { name: '제빵', selected: false, value: 'BAKING' },
    { name: '풀', selected: false, value: 'GRASS' },
    { name: '사과', selected: false, value: 'APPLE' },
    { name: '복숭아', selected: false, value: 'PEACH' },
    { name: '시트러스', selected: false, value: 'CITRUS' },
    { name: '트로피컬', selected: false, value: 'TROPICAL' },
    { name: '미네랄', selected: false, value: 'MINERAL' },
    { name: '꽃', selected: false, value: 'FLOWER' },
    { name: '담뱃잎', selected: false, value: 'TAVACCO' },
    { name: '흙', selected: false, value: 'SOIL' },
    { name: '초콜릿', selected: false, value: 'CHOCOLATE' },
    { name: '스파이스', selected: false, value: 'SPICE' },
    { name: '카라멜', selected: false, value: 'CARAMEL' },
    { name: '가죽', selected: false, value: 'LEATHER' },
  ]);

  const toggleTag = (index: number) => {
    setTags((prev) =>
      prev.map((tag, i) =>
        i === index ? { ...tag, selected: !tag.selected } : tag,
      ),
    );
  };

  const selectedTags = tags
    .filter((tag) => tag.selected)
    .map((tag) => tag.value);
  console.log(selectedTags);

  const [selectedStar, setSelectedStar] = useState(0);

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.title}>리뷰 등록</div>
      <section>
        <div className={styles.ratingBox}>
          <div className={styles.imageBox}>
            <Image
              src="/images/ReviewThumbnail.svg"
              alt="리뷰등록썸네일"
              width={54}
              height={54}
            />
          </div>
          <div>
            <div className={styles.wineName}>{wineName}</div>
            <div className={styles.rating}>
              {Array.from({ length: 5 }, (_, index) => (
                <ModalStarRating
                  key={index}
                  filled={index < selectedStar}
                  onClick={() => setSelectedStar(index + 1)}
                />
              ))}
            </div>
          </div>
        </div>
        <textarea
          className={styles.textArea}
          placeholder="후기를 작성해 주세요"
        />
      </section>
      <section>
        <div className={styles.subTitle}>와인의 맛은 어땠나요?</div>
        <SliderGrop
          items={items}
          type={true}
          onValueChange={handleSliderChange}
        />
      </section>
      <section>
        <div className={styles.subTitle}>기억에 남는 향이 있나요?</div>
        <div className={styles.tagBtnBox}>
          {tags.map((tag, index) => (
            <button
              key={index}
              className={`${styles.tagBtn} ${tag.selected ? styles.tagBtnAct : ''}`}
              onClick={() => toggleTag(index)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </section>
      <div>
        <Button type="default" text="리뷰 남기기" size="width480" />
      </div>
    </div>
  );
};

export default Review;
