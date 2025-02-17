import Image from 'next/image';
import useDevice from '@/hooks/useDevice';
import { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '@/components/common/Modal';
import DeleteModalLayout from '@/components/layout/Modal/DeleteModalLayout';
import styles from './WineCard.module.css';
import BottomSheet from '@/components/common/BottomSheet';
import RegisterModalLayout from '@/components/layout/Modal/RegisterModalLayout';

interface WinesData {
  wineId: number;
  wineName: string;
  wineRegion: string;
  winePrice: number;
  wineImage: string;
}

export const WineCard = ({
  wineId,
  wineName,
  wineRegion,
  winePrice,
  wineImage,
}: WinesData) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPatchModal, setShowPatchModal] = useState(false);
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [isScreen, setIsScreen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { mode } = useDevice();

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

  return (
    <div
      ref={dropDownRef}
      className={`${styles.Registerwine} ${styles[`Registerwine_${mode}`]}`}
    >
      <div
        className={`${styles.RegisterwineMap} ${styles[`RegisterwineMap_${mode}`]}`}
      >
        <div
          className={`${styles.RegisterwineImg} ${styles[`RegisterwineImg_${mode}`]}`}
        >
          <Image src={wineImage} width={296} height={76} alt="상품 이미지" />
        </div>
        <div
          className={`${styles.RegisterwineData} ${styles[`RegisterwineData_${mode}`]}`}
        >
          <div
            className={`${styles.RegisterwineDataText} ${styles[`RegisterwineDataText_${mode}`]}`}
          >
            <div
              className={`${styles.RegisterwineDataTextDetail} ${styles[`RegisterwineDataTextDetail_${mode}`]}`}
            >
              <div
                className={`${styles.RegisterwineDataTextDetailTitle} ${styles[`RegisterwineDataTextDetailTitle_${mode}`]}`}
              >
                {wineName}
              </div>
              <div
                className={`${styles.RegisterwineDataTextDetailFrom} ${styles[`RegisterwineDataTextDetailFrom_${mode}`]}`}
              >
                {wineRegion}
              </div>
            </div>
            <div className={styles.dropDownBox}>
              <div
                className={`${styles.RegisterwineDataTextDropdown} ${styles[`RegisterwineDataTextDropdown_${mode}`]}`}
                onClick={() => setIsDropDown(!isDropDown)}
              >
                <Image
                  src="/icons/dropDown.svg"
                  width={26}
                  height={26}
                  alt="등록한 와인 수정 및 삭제 버튼"
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
            className={`${styles.RegisterwineDataPrice} ${styles[`RegisterwineDataPrice_${mode}`]}`}
          >
            {`₩ ${new Intl.NumberFormat().format(winePrice)}`}
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <Modal
          className={styles.deleteModalBox}
          showModal={showDeleteModal}
          closeModal={handleClose}
        >
          <DeleteModalLayout closeModal={handleClose} reviewId={wineId} />
        </Modal>
      )}
      {isScreen ? (
        <BottomSheet handleClose={handleClose} isBottomSheet={isBottomSheet}>
          <RegisterModalLayout
            isScreen
            closeModal={handleClose}
            wineId={wineId}
            type="patch"
          />
        </BottomSheet>
      ) : (
        <Modal
          className={`${styles.registerModalBox} ${styles[`registerModalBox_${mode}`]}`}
          showModal={showPatchModal}
          closeModal={handleClose}
        >
          <RegisterModalLayout
            closeModal={handleClose}
            wineId={wineId}
            type="patch"
          />
        </Modal>
      )}
    </div>
  );
};
