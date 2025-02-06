import { useRouter } from 'next/router';
import styles from './[id].module.css';
import ProfileSection from './ProfileSection/ProfileSection';
import MyUploadSection from './MyUploadSection/MyUploadSection';

const dummyProfiles: Record<
  string,
  { name: string; age: number; bio: string }
> = {
  '1': { name: '홍길동', age: 25, bio: '프론트엔드 개발자' },
  '2': { name: '김철수', age: 30, bio: '백엔드 개발자' },
  '3': { name: '이영희', age: 28, bio: '디자이너' },
};

const MyProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // id가 없거나 임시 데이터에 없는 id가 들어오면 기본 메시지 표시
  if (!id || !dummyProfiles[id as string]) {
    return <div>존재하지 않는 프로필입니다.</div>;
  }

  const profile = dummyProfiles[id as string]; // 임시 데이터에서 해당 프로필 가져오기

  return (
    <div className={styles.profileContainer}>
      <ProfileSection name={profile.name} age={profile.age} bio={profile.bio} />
      <MyUploadSection />
    </div>
  );
};

export default MyProfile;
