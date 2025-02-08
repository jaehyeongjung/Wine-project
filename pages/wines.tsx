import React from 'react';
import styles from './wines.module.css';
import Header from '@/components/layout/Header';
import Input from './components/common/Input';
import StarRating from '@/pages/components/common/StarRating';

const Wines: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.winesContainer}>
        <div className={styles.winesRecommend}></div>
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
            <div className={styles.wines_listMap}>
              <div className={styles.wines_lisMapDetailContainer}>
                <div className={styles.wines_listMapDetail}>
                  <div className={styles.wines_listMapDetailImg}>
                    <img src="/images/testWine.svg" alt="와인 이미지" />
                  </div>
                  <div className={styles.wines_listMapDetailContnet}>
                    <div className={styles.wines_listMapDetailContentData}>
                      <div className={styles.ContentTitleAndFrom}>
                        <div
                          className={`${styles.ContentTitle} text-3xl-semibold`}
                        >
                          Sentinel Carbernet Sauvignon 2016
                        </div>
                        <div
                          className={`${styles.ContentFrom} text-lg-regular`}
                        >
                          Western Cape, South Africa
                        </div>
                      </div>
                      <div className={styles.ContentRating}>
                        <p className={styles.ContentRatingNumber}>4.8</p>
                        <StarRating rating={2} size={17.12} />
                        <p
                          className={`${styles.ContentRatingTotal} text-md-regular`}
                        >
                          47개 후기
                        </p>
                      </div>
                    </div>
                    <div className={styles.wines_listMapDetailContentPrice}>
                      <div className={`${styles.ContentPrice} text-xl-bold`}>
                        ₩ 64,990
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
                    Cherry, cocoa, vanilla and clove - beautiful red fruit
                    driven Amarone. Low acidity and medium tannins. Nice long
                    velvety finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.winesFilter}></div>
      </div>
      ;
    </>
  );
};

export default Wines;
