import axios from 'axios';

// 필요한 메서드 : 리뷰등록/삭제/수정

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

export const ReviewPatch = async (id: number | undefined, data: ReviewType) => {
  try {
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
