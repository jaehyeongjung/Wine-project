import React from 'react';
import styles from './ProfileSection.module.css';

interface ProfileSectionProps {
  name: string;
  age: number;
  bio: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ name, age, bio }) => (
  <div className={styles.profileSection}>
    <h1>{name}의 프로필</h1>
    <p>나이: {age}</p>
    <p>소개: {bio}</p>
  </div>
);

export default ProfileSection;
