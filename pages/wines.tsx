import React, { useRef, useState } from 'react';
import styles from './wines.module.css';
import Header from '@/components/layout/Header';
import Input from '@/components/common/Input';
import StarRating from '@/components/common/StarRating';
import useDevice from '@/hooks/useDevice';
import Button from '@/components/common/Button';
import PriceSlide from '@/components/PriceSilde/PriceSlide';

const Wines: React.FC = () => {
  const { mode } = useDevice();
  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 참조
  const wineList = [
    {
      id: 1,
      name: 'Sentinel Cabernet Sauvignon 2016',
      origin: 'Western Cape, South Africa',
      type: 'Red',
      rating: 4.8,
      reviewCount: 47,
      price: 64990,
      image: '/images/testWine.svg',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 2,
      name: 'Opus One 2018',
      origin: 'Napa Valley, USA',
      type: 'White',
      rating: 4.9,
      reviewCount: 120,
      price: 450000,
      image: '/images/testWine.svg',
      review:
        'Silky tannins with a deep berry flavor, hint of chocolate, and an elegant long finish.',
    },
    {
      id: 3,
      name: 'Opus One 2018',
      origin: 'Napa Valley, USA',
      rating: 4.9,
      type: 'Sparkling',
      reviewCount: 120,
      price: 450000,
      image: '/images/testWine.svg',
      review:
        'Silky tannins with a deep berry flavor, hint of chocolate, and an elegant long finish.',
    },
    {
      id: 4,
      name: 'Opus One 2018',
      origin: 'Napa Valley, USA',
      rating: 4.9,
      type: 'Sparkling',
      reviewCount: 120,
      price: 450000,
      image: '/images/testWine.svg',
      review:
        'Silky tannins with a deep berry flavor, hint of chocolate, and an elegant long finish.',
    },
    {
      id: 5,
      name: 'Opus One 2018',
      origin: 'Napa Valley, USA',
      rating: 4.9,
      type: 'Sparkling',
      reviewCount: 120,
      price: 450000,
      image: '/images/testWine.svg',
      review:
        'Silky tannins with a deep berry flavor, hint of chocolate, and an elegant long finish.',
    },

    {
      id: 6,
      name: 'Opus One 2018',
      origin: 'Napa Valley, USA',
      rating: 4.9,
      type: 'Sparkling',
      reviewCount: 120,
      price: 450000,
      image: '/images/testWine.svg',
      review:
        'Silky tannins with a deep berry flavor, hint of chocolate, and an elegant long finish.',
    },
    {
      id: 2,
      name: 'Opus One 2018',
      origin: 'Napa Valley, USA',
      rating: 4.9,
      reviewCount: 120,
      type: 'Sparkling',
      price: 450000,
      image: '/images/testWine.svg',
      review:
        'Silky tannins with a deep berry flavor, hint of chocolate, and an elegant long finish.',
    },
    {
      id: 7,
      name: 'Opus One 2018',
      origin: 'Napa Valley, USA',
      rating: 4.9,
      reviewCount: 120,
      price: 450000,
      type: 'Sparkling',
      image: '/images/testWine.svg',
      review:
        'Silky tannins with a deep berry flavor, hint of chocolate, and an elegant long finish.',
    },
  ];

  const getStarRatingSize = () => {
    if (mode === 'mobile') {
      return 8.56; // 모바일일 때 크기
    }
    return 12.84; // 데스크탑과 테블릿일 때 기본 크기
  };

  const getStarRatingSize2 = () => {
    if (mode === 'mobile') {
      return 9.99; // 모바일일 때 크기
    }
    return 17.12; // 데스크탑과 테블릿일 때 기본 크기
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 250; // 한 번에 이동할 거리 (픽셀)
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth', // 부드러운 스크롤
      });
    }
  };

  const [selectedType, setSelectedType] = useState<string>(''); // 선택된 와인 타입
  const [ratingFilter, setRatingFilter] = useState<{ [key: string]: boolean }>({
    all: true, // 전체
    '4.5-5.0': false, // 4.5 ~ 5.0
    '4.0-4.5': false, // 4.0 ~ 4.5
    '3.5-4.0': false, // 3.5 ~ 4.0
    '3.0-3.5': false, // 3.0 ~ 3.5
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  // 와인 타입 버튼 클릭 시 필터링
  const handleTypeFilter = (type: string) => {
    setSelectedType(type === selectedType ? '' : type); // 클릭한 타입을 선택/해제
  };

  // Rating 체크박스 변경 시 필터링
  const handleRatingFilter = (ratingRange: string) => {
    setRatingFilter((prevState) => ({
      ...prevState,
      [ratingRange]: !prevState[ratingRange], // 체크박스 상태 변경
    }));
  };

  // 가격 슬라이더 변경 시 필터링
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setPriceRange((prevRange) => {
      return prevRange[0] <= newValue
        ? [prevRange[0], newValue]
        : [newValue, prevRange[1]];
    });
  };

  // 필터링된 와인 리스트
  const filteredWineList = wineList.filter((wine) => {
    const matchesType = selectedType ? wine.type === selectedType : true;

    const matchesRating = Object.keys(ratingFilter).some((key) => {
      if (ratingFilter[key]) {
        if (key === 'all') return true;
        const [min, max] = key.split('-').map(Number);
        return wine.rating >= min && wine.rating < max;
      }
      return false;
    });

    const matchesPrice =
      wine.price >= priceRange[0] && wine.price <= priceRange[1];

    return matchesType && matchesRating && matchesPrice;
  });

  return (
    <>
      <Header />
      <div
        className={`${styles.winesContainer} ${styles[`winesContainer_${mode}`]}`}
      >
        <div
          className={`${styles.winesRecommend} ${styles[`winesRecommend_${mode}`]}`}
        >
          <p
            className={`${styles.winesRecommendText} ${styles[`winesRecommendText_${mode}`]}`}
          >
            이번 달 추천 와인
          </p>

          <button
            className={`${styles.scrollButtonLeft} ${styles[`scrollButtonLeft_${mode}`]}`}
            onClick={() => scroll('left')}
          >
            <img src="/icons/leftBtn.png"></img>
          </button>
          <button
            className={`${styles.scrollButtonRight} ${styles[`scrollButtonRight_${mode}`]}`}
            onClick={() => scroll('right')}
          >
            <img src="/icons/rightBtn.png"></img>
          </button>
          <div
            ref={scrollRef}
            className={`${styles.winesRecommendSlide} ${styles[`winesRecommendSlide_${mode}`]}`}
          >
            {wineList.map((wine) => (
              <div
                key={wine.id}
                className={`${styles.winesRecommendSlideMap} ${styles[`winesRecommendSlideMap_${mode}`]}`}
              >
                <div
                  className={`${styles.winesRecommendSlideInner} ${styles[`winesRecommendSlideInner_${mode}`]}`}
                >
                  <div
                    className={`${styles.winesRecommendSlideImg} ${styles[`winesRecommendSlideImg_${mode}`]}`}
                  >
                    <img src={wine.image} alt={wine.name} />
                  </div>
                  <div
                    className={`${styles.winesRecommendSlideData} ${styles[`winesRecommendSlideData_${mode}`]}`}
                  >
                    <div
                      className={`${styles.RecommendContentRating} ${styles[`RecommendContentRating_${mode}`]}`}
                    >
                      <p
                        className={`${styles.RecommendContentRatingNumber} ${styles[`RecommendContentRatingNumber_${mode}`]}`}
                      >
                        {wine.rating}
                      </p>
                      <div
                        className={`${styles.starRatingContainer} ${styles[`starRatingContainer_${mode}`]}`}
                      >
                        <StarRating
                          rating={wine.rating}
                          size={getStarRatingSize()}
                        />
                      </div>
                      <p
                        className={`${styles.RecommendContentRatingText} ${styles[`RecommendContentRatingText_${mode}`]} text-xs-regular`}
                      >
                        {wine.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${styles.custom_input_wrapper} ${styles[`custom_input_wrapper_${mode}`]}`}
        >
          <Input
            type="search"
            icon="search"
            placeholder="와인을 검색해 보세요"
            size="search"
          />
        </div>
        <div className={`${styles.wines_list} ${styles[`wines_list_${mode}`]}`}>
          <div
            className={`${styles.wines_listMapContainer} ${styles[`wines_listMapContainer_${mode}`]}`}
          >
            {wineList.map((wine) => (
              <div
                key={wine.id}
                className={`${styles.wines_listMap} ${styles[`wines_listMap_${mode}`]}`}
              >
                <div
                  className={`${styles.wines_listMapDetailContainer} ${styles[`wines_listMapDetailContainer_${mode}`]}`}
                >
                  <div
                    className={`${styles.wines_listMapDetail} ${styles[`wines_listMapDetail_${mode}`]}`}
                  >
                    <div
                      className={`${styles.wines_listMapDetailImg} ${styles[`wines_listMapDetailImg_${mode}`]}`}
                    >
                      <img src={wine.image} alt="와인 이미지" />
                    </div>
                    <div
                      className={`${styles.wines_listMapDetailContent} ${styles[`wines_listMapDetailContent_${mode}`]}`}
                    >
                      <div
                        className={`${styles.wines_listMapDetailContentData} ${styles[`wines_listMapDetailContentData_${mode}`]}`}
                      >
                        <div
                          className={`${styles.ContentTitleAndFrom} ${styles[`ContentTitleAndFrom_${mode}`]}`}
                        >
                          <div
                            className={`${styles.ContentTitle} ${styles[`ContentTitle_${mode}`]} text-3xl-semibold`}
                          >
                            {wine.name}
                          </div>
                          <div
                            className={`${styles.ContentFrom} ${styles[`ContentFrom_${mode}`]} text-lg-regular`}
                          >
                            {wine.origin}
                          </div>
                        </div>
                        <div
                          className={`${styles.ContentRating} ${styles[`ContentRating_${mode}`]}`}
                        >
                          <p
                            className={`${styles.ContentRatingNumber} ${styles[`ContentRatingNumber_${mode}`]}`}
                          >
                            {wine.rating}
                          </p>
                          <StarRating
                            rating={wine.rating}
                            size={getStarRatingSize2()}
                          />
                          <p
                            className={`${styles.ContentRatingTotal} ${styles[`ContentRatingTotal_${mode}`]} text-md-regular`}
                          >
                            {wine.reviewCount}개 후기
                          </p>
                        </div>
                      </div>
                      <div
                        className={`${styles.wines_listMapDetailContentPrice} ${styles[`wines_listMapDetailContentPrice_${mode}`]}`}
                      >
                        <div
                          className={`${styles.ContentPrice} ${styles[`ContentPrice_${mode}`]} text-xl-bold`}
                        >
                          ₩ {wine.price.toLocaleString()}
                        </div>
                        <div
                          className={`${styles.ContentPriceBtn} ${styles[`ContentPriceBtn_${mode}`]}`}
                        >
                          <img src="/icons/priceBtn.svg" alt="가격 버튼" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.wines_listMapReviewContainer} ${styles[`wines_listMapReviewContainer_${mode}`]}`}
                >
                  <div
                    className={`${styles.wines_listMapReview} ${styles[`wines_listMapReview_${mode}`]}`}
                  >
                    <p
                      className={`${styles.wines_listMapReviewTitle} ${styles[`wines_listMapReviewTitle_${mode}`]} text-lg-semibold`}
                    >
                      최신후기
                    </p>
                    <p
                      className={`${styles.wines_listMapReviewContent} ${styles[`wines_listMapReviewContent_${mode}`]} text-lg-regular`}
                    >
                      {wine.review}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${styles.winesFilter} ${styles[`winesFilter_${mode}`]}`}
        >
          <div
            className={`${styles.winesFilterInner} ${styles[`winesFilterInner_${mode}`]}`}
          >
            <div
              className={`${styles.winesFilterInnerType} ${styles[`winesFilterInnerType_${mode}`]}`}
            >
              <div
                className={`${styles.winesFilterInnerTypeTitle} ${styles[`winesFilterInnerTypeTitle_${mode}`]}`}
              >
                WINE TYPES
              </div>
              <div
                className={`${styles.winesFilterInnerTypeContainer} ${styles[`winesFilterInnerTypeContainer_${mode}`]}`}
              >
                <button
                  onClick={() => handleTypeFilter('Red')}
                  className={`${styles.filterButtonRed} ${selectedType === 'Red' ? styles.selected : ''}`}
                >
                  Red
                </button>
                <button
                  onClick={() => handleTypeFilter('White')}
                  className={`${styles.filterButtonWhite} ${selectedType === 'White' ? styles.selected : ''}`}
                >
                  White
                </button>
                <button
                  onClick={() => handleTypeFilter('Sparkling')}
                  className={`${styles.filterButtonSparkling} ${selectedType === 'Sparkling' ? styles.selected : ''}`}
                >
                  Sparkling
                </button>
              </div>
            </div>
            <div
              className={`${styles.winesFilterInnerPrice} ${styles[`winesFilterInnerPrice_${mode}`]}`}
            >
              <div
                className={`${styles.winesFilterInnerPriceTitle} ${styles[`winesFilterInnerPriceTitle_${mode}`]}`}
              >
                PRICE
              </div>
              <div
                className={`${styles.winesFilterInnerPriceScroll} ${styles[`winesFilterInnerPriceScroll_${mode}`]}`}
              >
                <div
                  className={`${styles.winesFilterPrice} ${styles[`winesFilterPrice_${mode}`]}`}
                >
                  <PriceSlide />
                </div>
              </div>
            </div>
            <div
              className={`${styles.winesFilterInnerRating} ${styles[`winesFilterInnerRating_${mode}`]}`}
            >
              <div
                className={`${styles.winesFilterInnerRatingTitle} ${styles[`winesFilterInnerRatingTitle_${mode}`]}`}
              >
                RATING
              </div>
              <label
                className={`${styles.FilterRatingAll} ${styles[`FilterRatingAll_${mode}`]}`}
              >
                <input
                  type="checkbox"
                  checked={ratingFilter.all}
                  onChange={() => handleRatingFilter('all')}
                />
                <p
                  className={`${styles.RatingNumberAll} ${styles[`RatingNumberAll_${mode}`]}`}
                >
                  전체
                </p>
              </label>
              <label
                className={`${styles.FilterRatingFirst} ${styles[`FilterRatingFirst_${mode}`]}`}
              >
                <input
                  type="checkbox"
                  checked={ratingFilter['4.5-5.0']}
                  onChange={() => handleRatingFilter('4.5-5.0')}
                />
                <p
                  className={`${styles.RatingNumber} ${styles[`RatingNumber_${mode}`]}`}
                >
                  4.5 - 5.0
                </p>
              </label>
              <label
                className={`${styles.FilterRatingFirst} ${styles[`FilterRatingFirst_${mode}`]}`}
              >
                <input
                  type="checkbox"
                  checked={ratingFilter['4.0-4.5']}
                  onChange={() => handleRatingFilter('4.0-4.5')}
                />
                <p
                  className={`${styles.RatingNumber} ${styles[`RatingNumber_${mode}`]}`}
                >
                  4.0 - 4.5
                </p>
              </label>
              <label
                className={`${styles.FilterRatingFirst} ${styles[`FilterRatingFirst_${mode}`]}`}
              >
                <input
                  type="checkbox"
                  checked={ratingFilter['3.5-4.0']}
                  onChange={() => handleRatingFilter('3.5-4.0')}
                />
                <p
                  className={`${styles.RatingNumber} ${styles[`RatingNumber_${mode}`]}`}
                >
                  3.5 - 4.0
                </p>
              </label>
              <label
                className={`${styles.FilterRatingFirst} ${styles[`FilterRatingFirst_${mode}`]}`}
              >
                <input
                  type="checkbox"
                  checked={ratingFilter['3.0-3.5']}
                  onChange={() => handleRatingFilter('3.0-3.5')}
                />

                <p
                  className={`${styles.RatingNumber} ${styles[`RatingNumber_${mode}`]}`}
                >
                  3.0 - 3.5
                </p>
              </label>
            </div>
          </div>
        </div>
        <div
          className={`${styles.winesFilterBtn} ${styles[`winesFilterBtn_${mode}`]}`}
        >
          <Button
            type="default"
            size="width284"
            text="와인 등록하기"
            color="purple"
            textColor="white"
          ></Button>
        </div>
      </div>
    </>
  );
};

export default Wines;
