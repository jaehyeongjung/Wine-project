import React from 'react';
import styles from './ProfileSection.module.css';
import Button from '@/pages/components/common/Button';
import Input from '@/pages/components/common/Input';

interface ProfileSectionProps {
  name: string;
  photoUrl: string;
  email: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  photoUrl,
  email,
}) => (
  <div className={styles.profileSection}>
    <div className={styles.profileInner}>
      <div className={styles.profileData}>
        <div className={styles.profileImage}>
          <img src={photoUrl}></img>
        </div>
        <div className={styles.profileNameAndEmail}>
          <div className={styles.profileName}>
            <p className="text-2xl-bold">{name}</p>
          </div>
          <div className={styles.profileEmail}>
            <p className="text-lg-regular">{email}</p>
          </div>
        </div>
      </div>
      <div className={styles.profileEdit}>
        <div className={styles.profileEditNickname}>
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

export default ProfileSection;
