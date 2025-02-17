import axios from 'axios';

export const BASE_URL = 'https://winereview-api.vercel.app/12-7';

export type OAuthProvider = 'GOOGLE' | 'KAKAO' | 'NAVER';

interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface KakaoSignInRequest {
  state: string;
  redirectUri: string;
  token: string;
}

export interface OauthAppRequest {
  appSecret: string;
  appKey: string;
  provider: Provider;
}

export type Provider = 'google' | 'kakao';

export const postSignUp = async (userdata: SignUpRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, userdata);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postSignIn = async (userdata: SignInRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signIn`, userdata);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postOauthApps = async (userdata: OauthAppRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/oauthApps`, userdata);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postOAuthLogin = async (
  provider: OAuthProvider,
  userdata: KakaoSignInRequest,
) => {
  try {
    console.log('Provider:', provider);
    console.log('Request URL:', `${BASE_URL}/auth/signin/${provider}`);
    console.log('Request body:', JSON.stringify(userdata, null, 2));

    const response = await axios.post(
      `${BASE_URL}/auth/signin/${provider}`,
      userdata,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('OAuth 로그인 응답:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('상세 에러 정보:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    }
    throw error;
  }
};

export const fetchUserInfo = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return data;
  } catch (error) {
    console.error('유저 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

export const updateUserProfile = async (image: string, nickname: string) => {
  const decodedImage = decodeURIComponent(image);

  const requestData = {
    image: decodedImage,
    nickname,
  };

  console.log('서버로 보내는 데이터:', requestData); // 추가

  try {
    const { data } = await axios.patch(
      `${BASE_URL}/users/me`,
      {
        image,
        nickname,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.error('프로필 업데이트 중 오류 발생:', error);
    throw error;
  }
};
