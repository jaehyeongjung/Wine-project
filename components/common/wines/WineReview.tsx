import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import SliderGroup from '../SliderGroup';
import Modal from '../Modal';
import styles from './WineReview.module.css';
import useDevice from '../../../hooks/useDevice';
import {
  getWineDetail,
  updateReviewLike,
} from '../../../pages/api/wines/wineReviewApi';
import Image from 'next/image';
import Button from '../Button';
import InfiniteScroll from 'react-infinite-scroll-component';

const WineReview: React.FC = () => {
  const [reviewData, setReviewData] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState<
    Record<string, boolean>
  >({});
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const { mode } = useDevice();

  const aromaMapping: Record<string, string> = {
    CHERRY: '체리',
    BERRY: '베리',
    OAK: '오크',
    VANILLA: '바닐라',
    PEPPER: '후추',
    BAKING: '제빵',
    GRASS: '풀',
    APPLE: '사과',
    PEACH: '복숭아',
    CITRUS: '시트러스',
    TROPICAL: '트로피컬',
    MINERAL: '미네랄',
    FLOWER: '꽃',
    TABACCO: '담뱃잎',
    SOIL: '흙',
    CHOCOLATE: '초콜릿',
    SPICE: '스파이스',
    CARAMEL: '카라멜',
    LEATHER: '가죽',
  };

  useEffect(() => {
    if (!router.isReady || !id) return;
    fetchReviewData();
  }, [id, router.isReady]);

  const toggleExpanded = (reviewId: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const [offset, setOffset] = useState(0);
  const limit = 5;

  const fetchReviewData = async () => {
    if (!id) return;

    try {
      const data = await getWineDetail(id, router, limit, offset);
      if (!data || !data.reviews) {
        setHasMore(false);
        return;
      }

      setReviewData((prevData: any) => {
        if (!prevData) return { ...data, reviews: data.reviews };

        const existingReviewIds = new Set(
          prevData.reviews.map((r: any) => r.id),
        );
        const newReviews = data.reviews.filter(
          (r: any) => !existingReviewIds.has(r.id),
        );

        if (newReviews.length < limit) {
          setHasMore(false);
        }

        return { ...prevData, reviews: [...prevData.reviews, ...newReviews] };
      });

      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.log('리뷰 데이터를 불러오는 데 실패했습니다:', error);
      setHasMore(false);
    }
  };

  //좋와요
  const toggleLike = async (reviewId: string, isLiked: boolean) => {
    try {
      setReviewData((prevData: any) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          reviews: prevData.reviews.map((review: any) =>
            review.id === reviewId ? { ...review, isLiked: !isLiked } : review,
          ),
        };
      });

      await updateReviewLike(reviewId, isLiked);
    } catch (error) {
      console.log('좋아요 요청 실패:', error);
    }
  };

  return (
    <div>
      {reviewData?.reviews?.length === 0 ? (
        <div
          className={`${styles.noReviewBox} ${styles[`noReviewBox_${mode}`]}`}
        >
          <Image
            src="/images/noReview.svg"
            alt="noreview"
            width={mode === 'mobile' ? 100 : 136}
            height={mode === 'mobile' ? 100 : 136}
          />
          <p className={`${styles.nocoment} ${styles[`nocoment_${mode}`]}`}>
            작성된 리뷰가 없어요
          </p>
          <Button
            type="default"
            size={mode === 'mobile' ? 'width137' : 'width169'}
            color="purple"
            textColor="white"
            text="리뷰 남기기"
          />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={reviewData?.reviews?.length || 0}
          next={fetchReviewData}
          hasMore={hasMore}
          loader={<p>로딩 중...</p>}
          endMessage={<p>더 이상 리뷰가 없습니다.</p>}
        >
          {reviewData?.reviews?.map((review: any) => (
            <div
              key={review.id}
              className={`${styles.reviewBox} ${styles[`reviewBox_${mode}`]} ${
                expandedReviews[review.id] ? styles.expanded : ''
              }`}
            >
              <div className={styles.reviewHeader}>
                <div className={styles.profileBox}>
                  <Image
                    className={`${styles.profile} ${styles[`profile_${mode}`]}`}
                    src={review.user?.image || '/images/profile.svg'}
                    alt="profile"
                    width={50}
                    height={50}
                    objectFit="cover"
                  />

                  <div className={styles.profileInfo}>
                    <p
                      className={`${styles.nickname} ${styles[`nickname_${mode}`]}`}
                    >
                      {review.user?.nickname || '익명'}
                    </p>
                    <p
                      className={`${styles.timeAgo} ${styles[`timeAgo_${mode}`]}`}
                    >
                      {formatDistanceToNow(new Date(review.createdAt), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </p>
                  </div>
                </div>
                <div
                  className={`${styles.iconBox} ${styles[`iconBox_${mode}`]}`}
                >
                  <div onClick={() => toggleLike(review.id, review.isLiked)}>
                    <Image
                      className={`${styles.likeIcon} ${styles[`likeIcon_${mode}`]}`}
                      src={
                        review.isLiked
                          ? '/icons/like.svg'
                          : '/icons/empty-like.svg'
                      }
                      alt="like"
                      width={24}
                      height={24}
                    />
                  </div>

                  <Image
                    className={`${styles.drop_btn} ${styles[`drop_btn_${mode}`]}`}
                    src="/icons/dropDown.svg"
                    alt="dropDown-btn"
                    width={24}
                    height={24}
                    onClick={() => setShowModal(true)}
                  />
                </div>
              </div>

              <div className={styles.infoBox}>
                <div className={`${styles.tagBox} ${styles[`tagBox_${mode}`]}`}>
                  {review.aroma?.map((aroma: string) => (
                    <span
                      key={aroma}
                      className={`${styles.tag} ${styles[`tag_${mode}`]}`}
                    >
                      {aromaMapping[aroma] || ''}
                    </span>
                  ))}
                </div>

                <div
                  className={`${styles.reviewRating} ${styles[`reviewRating_${mode}`]}`}
                >
                  <Image
                    className={`${styles.ratingStars} ${styles[`ratingStars_${mode}`]}`}
                    src="/icons/starColor.svg"
                    alt="점수"
                    width={16}
                    height={16}
                  />
                  <span
                    className={`${styles.ratingNum} ${styles[`ratingNum_${mode}`]}`}
                  >
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {expandedReviews[review.id] && (
                <>
                  <p
                    className={`${styles.comment} ${styles[`comment_${mode}`]}`}
                  >
                    {review.content}
                  </p>

                  <SliderGroup
                    values={{
                      lightBold: review.lightBold,
                      smoothTannic: review.smoothTannic,
                      drySweet: review.drySweet,
                      softAcidic: review.softAcidic,
                    }}
                    disabled
                  />
                </>
              )}

              <div className={styles.arrowContainer}>
                <Image
                  className={styles.arrowIcon}
                  src={
                    expandedReviews[review.id]
                      ? '/icons/arrowUp.svg'
                      : '/icons/arrowDown.svg'
                  }
                  alt={expandedReviews[review.id] ? '접기' : '열기'}
                  width={16}
                  height={16}
                  onClick={() => toggleExpanded(review.id)}
                />
              </div>
            </div>
          ))}
        </InfiniteScroll>
      )}

      {/* <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div className={styles.option} onClick={() => alert('수정하기 테스트')}>
          수정하기
        </div>
        <div className={styles.option} onClick={() => alert('삭제하기 테스트')}>
          삭제하기
        </div>
      </Modal> */}
    </div>
  );
};

export default WineReview;
