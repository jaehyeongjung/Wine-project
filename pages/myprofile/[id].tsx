import { useRouter } from 'next/router';
import styles from './[id].module.css';
import ProfileSection from './ProfileSection/ProfileSection';
import MyUploadSection from './MyUploadSection/MyUploadSection';
import Header from '@/components/layout/HeaderVersion2';

const dummyProfiles: Record<
  string,
  { name: string; photoUrl: string; email: string }
> = {
  '1': {
    name: '박보영',
    photoUrl:
      'https://search.pstatic.net/sunny/?src=http%3A%2F%2Ft1.daumcdn.net%2Fnews%2F201606%2F19%2Fnewsen%2F20160619080506602mtaq.jpg&type=a340',
    email: 'boyoung@email.com',
  },
  '2': {
    name: '최우식',
    photoUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA3MDZfMzUg%2FMDAxNzIwMjM1MDA4Njcx.UrQq1CoS1lSsTTd3YIGEgTlYdfGS1ol4TjpdMaQu2U0g.kfb6erm6Wivye27K7hF_V5TqdwxI_8nZ-DgZxeTnWkMg.JPEG%2FInternet%25A3%25DF20240706%25A3%25DF120305%25A3%25DF8.jpeg&type=a340',
    email: 'ooosick@email.com',
  },
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
    <>
      <Header imageUrl={profile.photoUrl} />
      <div className={styles.profileContainer}>
        <ProfileSection
          name={profile.name}
          photoUrl={profile.photoUrl}
          email={profile.email}
        />
        <MyUploadSection />
      </div>
    </>
  );
};

export default MyProfile;
