import { NextRouter } from 'next/router';

const BASE_URL = 'https://winereview-api.vercel.app/12-7';

export const getWineDetail = async (
  id: string | number,
  router: NextRouter,
  limit?: number,
  offset?: number,
) => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log('현재 accessToken 상태:', token);

    if (!token) {
      console.log('토큰 없음, 로그인 페이지로 이동');
      router.push('/login');
      return null;
    }

    // limit과 offset 추가
    const url = new URL(`${BASE_URL}/wines/${id}`);
    if (limit !== undefined) url.searchParams.append('limit', limit.toString());
    if (offset !== undefined)
      url.searchParams.append('offset', offset.toString());

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('API 응답 데이터:', data);
    return data;
  } catch (error) {
    console.log('API 오류:', error);
    return null;
  }
};

// 좋아요/좋아요 취소
export const updateReviewLike = async (reviewId: string, isLiked: boolean) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.log('액세스 토큰없음 로그인 필요');
    return;
  }

  const method = isLiked ? 'DELETE' : 'POST';

  try {
    const response = await fetch(
      `https://winereview-api.vercel.app/12-7/reviews/${reviewId}/like`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log('응답 상태 코드:', response.status);
    if (!response.ok) {
      throw new Error(`서버 응답 오류: ${response.status}`);
    }
  } catch (error) {
    console.error('좋아요 요청 실패:', error);
  }
};
