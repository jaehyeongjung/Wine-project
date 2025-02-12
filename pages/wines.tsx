import React from 'react';
import styles from './wines.module.css';
import Header from '@/components/layout/Header';
import Input from '@/components/common/Input';
import StarRating from '@/components/common/StarRating';
import useDevice from '@/hooks/useDevice';

const Wines: React.FC = () => {
  const { mode } = useDevice();
  const wineList = [
    {
      id: 1,
      name: 'Sentinel Cabernet Sauvignon 2016',
      origin: 'Western Cape, South Africa',
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
      rating: 4.9,
      reviewCount: 120,
      price: 450000,
      image: '/images/testWine.svg',
      review:
        'Silky tannins with a deep berry flavor, hint of chocolate, and an elegant long finish.',
    },
  ];

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
          <div
            className={`${styles.winesRecommendSlide} ${styles[`winesRecommendSlide_${mode}`]}`}
          >
            <div
              className={`${styles.winesRecommendSlideMap} ${styles[`winesRecommendSlideMap_${mode}`]}`}
            >
              <div
                className={`${styles.winesRecommendSlideInner} ${styles[`winesRecommendSlideInner_${mode}`]}`}
              >
                <div
                  className={`${styles.winesRecommendSlideImg} ${styles[`winesRecommendSlideImg_${mode}`]}`}
                >
                  <img src="/images/testWine.svg" alt="와인 이미지" />
                </div>
                <div
                  className={`${styles.winesRecommendSlideData} ${styles[`winesRecommendSlideData_${mode}`]}`}
                >
                  <div
                    className={`${styles.RecommendContentRating} ${styles[`RecommendContentRating_${mode}`]}`}
                  >
                    <p
                      className={`${styles.RecommnedContentRaitingNumber} ${styles[`RecommendContentRatingNumber_${mode}`]}`}
                    >
                      4.8
                    </p>
                    <div
                      className={`${styles.starRatingContainer} ${styles[`starRatingContainer_${mode}`]}`}
                    >
                      <StarRating rating={4.8} size={12.84} />
                    </div>
                    <p
                      className={`${styles.RecommendContentRatingText} ${styles[`RecommendContentRatingText_${mode}`]} text-xs-regular`}
                    >
                      Sentinel Carbernet Sauvignon 2016
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                className={`${styles.wines_listMap} ${styles[`wines_listMapContainer_${mode}`]}`}
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
                          className={`${styles.ContentRating} ${styles[`ContentRaing_${mode}`]}`}
                        >
                          <p
                            className={`${styles.ContentRatingNumber} ${styles[`ContentRaingNumber_${mode}`]}`}
                          >
                            {wine.rating}
                          </p>
                          <StarRating rating={wine.rating} size={17.12} />
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
                  className={`${styles.wines_listMapReviewContianer} ${styles[`wines_listMapReviewContainer_${mode}`]}`}
                >
                  <div
                    className={`${styles.wines_listMapReview} ${styles[`wines_listMapReview_${mode}`]}`}
                  >
                    <p
                      className={`${styles.wines_listMapReviewTitle} ${styles[`wines_listMapReviewTitle`]} text-lg-semibold`}
                    >
                      최신후기
                    </p>
                    <p
                      className={`${styles.wines_listMapReviewContent} ${styles[`wines_listMapReviewContent`]} text-lg-regular`}
                    >
                      {wine.review}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.winesFilter}></div>
      </div>
    </>
  );
};

export default Wines;
