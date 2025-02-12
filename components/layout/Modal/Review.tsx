import { ChangeEvent, useState } from 'react';
import useDevice from '@/hooks/useDevice';
import Image from 'next/image';
import Button from '../../common/Button';
import ModalStarRating from '../../common/ModalStarRating';
import SliderGroup from '../../common/SliderGroup';
import styles from './Review.module.css';

interface Props {
  closeModal: () => void;
  isScreen: boolean;
  wineName: string;
  wineId: number;
}

const Review = ({ closeModal, isScreen, wineName, wineId }: Props) => {
  const { mode } = useDevice();

  // 별점 값 저장소
  const [selectedStar, setSelectedStar] = useState(0);
  // textarea 값 저장소
  const [content, setContent] = useState('');
  // 슬라이더 업데이트 값 저장소
  const [taste, setTaste] = useState({
    lightBold: 50,
    smoothTannic: 50,
    drySweet: 50,
    softAcidic: 50,
  });
  // 향 태그 값 저장소
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
    { name: '담뱃잎', selected: false, value: 'TABACCO' },
    { name: '흙', selected: false, value: 'SOIL' },
    { name: '초콜릿', selected: false, value: 'CHOCOLATE' },
    { name: '스파이스', selected: false, value: 'SPICE' },
    { name: '카라멜', selected: false, value: 'CARAMEL' },
    { name: '가죽', selected: false, value: 'LEATHER' },
  ]);

  // textarea 업데이트 기능
  const toggleTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // 향 태그 값 업데이트하는 기능
  const toggleTag = (index: number) => {
    setTags(
      tags.map((tag, i) =>
        i === index ? { ...tag, selected: !tag.selected } : tag,
      ),
    );
  };

  // 선택된 향 태그만 뽑아 저장한 값. post에 사용할 예정
  const selectedTags = tags
    .filter((tag) => tag.selected)
    .map((tag) => tag.value);

  // taste값을 변경시키는 함수
  const handleSliderChange = (newValues: typeof taste) => {
    setTaste(newValues);
  };

  // 제출 버튼 클릭 시 값이 잘 출력되는지 console.log로 확인
  const postData = () => {
    const data = {
      rating: selectedStar,
      lightBold: taste.lightBold,
      smoothTannic: taste.smoothTannic,
      drySweet: taste.drySweet,
      softAcidic: taste.softAcidic,
      aroma: selectedTags,
      content: content,
      wineId: wineId,
    };
    closeModal();
    console.log(data);
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={`${styles.title} ${styles[`title_${mode}`]}`}>
        리뷰 등록
      </div>
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
            <div className={`${styles.wineName} ${styles[`wineName_${mode}`]}`}>
              {wineName}
            </div>
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
          className={`${styles.textArea} ${styles[`textArea_${mode}`]}`}
          placeholder="후기를 작성해 주세요"
          value={content}
          onChange={toggleTextarea}
        />
      </section>
      <section>
        <div className={`${styles.subTitle} ${styles[`subTitle_${mode}`]}`}>
          와인의 맛은 어땠나요?
        </div>
        <SliderGroup values={taste} onValueChange={handleSliderChange} />
      </section>
      <section>
        <div className={styles.subTitle}>기억에 남는 향이 있나요?</div>
        <div className={`${styles.tagBtnBox} ${styles[`tagBtnBox_${mode}`]}`}>
          {tags.map((tag, index) => (
            <button
              key={index}
              className={`${styles.tagBtn} ${styles[`tagBtn_${mode}`]} ${tag.selected ? styles.tagBtnAct : ''}`}
              onClick={() => toggleTag(index)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </section>
      <div>
        <Button
          onClick={postData}
          type="default"
          text="리뷰 남기기"
          size="width480"
        />
      </div>
    </div>
  );
};

export default Review;
