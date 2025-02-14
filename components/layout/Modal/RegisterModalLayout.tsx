import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import DropDown from '@/components/common/DropDown';
import styles from './RegisterModalLayout.module.css';

interface Props {
  closeModal: () => void;
  isScreen: boolean;
}

const RegisterModalLayout = ({ closeModal, isScreen }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const imageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className={isScreen ? styles.FilterContainer : styles.container}>
      {isScreen && <div className={styles.filterTitle}>필터</div>}
      {!isScreen && <div className={styles.title}>와인 등록</div>}
      <Input
        type="text"
        placeholder="와인 이름 입력"
        size={isScreen ? 'filter' : 'modal'}
        label="와인 이름"
      />
      <Input
        type="text"
        placeholder="가격 입력"
        size={isScreen ? 'filter' : 'modal'}
        label="가격"
      />
      <Input
        type="text"
        placeholder="원산지 입력"
        size={isScreen ? 'filter' : 'modal'}
        label="원산지"
      />
      <div
        className={
          isScreen ? styles.FilterWineTypeDropDown : styles.wineTypeDropDown
        }
      >
        <div>타입</div>
        <DropDown isScreen={isScreen} options={['Red', 'White', 'Sparkling']} />
      </div>
      <div className={isScreen ? styles.filterImageUpload : styles.imageUpload}>
        <div>와인 사진</div>
        <label
          className={isScreen ? styles.fileUploadFilter : styles.fileUpload}
          onClick={imageClick}
        >
          {image ? (
            <Image
              className={styles.imagePreview}
              src={image}
              alt="미리보기"
              width={isScreen ? 120 : 140}
              height={isScreen ? 120 : 140}
            />
          ) : (
            <Image
              src="/images/ImageUpload.svg"
              alt="사진 첨부"
              width={32}
              height={32}
            />
          )}
        </label>
        <input
          className={styles.inputFile}
          type="file"
          ref={fileInputRef}
          onChange={fileChange}
        />
      </div>
      <div className={isScreen ? styles.filterBtnBox : styles.btnBox}>
        <Button
          onClick={closeModal}
          type="default"
          size="width108"
          text="취소"
          color="lite_purple"
          textColor="purple"
        />
        <Button
          type="default"
          size="width294"
          text="와인 등록하기"
          color="purple"
          textColor="white"
        />
      </div>
    </div>
  );
};

export default RegisterModalLayout;
