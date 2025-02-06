import React from 'react';
import styles from './ProfileSection.module.css';
import Button from '@/pages/components/common/Button';

interface ProfileSectionProps {
  name: string;
  age: number;
  bio: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ name, age, bio }) => (
  <div className={styles.profileSection}>
    <div className={styles.profileInner}>
      <div className={styles.profileData}>
        <div className={styles.profileImage}></div>
        <div className={styles.profileNameAndEmail}>
          <div className={styles.profileName}>
            <p className="text-2xl-bold">{name}</p>
          </div>
          <div className={styles.profileEmail}>
            <p className="text-lg-regular">{bio}</p>
          </div>
        </div>
      </div>
      <div className={styles.profileEdit}>
        <div className={styles.profileEditNickname}>
          <p className="text-lg-medium ">닉네임</p>
          <div className={styles.test}></div>
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
