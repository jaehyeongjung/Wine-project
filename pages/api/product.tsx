import axios from 'axios';

// 필요한 메서드 : 와인등록/삭제/수정,

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
  const token = localStorage.getItem('accessToken');
  console.log('token:', token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

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
