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

  // const getOauthDateUrl='https://kapi.kakao.com/v2/user/me';

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'kakao') {
        console.log('account 정보:', account);
        if (account?.provider === 'kakao') {
          // URL에서 코드 가져오기
          const currentUrl = new URL(window.location.href);
          const code = currentUrl.searchParams.get('code');
          console.log('카카오 인증 코드:', code);
        }
      }
      return true;
    },

    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        console.log(account.access_token);
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('현재 전체 URL:', url);
      console.log('Includes kakao:', url.includes('kakao'));
      console.log('Includes code=:', url.includes('code='));

      const urlObj = new URL(url, baseUrl);
      const code = urlObj.searchParams.get('code');
      console.log('현재 코드값:', code);

      // kakao가 포함된 모든 URL에서 code를 확인
      if (url.includes('/api/auth/callback/kakao')) {
        const urlObj = new URL(url, baseUrl);
        const code = urlObj.searchParams.get('code');
        console.log('코드는 여기 !@@', code);

        if (code) {
          try {
            const result = await postOAuthLogin('KAKAO', {
              state: 'login',
              redirectUri: 'http://localhost:3000/api/auth/callback/kakao',
              token: code,
            });

            if (result?.ok) {
              return '/';
            }
          } catch (error) {
            console.error('Backend error:', error);
            return '/auth/error';
          }
        }
      }

      // URL이 조건에 맞지 않으면 기본 URL로 리다이렉트
      if (url.includes('/api/auth/error')) {
        return '/auth/error';
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/login', // 로그인 페이지 경로
    error: '/auth/error', // 에러 페이지 경로
  },
  debug: process.env.NODE_ENV === 'development', // 개발 환경에서 디버그 활성화
};
export default NextAuth(authOptions);
