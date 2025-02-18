import { ChangeEvent, useState, useEffect } from 'react';
import useDevice from '@/hooks/useDevice';
import Image from 'next/image';
import Button from '../../common/Button';
import ModalStarRating from '../../common/ModalStarRating';
import SliderGroup from '../../common/SliderGroup';
import { ReviewPatch, ReviewPost } from '@/pages/api/review';
import styles from './Review.module.css';

interface ReviewData {
  wineName: string;
  wineId?: number;
  reviewId?: number;
  rating?: number;
  taste?: {
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
  };
  aroma?: string[];
  content?: string;
}

interface Props {
  closeModal: () => void;
  reviewData: ReviewData;
  type: 'post' | 'patch';
}

const Review = ({ closeModal, reviewData, type }: Props) => {
  console.log('제대로 나와야하는디 ', reviewData);
  const { mode } = useDevice();

  // 별점 값 저장소
  const [selectedStar, setSelectedStar] = useState(reviewData.rating || 1);
  // textarea 값 저장소
  const [contentText, setContentText] = useState(reviewData.content || '');
  // 슬라이더 업데이트 값 저장소
  const [tasteValues, setTasteValues] = useState(
    reviewData.taste || {
      lightBold: 5,
      smoothTannic: 5,
      drySweet: 5,
      softAcidic: 5,
    },
  );
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
    { name: '담뱃잎', selected: false, value: 'TOBACCO' }, //스웨거 Schema 상으로 TOBACCO
    { name: '흙', selected: false, value: 'EARTH' }, //스웨거 Schema 상으로 EARTH
    { name: '초콜릿', selected: false, value: 'CHOCOLATE' },
    { name: '스파이스', selected: false, value: 'SPICE' },
    { name: '카라멜', selected: false, value: 'CARAMEL' },
    { name: '가죽', selected: false, value: 'LEATHER' },
  ]);

  // textarea 업데이트 기능
  const toggleTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentText(event.target.value);
  };

  // 향 태그 값 업데이트하는 기능
  const toggleTag = (index: number) => {
    setTags(
      tags.map((tag, i) =>
        i === index ? { ...tag, selected: !tag.selected } : tag,
      ),
    );
  };

  // prop으로 받은 향 태그 값을 업데이트하는 기능
  useEffect(() => {
    if (reviewData.aroma) {
      setTags((prevTags) =>
        prevTags.map((tag) => ({
          ...tag,
          selected: reviewData.aroma!.includes(tag.value),
        })),
      );
    }
  }, [reviewData]);

  // 선택된 향 태그만 뽑아 저장한 값. post에 사용할 예정
  const selectedTags = tags
    .filter((tag) => tag.selected)
    .map((tag) => tag.value);

  // taste값을 변경시키는 함수
  const handleSliderChange = (newValues: typeof tasteValues) => {
    setTasteValues(newValues);
  };

  // 제출 버튼 클릭 시 등록하기 기능
  const handleResponse = async () => {
    if (!contentText.trim()) {
      return alert('리뷰 내용을 입력해주세요.');
    }

    const data = {
      rating: selectedStar,
      lightBold: tasteValues.lightBold,
      smoothTannic: tasteValues.smoothTannic,
      drySweet: tasteValues.drySweet,
      softAcidic: tasteValues.softAcidic,
      aroma: selectedTags,
      content: contentText.trim(),
      ...(type === 'post' && { wineId: reviewData.wineId }),
    };

    if (type === 'patch') {
      console.log('수정할 리뷰 ID:', reviewData.id); // 확인용 로그
    }

    try {
      if (type === 'post') await ReviewPost(data);
      if (type === 'patch') await ReviewPatch(reviewData.id, data);
      closeModal();
    } catch (error: any) {
      console.error('리뷰 등록 오류:', error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={`${styles.title} ${styles[`title_${mode}`]}`}>
        {type === 'post' ? <div>리뷰 등록</div> : <div>수정하기</div>}
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
              {reviewData.wineName}
            </div>
            <div className={styles.rating}>
              <ModalStarRating
                rating={selectedStar}
                setRating={setSelectedStar}
              />
            </div>
          </div>
        </div>
        <textarea
          className={`${styles.textArea} ${styles[`textArea_${mode}`]}`}
          placeholder="후기를 작성해 주세요"
          value={contentText}
          onChange={toggleTextarea}
        />
      </section>
      <section>
        <div className={`${styles.subTitle} ${styles[`subTitle_${mode}`]}`}>
          와인의 맛은 어땠나요?
        </div>
        <SliderGroup values={tasteValues} onValueChange={handleSliderChange} />
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
          onClick={handleResponse}
          type="default"
          text="리뷰 남기기"
          size="width480"
        />
      </div>
    </div>
  );
};

export default Review;
