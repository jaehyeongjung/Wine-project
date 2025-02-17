import axios from 'axios';

// 와인 타입 정의
interface RecentReview {
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  aroma: string[];
  rating: number;
  id: number;
}

interface WineType {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: RecentReview;
  userId: number;
}

interface WineResponse {
  totalCount: number;
  nextCursor: number;
  list: WineType[];
}

const BASE_URL = 'https://winereview-api.vercel.app/12-7';

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  console.log('token:', token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

// 와인 목록 가져오기 함수
export const getWineList = async (
  limit: number = 10,
  cursor: number = 0,
  type?: string,
  minPrice?: number,
  maxPrice?: number,
  rating?: number,
  name?: string,
) => {
  try {
    // 쿼리 파라미터 생성
    const params = new URLSearchParams({
      limit: limit.toString(),
      cursor: cursor.toString(),
      type: type || '',
      minPrice: minPrice?.toString() || '',
      maxPrice: maxPrice?.toString() || '',
      rating: rating?.toString() || '',
      name: name || '',
    }).toString();

    // API 요청
    const response = await axios.get(
      `${BASE_URL}/wines?${params}`,
      getAuthHeaders(),
    );

    // 반환되는 데이터에서 list 부분만 추출
    return response.data as WineResponse;
  } catch (error: any) {
    console.error(
      '와인 목록 조회 오류:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
