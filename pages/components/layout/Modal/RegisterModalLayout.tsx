import Button from '@/pages/components/common/Button';
import styles from './RegisterModalLayout.module.css';
import Input from '../../common/Input';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface Props {
  closeModal: () => void;
}

const RegisterModalLayout = ({ closeModal }: Props) => {
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
    <div className={styles.container}>
      <div className={styles.registerTitle}>와인 등록</div>
      <Input
        type="text"
        placeholder="와인 이름 입력"
        size="login"
        label="와인 이름"
      />
      <Input type="text" placeholder="가격 입력" size="login" label="가격" />
      <Input
        type="text"
        placeholder="원산지 입력"
        size="login"
        label="원산지"
      />
      <div>타입</div>
      <div className={styles.imageUpload}>
        <div>와인 사진</div>
        <label className={styles.fileUpload} onClick={imageClick}>
          {image ? (
            <Image
              className={styles.imagePreview}
              src={image}
              alt="미리보기"
              width={32}
              height={32}
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
      <div className={styles.btnBox}>
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
