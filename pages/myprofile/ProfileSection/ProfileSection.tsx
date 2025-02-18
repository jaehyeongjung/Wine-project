import React, { useEffect, useRef, useState } from 'react';
import styles from './ProfileSection.module.css';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import useDevice from '@/hooks/useDevice';
import { fetchUserInfo, updateUserProfile } from '@/pages/api/wineApi';
import router from 'next/router';
import { ImagePost } from '@/pages/api/image';
import axios from 'axios';

interface ProfileSectionProps {
  name: string;
  photoUrl: string;
}
export interface UserInfo {
  id: number;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ name, photoUrl }) => {
  const { mode } = useDevice();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [nickname, setNickname] = useState('');
  const defaultImage = '/images/wineProfile.svg';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  //이미지 클릭시
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 변경 처리
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      // 이미지 url 받아오고
      const response = await ImagePost(formData);
      // 현재 유저 정보 먼저 가져오기
      const currentUserData = await fetchUserInfo();

      if (response.url) {
        console.log('이미지 URL:', response.url); // URL 확인
        console.log('현재 유저 닉네임 : ', currentUserData.nickname);
        setImageFile(response.url);
        // 1. 새 이미지 URL로 userInfo 업데이트
        if (userInfo) {
          const updatedUserInfo = {
            ...userInfo,
            image: response.url,
          };
          setUserInfo(updatedUserInfo);
        }

        // 프로필 업데이트 API 호출
        await updateUserProfile(response.url, currentUserData.nickname);

        // 최신 정보로 다시 불러오기
        const userData = await fetchUserInfo();
        setUserInfo(userData);

        setPreviewUrl(URL.createObjectURL(file));
        alert('프로필이 업데이트 되었습니다');
      } else {
        console.error('업로드된 URL이 없습니다:', response);
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      if (axios.isAxiosError(error)) {
        console.log('에러 응답 데이터:', error.response?.data); // 에러 상세 확인
      }
    }
  };

  //처음 렌더링되었을 때 유저정보 가져오기.
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return; // 토큰이 없으면 API 호출하지 않음
    }

    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
        setNickname(''); // Input의 초기값 설정
      } catch (error) {
        console.error('유저 정보 로드 실패:', error);
      }
    };

    getUserInfo();
  }, []);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleUpdateNickname = async () => {
    if (!userInfo) return;

    try {
      await updateUserProfile(userInfo.image, nickname);
      // 프로필 업데이트 후 최신 정보 다시 불러오기
      const updatedData = await fetchUserInfo();
      setUserInfo(updatedData);
      alert('프로필이 업데이트되었습니다.');
      router.reload();
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  return (
    <div
      className={`${styles.profileSection} ${styles[`profileSection_${mode}`]}`}
    >
      <div
        className={`${styles.profileInner} ${styles[`profileInner_${mode}`]}`}
      >
        <div
          className={`${styles.profileData} ${styles[`profileData_${mode}`]}`}
        >
          <div
            className={`${styles.profileImage} ${styles[`profileImage_${mode}`]}`}
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={previewUrl || userInfo?.image || defaultImage}
              alt="프로필 이미지"
              onError={(e) => {
                e.currentTarget.src = defaultImage;
              }}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <div
            className={`${styles.profileNameAndEmail} ${styles[`profileNameAndEmail_${mode}`]}`}
          >
            <div
              className={`${styles.profileName} ${styles[`profileName_${mode}`]}`}
            >
              <p
                className={`${styles.profileNameText} ${styles[`profileNameText_${mode}`]}`}
              >
                {name}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${styles.profileEdit} ${styles[`profileEdit_${mode}`]}`}
        >
          <div
            className={`${styles.profileEditNickname} ${styles[`profileEditNickname_${mode}`]}`}
          >
            <Input
              type="text"
              placeholder="닉네임을 입력해주세요"
              size="nickname"
              label="닉네임"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </div>
          <Button
            type="default"
            size="width96x42"
            text="변경하기"
            color="purple"
            textColor="white"
            onClick={handleUpdateNickname}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
