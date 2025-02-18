import useDevice from '@/hooks/useDevice';
import styles from './ReviewCard.module.css';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '@/components/common/Modal';
import DeleteModalLayout from '@/components/layout/Modal/DeleteModalLayout';
import BottomSheet from '@/components/common/BottomSheet';
import RegisterModalLayout from '@/components/layout/Modal/RegisterModalLayout';
import Review from '@/components/layout/Modal/Review';
import { useRouter } from 'next/router';

interface Reviews {
  reviewId: number;
  wineId: number;
  wineName: string;
  content: string;
  created: string;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
}

export const ReviewCard = ({
  reviewId,
  wineId,
  wineName,
  content,
  created,
  rating,
  lightBold,
  smoothTannic,
  drySweet,
  softAcidic,
  aroma,
}: Reviews) => {
  console.log('wineId:', wineId);
  const router = useRouter();
  const [isDropDown, setIsDropDown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPatchModal, setShowPatchModal] = useState(false);
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [isScreen, setIsScreen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { mode } = useDevice();

  const goToWineDetail = () => {
    router.push(`/wines/${wineId}`);
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target as Node)
    ) {
      setIsDropDown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // 창 크기 변경 감지
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkScreenSize = () => {
      setIsScreen(window.innerWidth <= 375);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 닫기 함수
  const handleClose = () => {
    setShowDeleteModal(false);
    setShowPatchModal(false);
    setIsBottomSheet(false);
  };

  const timeAgo = (created: string) => {
    const now = new Date();
    const past = new Date(created);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    const days = Math.floor(diff / (3600 * 24)); // 일 계산
    const hours = Math.floor((diff % (3600 * 24)) / 3600); // 남은 시간 계산

    let result = '';
    if (days > 0) {
      result += `${days}일 `;
    }
    if (hours > 0) {
      result += `${hours}시간 전`;
    }

    return result || '방금 전'; // 만약 days나 hours가 0이면 '방금 전'을 출력
  };

  const ReviewPatchData = {
    reviewId: reviewId,
    wineId: wineId,
    wineName: wineName,
    rating: rating,
    content: content,
    taste: {
      lightBold: lightBold,
      smoothTannic: smoothTannic,
      drySweet: drySweet,
      softAcidic: softAcidic,
    },
    aroma: aroma,
  };

  return (
    <div
      ref={dropDownRef}
      className={`${styles.myComment} ${styles[`myComment_${mode}`]}`}
      onClick={goToWineDetail}
    >
      <div
        className={`${styles.myCommentMap} ${styles[`myCommentMap_${mode}`]}`}
      >
        <div
          className={`${styles.myCommentInner} ${styles[`myCommentInner_${mode}`]}`}
        >
          <div
            className={`${styles.myCommentInnerStarAndTimeContainer} ${styles[`myCommentInnerStarAndTimeContainer_${mode}`]}`}
          >
            <div
              className={`${styles.myCommentInnerStarAndTime} ${styles[`myCommentInnerStarAndTime_${mode}`]}`}
            >
              <div
                className={`${styles.myCommentInnerStar} ${styles[`myCommentInnerStar_${mode}`]}`}
              >
                <div
                  className={`${styles.myCommentInnerStarImg} ${styles[`myCommentInnerStarImg_${mode}`]}`}
                >
                  <img src="/icons/starColor.svg"></img>
                </div>
                <p
                  className={`${styles.myCommentInnerStarNum} ${styles[`myCommentInnerStarNum_${mode}`]} text-2lg-bold`}
                >
                  {rating.toPrecision(2)}
                </p>
              </div>
              <p
                className={`${styles.myCommentInnerTime} ${styles[`myCommentInnerTime_${mode}`]} text-lg-regular`}
              >
                {timeAgo(created)}
              </p>
            </div>
            <div className={styles.dropDownBox}>
              <div
                onClick={() => setIsDropDown(!isDropDown)}
                className={styles.myCommentInnerDropdown}
              >
                <Image
                  src="/icons/dropDown.svg"
                  width={26}
                  height={26}
                  alt="등록한 리뷰 수정 및 삭제 버튼"
                />
              </div>
              {isDropDown && (
                <ul className={styles.dropdown_menu}>
                  <li
                    onClick={() => {
                      setIsDropDown(!isDropDown);
                      isScreen
                        ? setIsBottomSheet(true)
                        : setShowPatchModal(true);
                    }}
                    className={styles.dropdown_item}
                  >
                    수정하기
                  </li>
                  <li
                    onClick={() => {
                      setIsDropDown(!isDropDown), setShowDeleteModal(true);
                    }}
                    className={styles.dropdown_item}
                  >
                    삭제하기
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div
            className={`${styles.myCommentInnerDeatail} ${styles[`myCommentInnerDetail_${mode}`]}`}
          >
            <p
              className={`${styles.myCommentInnerDetailTitle} ${styles[`myCommentInnerDetailTitle_${mode}`]} text-lg-medium`}
            >
              {wineName}
            </p>
            <p
              className={`${styles.myCommentInnerDetailReview} ${styles[`myCommentInnerDetailReview_${mode}`]}`}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <Modal
          className={styles.deleteModalBox}
          showModal={showDeleteModal}
          closeModal={handleClose}
        >
          <DeleteModalLayout closeModal={handleClose} reviewId={reviewId} />
        </Modal>
      )}
      {isScreen ? (
        <BottomSheet
          handleClose={handleClose}
          isBottomSheet={isBottomSheet}
          closeBtn
        >
          <Review
            closeModal={handleClose}
            reviewData={ReviewPatchData}
            type="patch"
          />
        </BottomSheet>
      ) : (
        <Modal
          className={`${styles.reviewModalBox} ${styles[`registerModalBox_${mode}`]}`}
          showModal={showPatchModal}
          closeModal={handleClose}
          closeBtn
        >
          <Review
            closeModal={handleClose}
            reviewData={ReviewPatchData}
            type="patch"
          />
        </Modal>
      )}
    </div>
  );
};
