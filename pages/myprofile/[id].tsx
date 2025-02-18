import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchUserInfo } from '../api/wineApi';
import { MyWineData } from '../api/product';
import { MyReviews } from '../api/review';
import ProfileSection from './ProfileSection/ProfileSection';
import useDevice from '@/hooks/useDevice';
import HeaderWithProfile from '@/components/layout/Header/HeaderWithProfile';
import styles from './[id].module.css';
import { WineCard } from '../../components/common/DataCard/WineCard';
import { ReviewCard } from '../../components/common/DataCard/ReviewCard';
import Image from 'next/image';

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  userId: number;
  createdAt: string;
}

interface Reviews {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: Number;
  createdAt: string;
  wine: {
    id: number;
    name: string;
  };
}

interface UserInfo {
  email: string;
  nickname: string;
  profileImage: string;
}

const MyProfile: React.FC = () => {
  const [wineData, setWineData] = useState<Wine[]>([]);
  const [reviewData, setReviewData] = useState<Reviews[]>([]);
  // const [reviewWineName, setReviewWineName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wineTotalCount, setWineTotalCount] = useState<number>(0);
  const [reviewTotalCount, setReviewTotalCount] = useState<number>(0);
  const router = useRouter();
  const { mode } = useDevice();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { id } = router.query;
  const [selectedTab, setSelectedTab] = useState<'comment' | 'wine'>('comment');

  const handleTabChange = (tab: 'comment' | 'wine') => {
    setSelectedTab(tab);
  };

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

  const limit = 10;

  // 등록한 리뷰, 와인 데이터
  useEffect(() => {
    const fetchData = async () => {
      try {
        switch (selectedTab) {
          case 'wine': {
            const responseWine = await MyWineData(limit);
            setWineData(
              responseWine.list.sort(
                (a: Wine, b: Wine) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              ),
            );
            setWineTotalCount(responseWine.totalCount);
            break;
          }

          case 'comment': {
            const responseReviews = await MyReviews(limit);
            const sortedReviews = responseReviews.list.sort(
              (a: Reviews, b: Reviews) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            );

            setReviewData(sortedReviews);
            setReviewTotalCount(responseReviews.totalCount);
            break;
          }
        }
      } catch (err: any) {
        setError(err.message || '데이터를 불러오는 중 오류 발생');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, selectedTab]); // ✅ 불필요한 의존성 제거

  useEffect(() => {
    console.warn('현재 reviewData:', reviewData);
  }, [reviewData]);

  // id가 없거나 임시 데이터에 없는 id가 들어오면 기본 메시지 표시
  if (!id || !userInfo) {
    return <div>존재하지 않는 프로필입니다.</div>;
  }

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

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
        <div
          className={`${styles.myUploadSection} ${styles[`myUploadSection_${mode}`]}`}
        >
          <div
            className={`${styles.myUploadBar} ${styles[`myUploadBar_${mode}`]}`}
          >
            <div
              className={`${styles.myUploadBarMenu} ${styles[`myUploadBarMenu_${mode}`]}`}
            >
              <div
                className={`text-xl-bold ${styles.clickableText} ${styles[`clickableText_${mode}`]} ${selectedTab === 'comment' ? '' : styles.active}`}
                onClick={() => handleTabChange('comment')}
              >
                내가 쓴 후기
              </div>
              <div
                className={`text-xl-bold ${styles.clickableText} ${styles[`clickableText_${mode}`]}  ${selectedTab === 'wine' ? '' : styles.active}`}
                onClick={() => handleTabChange('wine')}
              >
                내가 등록한 와인
              </div>
            </div>
            <div
              className={`${styles.myUploadBarTotalText} ${styles[`myUploadBarTotalText_${mode}`]}`}
            >
              {selectedTab === 'wine'
                ? `총 ${wineTotalCount}개`
                : `총 ${reviewTotalCount}개`}
            </div>
          </div>
          {selectedTab === 'comment' && (
            <div>
              {reviewData.length > 0 ? (
                <div>
                  {reviewData.map((review) => (
                    <ReviewCard
                      key={review.id}
                      reviewId={review.id}
                      wineId={review.wine?.id}
                      wineName={review.wine?.name}
                      content={review.content}
                      rating={review.rating}
                      lightBold={review.lightBold}
                      smoothTannic={review.smoothTannic}
                      drySweet={review.drySweet}
                      softAcidic={review.softAcidic}
                      aroma={review.aroma}
                      created={review.createdAt}
                    />
                  ))}
                </div>
              ) : (
                <div className={`${styles.noData} ${styles[`noData_${mode}`]}`}>
                  <Image
                    src="/images/noReview.svg"
                    width={136}
                    height={136}
                    alt="등록된 데이터가 없습니다"
                  />
                  <div
                    className={`${styles.noDataText} ${styles[`noDataText_${mode}`]}`}
                  >
                    작성된 리뷰가 없습니다.
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedTab === 'wine' && (
            <div>
              {wineData.length > 0 ? (
                <div
                  className={`${styles.RegisterwineContainer} ${styles[`RegisterwineContainer_${mode}`]}`}
                >
                  {wineData.map((wine) => (
                    <WineCard
                      key={wine.id}
                      wineId={wine.id}
                      wineName={wine.name}
                      wineRegion={wine.region}
                      winePrice={wine.price}
                      wineImage={wine.image}
                    />
                  ))}
                </div>
              ) : (
                <div className={`${styles.noData} ${styles[`noData_${mode}`]}`}>
                  <Image
                    src="/images/noReview.svg"
                    width={136}
                    height={136}
                    alt="등록된 데이터가 없습니다"
                  />
                  <div
                    className={`${styles.noDataText} ${styles[`noDataText_${mode}`]}`}
                  >
                    등록된 상품이 없습니다.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
