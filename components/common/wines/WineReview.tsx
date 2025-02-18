import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import SliderGroup from '../SliderGroup';
import Modal from '@/components/common/Modal';
import Review from '@/components/layout/Modal/Review';
import DeleteModalLayout from '@/components/layout/Modal/DeleteModalLayout';
import styles from './wineReview.module.css';
import useDevice from '../../../hooks/useDevice';
import {
  getWineDetail,
  updateReviewLike,
} from '../../../pages/api/wines/wineReviewApi';
import Image from 'next/image';
import Button from '../Button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReviewDelete } from '@/pages/api/review';
import BottomSheet from '@/components/common/BottomSheet';

interface Props {
  review: {
    id: number;
    content: string;
    rating: number;
    // 필요한 다른 필드들
  };
  closeModal: () => void;
}

const WineReview: React.FC = () => {
  const [reviewData, setReviewData] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState<
    Record<string, boolean>
  >({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [reviewId, setReviewId] = useState<number | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [wineData, setWineData] = useState<any>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const wineId = Array.isArray(id) ? id[0] : id;
  const { mode } = useDevice();
  const isMobile = mode === 'mobile';
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const dropdownRef = useRef<HTMLUListElement>(null); // 드롭다운 참조 추가
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
    TOBACCO: '담뱃잎',
    EARTH: '흙',
    CHOCOLATE: '초콜릿',
    SPICE: '스파이스',
    CARAMEL: '카라멜',
    LEATHER: '가죽',
  };

  useEffect(() => {
    console.log('selectedReview updated:', selectedReview);
  }, [selectedReview]);

  useEffect(() => {
    if (!router.isReady || !id) return;
    fetchReviewData();
  }, [id, router.isReady]);

  const handleReviewButtonClick = () => {
    setShowReviewModal(true); // 버튼 클릭 시 모달 열기
  };

  const toggleExpanded = (reviewId: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

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

        setReviewId(data.reviews[0]?.id);

        return { ...prevData, reviews: [...prevData.reviews, ...newReviews] };
      });

      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.log('리뷰 데이터를 불러오는 데 실패했습니다:', error);
      setHasMore(false);
    }
  };

  // 좋아요 클릭 핸들러
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

  // 이미지 클릭 시 모달 위치 설정
  const handleDropdownClick = (review: any, e: React.MouseEvent) => {
    const { top, left, height } = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: top + height + window.scrollY, // 드롭다운 위치 설정
      left: left,
    });

    // 드롭다운 메뉴가 열린 상태로 표시
    setIsEditOpen(false); // 수정 모달 닫기
    setIsDeleteOpen(false); // 삭제 모달 닫기
    setDropdownVisible(true); // 드롭다운 메뉴 보이게 설정

    // reviewData.reviews 배열에서 id가 review.id와 일치하는 리뷰를 찾기
    const selectedReview = reviewData.reviews.find(
      (item: any) => item.id === review.id,
    );

    // 선택된 리뷰를 상태에 저장
    setSelectedReview(selectedReview || null);

    setReviewId(review.id); // 선택된 리뷰 ID 저장
  };

  const handleEditClick = (selectedReview: any) => {
    console.log('수정할 리뷰:', selectedReview); // 리뷰 객체 확인
    setIsEditOpen(true); // 수정 모달 열기
    setSelectedReview(selectedReview); // 선택된 리뷰 설정
    setIsDeleteOpen(false); // 삭제 모달 닫기
    setDropdownVisible(false); // 드롭다운 메뉴 닫기
  };

  const handleDeleteClick = (review: any) => {
    console.log('삭제할 리뷰:', review); // 리뷰 객체 확인
    setSelectedReview(review); // 선택된 리뷰 설정
    setIsDeleteOpen(true); // 삭제 모달 열기
    setIsEditOpen(false); // 편집 모달 닫기
    setDropdownVisible(false); // 드롭다운 메뉴 닫기
  };

  const closeModals = () => {
    setIsEditOpen(false); // 수정 모달 닫기
    setIsDeleteOpen(false); // 삭제 모달 닫기
    setDropdownVisible(false); // 드롭다운 메뉴 닫기
  };

  // 외부 클릭 처리
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setDropdownVisible(false); // 드롭다운 메뉴도 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 수정된 부분: Modal 위치가 초기화되지 않도록 `useEffect`에서 모달 위치를 처리
  useEffect(() => {
    // 페이지가 처음 로드될 때 모달 위치를 업데이트하지 않도록 조건 추가
    if (isEditOpen) {
      const modalElement = document.querySelector(`.${styles.test}`);
      if (modalElement) {
        const { top, left, height } = modalElement.getBoundingClientRect();
        setModalPosition({
          top: top + height + window.scrollY + 300, // 버튼 아래로 조정
          left: left + 150,
        });
      }
    }
  }, [isEditOpen]);

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
            onClick={handleReviewButtonClick} // 버튼 클릭 시 바텀시트 열기
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
                    onClick={(e) => handleDropdownClick(review, e)} // 드롭다운 클릭 시 위치 설정
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

      {/* 리뷰 없을 때 등록하기 모달 또는 바텀시트 */}
      {isMobile ? (
        <BottomSheet
          closeBtn
          handleClose={() => setShowReviewModal(false)}
          isBottomSheet={false}
        >
          <Review
            closeModal={() => setShowReviewModal(false)}
            reviewData={{
              wineName: wineData?.name || '알 수 없음',
              wineId: Number(wineId),
            }}
            type="post"
          />
        </BottomSheet>
      ) : (
        <Modal
          className={`${styles.reviewModalBox} ${styles[`reviewModalBox_${mode}`]}`}
          showModal={showReviewModal}
          closeModal={() => setShowReviewModal(false)}
          closeBtn={true}
        >
          <Review
            closeModal={() => setShowReviewModal(false)}
            reviewData={{
              wineName: wineData?.name || '알 수 없음',
              wineId: Number(wineId),
            }}
            type="post"
          />
        </Modal>
      )}

      {/* 리뷰 수정하기, 바텀시트 미적용 */}
      <Modal
        className={`${styles.patchModal} ${styles[`patchModal_${mode}`]}`}
        showModal={isEditOpen}
        closeModal={closeModals}
        closeBtn={true}
      >
        <Review
          closeModal={closeModals}
          reviewData={selectedReview}
          type="patch"
        />
      </Modal>

      {/* 리뷰 삭제하기 */}
      <Modal
        className={`${styles.deleteModal} ${styles[`deleteModal_${mode}`]}`}
        showModal={isDeleteOpen}
        closeModal={closeModals}
      >
        {selectedReview && (
          <DeleteModalLayout
            reviewId={selectedReview}
            closeModal={closeModals}
          />
        )}
      </Modal>

      {/* 드롭다운 메뉴 */}
      {dropdownVisible && (
        <ul
          className={`${styles.modal} ${styles[`modal_${mode}`]}`}
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          ref={dropdownRef}
        >
          <li
            className={`${styles.fnSelect} ${styles[`fnSelect_${mode}`]}`}
            onClick={() => handleEditClick(selectedReview)} // 수정하기 클릭 시 수정 모달 열기
          >
            수정하기
          </li>
          <li
            className={`${styles.fnSelect} ${styles[`fnSelect_${mode}`]}`}
            onClick={() => handleDeleteClick(reviewId)}
          >
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
};

export default WineReview;
