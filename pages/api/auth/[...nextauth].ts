import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import { postOAuthLogin } from '../wineApi';

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log('리다이렉트 URL:', url); // 디버깅용

      // /callback/kakao로 리다이렉트할 때 code 파라미터 유지
      if (url.includes('/api/auth/callback/kakao')) {
        const urlObj = new URL(url);
        const code = urlObj.searchParams.get('code');
        return `/callback/kakao?code=${code}`;
      }

      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login', // 로그인 페이지 경로
    error: '/auth/error', // 에러 페이지 경로
  },
  debug: process.env.NODE_ENV === 'development', // 개발 환경에서 디버그 활성화
};

export default NextAuth(authOptions);
