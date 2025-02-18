import { useRouter } from 'next/router';
import styles from './[id].module.css';
import ProfileSection from './ProfileSection/ProfileSection';
import MyUploadSection from './MyUploadSection/MyUploadSection';
import useDevice from '@/hooks/useDevice';
import { fetchUserInfo } from '../api/wineApi';
import { useEffect, useState } from 'react';
import HeaderWithProfile from '@/components/layout/Header/HeaderWithProfile';

// const dummyProfiles: Record<
//   string,
//   { name: string; photoUrl: string; email: string }
// > = {
//   '1': {
//     name: '박보영',
//     photoUrl:
//       'https://search.pstatic.net/sunny/?src=http%3A%2F%2Ft1.daumcdn.net%2Fnews%2F201606%2F19%2Fnewsen%2F20160619080506602mtaq.jpg&type=a340',
//     email: 'boyoung@email.com',
//   },
//   '2': {
//     name: '최우식',
//     photoUrl:
//       'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA3MDZfMzUg%2FMDAxNzIwMjM1MDA4Njcx.UrQq1CoS1lSsTTd3YIGEgTlYdfGS1ol4TjpdMaQu2U0g.kfb6erm6Wivye27K7hF_V5TqdwxI_8nZ-DgZxeTnWkMg.JPEG%2FInternet%25A3%25DF20240706%25A3%25DF120305%25A3%25DF8.jpeg&type=a340',
//     email: 'ooosick@email.com',
//   },
// };

interface UserInfo {
  email: string;
  nickname: string;
  profileImage: string;
}

const MyProfile: React.FC = () => {
  const router = useRouter();
  const { mode } = useDevice();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { id } = router.query;

  // users정보 가져오기
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }

    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('유저 정보 로드 실패:', error);
      }
    };

    getUserInfo();
  }, []);

  // id가 없거나 임시 데이터에 없는 id가 들어오면 기본 메시지 표시
  if (!id || !userInfo) {
    return <div>존재하지 않는 프로필입니다.</div>;
  }

  // const profile = dummyProfiles[id as string]; // 임시 데이터에서 해당 프로필 가져오기

  return (
    <>
      <HeaderWithProfile />
      <div
        className={`${styles.profileContainer} ${styles[`profileContainer_${mode}`]}`}
      >
        <ProfileSection
          name={userInfo.nickname}
          photoUrl={userInfo.profileImage}
        />
        <MyUploadSection />
      </div>
    </>
  );
};

export default MyProfile;
