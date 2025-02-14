import React from 'react';
import styles from './ProfileSection.module.css';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import useDevice from '@/hooks/useDevice';

interface ProfileSectionProps {
  name: string;
  photoUrl: string;
  email: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  photoUrl,
  email,
}) => {
  const { mode } = useDevice();

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
          >
            <img src={photoUrl}></img>
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
              placeholder={name}
              size="nickname"
              label="닉네임"
            />
          </div>
          <Button
            type="default"
            size="width96x42"
            text="변경하기"
            color="purple"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
