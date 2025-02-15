import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale'; // 한국어 로케일 임포트
import SliderGroup from '../SliderGroup';
import Modal from '../Modal';
import styles from './WineReview.module.css';
import useDevice from '../../../hooks/useDevice';
import { fetchWineReview } from '../../../pages/api/wines/wineReviewApi';

const WineReview: React.FC = () => {
  const [reviewData, setReviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query as { id?: string }; // 타입 추가
  const { mode } = useDevice();

  const [expandedReviews, setExpandedReviews] = useState<
    Record<string, boolean>
  >({});
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
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
    setIsLoading(true);
    fetchWineReview(id, router).then((data) => {
      setReviewData(data);
      setIsLoading(false);
    });
  }, [id, router.isReady]);

  const toggleExpanded = (reviewId: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const toggleLike = (reviewId: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const getClassNames = (
    baseClass: string,
    modeClass: string,
    condition: boolean,
  ) => {
    return `${baseClass} ${modeClass} ${condition ? styles.expanded : ''}`;
  };

  return (
    <div>
      {reviewData?.reviews?.map((review: any) => (
        <div
          key={review.id}
          className={getClassNames(
            styles.reviewBox,
            styles[`reviewBox_${mode}`],
            expandedReviews[review.id],
          )}
        >
          <div className={styles.reviewHeader}>
            <div className={styles.profileBox}>
              <img
                className={`${styles.profile} ${styles[`profile_${mode}`]}`}
                src="/images/profile.svg"
                alt="profile"
              />
              <div className={styles.profileInfo}>
                <p
                  className={`${styles.nickname} ${styles[`nickname_${mode}`]}`}
                >
                  {review.user?.nickname || '닉네임 없음'}
                </p>
                <p className={`${styles.timeAgo} ${styles[`timeAgo_${mode}`]}`}>
                  {/* 날짜를 한국어로 상대적인 시간으로 변환 */}
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </p>
              </div>
            </div>
            <div className={`${styles.iconBox} ${styles[`iconBox_${mode}`]}`}>
              <img
                className={`${styles.likeIcon} ${styles[`likeIcon_${mode}`]}`}
                src={
                  likedReviews[review.id]
                    ? '/icons/like.svg'
                    : '/icons/empty-like.svg'
                }
                alt="like"
                onClick={() => toggleLike(review.id)}
              />
              <img
                className={`${styles.drop_btn} ${styles[`drop_btn_${mode}`]}`}
                src="/icons/dropDown.svg"
                alt="dropDown-btn"
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
                  {aromaMapping[aroma] || ''}{' '}
                  {/* 매핑된 향이 없으면 빈 문자열 */}
                </span>
              ))}
            </div>

            <div
              className={`${styles.reviewRating} ${styles[`reviewRating_${mode}`]}`}
            >
              <img
                className={`${styles.ratingStars} ${styles[`ratingStars_${mode}`]}`}
                src="/icons/starColor.svg"
                alt="점수"
              />
              <span
                className={`${styles.ratingNum} ${styles[`ratingNum_${mode}`]}`}
              >
                {review.rating.toFixed(1)} {/* 소수점 1자리까지 표시 */}
              </span>
            </div>
          </div>

          {expandedReviews[review.id] && (
            <>
              <p className={`${styles.comment} ${styles[`comment_${mode}`]}`}>
                {review.content || '내용 없음'}
              </p>

              <SliderGroup
                values={{
                  lightBold: 50,
                  smoothTannic: 70,
                  drySweet: 30,
                  softAcidic: 20,
                }}
                disabled
              />
            </>
          )}

          <div className={styles.arrowContainer}>
            <img
              className={styles.arrowIcon}
              src={
                expandedReviews[review.id]
                  ? '/icons/arrowUp.svg'
                  : '/icons/arrowDown.svg'
              }
              alt={expandedReviews[review.id] ? '접기' : '열기'}
              onClick={() => toggleExpanded(review.id)}
            />
          </div>
        </div>
      ))}

      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div className={styles.option} onClick={() => alert('수정하기 테스트')}>
          수정하기
        </div>
        <div className={styles.option} onClick={() => alert('삭제하기 테스트')}>
          삭제하기
        </div>
      </Modal>
    </div>
  );
};

export default WineReview;
