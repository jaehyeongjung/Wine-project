import axios from 'axios';

// 필요한 메서드 : 리뷰 가져오기 / 등록 / 삭제 / 수정

// 리뷰 등록 및 수정
interface ReviewType {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId?: number;
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

// 내가 등록한 와인 리뷰
export const MyReviews = async (limit: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me/reviews`, {
      params: { limit },
      ...getAuthHeaders(),
    });
    return response.data;
  } catch (error: any) {
    console.error(
      '내가 작성한 리뷰 목록 불러오기 오류:',
      error.response?.data || error.message,
    );

    throw new Error(
      error.response?.data?.message || '데이터 요청 중 오류 발생',
    );
  }
};

// 신규 리뷰 등록
export const ReviewPost = async (data: ReviewType) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/reviews`,
      data,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error: any) {
    console.error('리뷰 등록 오류:', error.response?.data || error.message);
    throw error;
  }
};

// 리뷰 수정
export const ReviewPatch = async (id: number | undefined, data: ReviewType) => {
  try {
    console.log('id', id);
    console.log('글구', data);
    if (id === undefined) {
      return null;
    }
    const response = await axios.patch(
      `${BASE_URL}/reviews/${id}`,
      data,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error: any) {
    console.error('리뷰 수정 오류:', error.response?.data || error.message);
    throw error;
  }
};

// 리뷰 삭제
export const ReviewDelete = async (id: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/reviews/${id}`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error: any) {
    console.error('리뷰 삭제 오류:', error.response?.data || error.message);
    throw error;
  }
};
