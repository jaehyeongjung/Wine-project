import React from 'react';
import styles from './wines.module.css';
import Header from '@/components/layout/Header';
import Input from '@/components/common/Input';
import StarRating from '@/components/common/StarRating';

const Wines: React.FC = () => {
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
      <div className={styles.winesContainer}>
        <div className={styles.winesRecommend}>
          <p className={styles.winesRecommendText}>이번 달 추천 와인</p>
          <div className={styles.wineRecommendSlide}>
            <div className={styles.wineRecommendSlideMap}>
              <div className={styles.wineRecoomnedSlideInner}>
                <div className={styles.wineRecommendSlideImg}>
                  <img src="/images/testWine.svg" alt="와인 이미지" />
                </div>
                <div className={styles.wineRecommendSlideData}>
                  <div className={styles.RecommendContentRating}>
                    <p className={styles.RecommnedContentRaitingNumber}>4.8</p>
                    <div className={styles.starRatingContiner}>
                      <StarRating rating={4.8} size={12.84} />
                    </div>
                    <p
                      className={`${styles.RecommendContentRatingText} text-xs-regular`}
                    >
                      Sentinel Carbernet Sauvignon 2016
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.custom_input_wrapper}>
          <Input
            type="search"
            icon="search"
            placeholder="와인을 검색해 보세요"
            size="search"
          />
        </div>
        <div className={styles.wines_list}>
          <div className={styles.wines_listMapContainer}>
            {wineList.map((wine) => (
              <div key={wine.id} className={styles.wines_listMap}>
                <div className={styles.wines_lisMapDetailContainer}>
                  <div className={styles.wines_listMapDetail}>
                    <div className={styles.wines_listMapDetailImg}>
                      <img src={wine.image} alt="와인 이미지" />
                    </div>
                    <div className={styles.wines_listMapDetailContnet}>
                      <div className={styles.wines_listMapDetailContentData}>
                        <div className={styles.ContentTitleAndFrom}>
                          <div
                            className={`${styles.ContentTitle} text-3xl-semibold`}
                          >
                            {wine.name}
                          </div>
                          <div
                            className={`${styles.ContentFrom} text-lg-regular`}
                          >
                            {wine.origin}
                          </div>
                        </div>
                        <div className={styles.ContentRating}>
                          <p className={styles.ContentRatingNumber}>
                            {wine.rating}
                          </p>
                          <StarRating rating={wine.rating} size={17.12} />
                          <p
                            className={`${styles.ContentRatingTotal} text-md-regular`}
                          >
                            {wine.reviewCount}개 후기
                          </p>
                        </div>
                      </div>
                      <div className={styles.wines_listMapDetailContentPrice}>
                        <div className={`${styles.ContentPrice} text-xl-bold`}>
                          ₩ {wine.price.toLocaleString()}
                        </div>
                        <div className={styles.ContentPriceBtn}>
                          <img src="/icons/priceBtn.svg" alt="가격 버튼" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.wines_lisMapReviewContianer}>
                  <div className={styles.wines_listMapReview}>
                    <p
                      className={`${styles.wines_listMapReviewTitle} text-lg-semibold`}
                    >
                      최신후기
                    </p>
                    <p
                      className={`${styles.wines_listMapReviewContent} text-lg-regular`}
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
