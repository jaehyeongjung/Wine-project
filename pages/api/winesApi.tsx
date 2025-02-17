import axios from 'axios';

export const BASE_URL = 'https://winereview-api.vercel.app/12-7';

export interface GetWinesParams {
  limit?: number;
  cursor?: number;
  type?: 'RED' | 'WHITE' | 'SPARKLING';
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
}

const defaultParams: GetWinesParams = {
  limit: 10,
  cursor: undefined,
  type: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
  name: undefined,
};

export const getWines = async (params: GetWinesParams = defaultParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/wines`, {
      params,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('와인 목록 조회 에러:', error);
    throw error;
  }
};
