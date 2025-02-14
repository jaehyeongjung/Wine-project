import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import DropDown from '@/components/common/DropDown';
import styles from './RegisterModalLayout.module.css';
import { ProductPatch, ProductPost } from '@/utils/api/product';

interface Props {
  closeModal: () => void;
  isScreen?: boolean;
  type: 'post' | 'patch';
  wineId?: number;
}

const RegisterModalLayout = ({ closeModal, isScreen, type, wineId }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [wineName, setWineName] = useState('');
  const [price, setPrice] = useState('');
  const [region, setRegion] = useState('');
  const [typeList, setTypeList] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const inputValuesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'wineName':
        setWineName(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'region':
        setRegion(value);
        break;
    }
  };

  const handleTypeSelect = (option: string) => {
    setTypeList(option);
  };

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

  const handleResponse = async () => {
    if (!image) {
      return alert('사진을 추가해주세요.');
    }

    const data = {
      name: wineName,
      region: region,
      image: image,
      price: Number(price),
      type: typeList.toUpperCase(),
    };
    console.log(data);
    try {
      if (type === 'post') await ProductPost(data);
      if (type === 'patch') await ProductPatch(wineId, data);
      closeModal();
    } catch (error: any) {
      console.error('상품 등록 오류:', error.response?.data || error.message);
    }
  };

  return (
    <div className={isScreen ? styles.FilterContainer : styles.container}>
      {isScreen ? (
        <div className={styles.filterTitle}>필터</div>
      ) : (
        <div className={styles.title}>
          {type === 'post' ? '와인 등록' : '내가 등록한 와인'}
        </div>
      )}
      <Input
        name="wineName"
        value={wineName}
        type="text"
        placeholder="와인 이름 입력"
        size={isScreen ? 'filter' : 'modal'}
        label="와인 이름"
        onChange={inputValuesChange}
      />
      <Input
        name="price"
        value={price}
        type="text"
        placeholder="가격 입력"
        size={isScreen ? 'filter' : 'modal'}
        label="가격"
        onChange={inputValuesChange}
      />
      <Input
        name="region"
        value={region}
        type="text"
        placeholder="원산지 입력"
        size={isScreen ? 'filter' : 'modal'}
        label="원산지"
        onChange={inputValuesChange}
      />
      <div
        className={
          isScreen ? styles.FilterWineTypeDropDown : styles.wineTypeDropDown
        }
      >
        <div>타입</div>
        <DropDown
          isScreen
          options={['Red', 'White', 'Sparkling']}
          onSelect={handleTypeSelect}
        />
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
          onClick={handleResponse}
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
