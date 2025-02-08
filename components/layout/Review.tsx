import Image from 'next/image';
import SliderGrop from '@/components/common/SliderGrop';

interface Props {
  closeModal: () => void;
}

const Review = ({ closeModal }: Props) => {
  const wineSliderData = [
    { label: '바디감', row: '가벼워요', high: '진해요', value: 90 },
    { label: '타닌', row: '부드러워요', high: '떫어요', value: 10 },
    { label: '당도', row: '드라이해요', high: '달아요', value: 30 },
    { label: '산미', row: '안셔요', high: '많이셔요', value: 60 },
  ];

  return (
    <div>
      <div>리뷰 등록</div>
      <section>
        <Image
          src="/images/ReviewThumbnail.svg"
          alt="리뷰등록썸네일"
          width={54}
          height={54}
        />
        <textarea placeholder="후기를 작성해 주세요" />
      </section>
      <section>
        <div>와인의 맛은 어땠나요?</div>
        <SliderGrop items={wineSliderData} type={false} />
      </section>
      <section>
        <div>기억에 남는 향이 있나요?</div>
      </section>
    </div>
  );
};

export default Review;
