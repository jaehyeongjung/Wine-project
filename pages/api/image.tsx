import axios from 'axios';

const BASE_URL = 'https://winereview-api.vercel.app/12-7';

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  console.log('token:', token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};

export const ImagePost = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/images/upload`,
      formData,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error: any) {
    console.error('이미지 등록 오류:', error.response?.data || error.message);
    throw error;
  }
};
