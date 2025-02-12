const BASE_URL = 'https://winereview-api.vercel.app';

export const likeReview = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/12-7/reviews/${id}/like`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('좋아요 요청 실패');
    }

    return await response.json(); // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error('좋아요 API 호출 오류:', error);
    return null;
  }
};
