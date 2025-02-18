import axios from 'axios';

// 필요한 메서드 : 와인 가져오기 / 등록 / 삭제 / 수정

// 와인 등록 및 수정
interface ProductType {
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}

const BASE_URL = 'https://winereview-api.vercel.app/12-7';

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };
};

// 내가 등록한 와인 데이터 가져오기
export const MyWineData = async (limit: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me/wines`, {
      params: { limit },
      ...getAuthHeaders(),
    });
    return response.data;
  } catch (error: any) {
    console.error(
      '내가 만든 와인 목록 불러오기 오류:',
      error.response?.data || error.message,
    );

    throw new Error(
      error.response?.data?.message || '데이터 요청 중 오류 발생',
    );
  }
};

// 신규 와인 등록하기
export const ProductPost = async (data: ProductType) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/wines`,
      data,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error: any) {
    console.error('상품 등록 오류:', error.response?.data || error.message);
    throw error;
  }
};

// 등록한 와인 수정하기
export const ProductPatch = async (
  id: number | undefined,
  data: ProductType,
) => {
  try {
    if (id === undefined) {
      return null;
    }
    const response = await axios.patch(
      `${BASE_URL}/wines/${id}`,
      data,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error: any) {
    console.error('상품 수정 오류:', error.response?.data || error.message);
    throw error;
  }
};

// 상품 삭제하기
export const ProductDelete = async (id: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/wines/${id}`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error: any) {
    console.error('상품 삭제 오류:', error.response?.data || error.message);
    throw error;
  }
};
