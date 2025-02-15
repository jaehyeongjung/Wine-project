import { NextRouter } from 'next/router';

const BASE_URL = 'https://winereview-api.vercel.app/12-7';

export const fetchWineReview = async (
  id: string | number,
  router: NextRouter,
) => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log('🔍 현재 accessToken 상태:', token);

    if (!token) {
      console.warn('🚨 토큰 없음, 로그인 페이지로 이동!');
      router.push('/login');
      return null;
    }

    const response = await fetch(`${BASE_URL}/wines/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch wine review');
    }

    const data = await response.json();
    console.log('✅ API 응답 데이터:', data);
    return data;
  } catch (error) {
    console.error('❌ API 오류:', error);
    return null;
  }
};
