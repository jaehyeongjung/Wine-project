import axios from 'axios';

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

const BASE_URL = 'https://winereview-api.vercel.app';

export const postSignUp = async (userdata: SignUpRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/12-7/auth/signup`, userdata);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postSignIn = async (userdata: SignInRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/12-7/auth/signIn`, userdata);
    return response.data;
  } catch (error) {
    throw error;
  }
};
