// pages/myprofile/[id].tsx

import { useRouter } from 'next/router';

// dummyProfiles 객체의 타입을 명시적으로 정의
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
    <div>
      <h1>{profile.name}의 프로필</h1>
      <p>나이: {profile.age}</p>
      <p>소개: {profile.bio}</p>
    </div>
  );
};

export default MyProfile;
