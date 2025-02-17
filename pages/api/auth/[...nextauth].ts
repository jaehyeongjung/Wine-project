import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import { postOauthApps, postOAuthLogin, Provider } from '../wineApi';

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
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'kakao') {
        // KAKAO oauth 앱 등록 시작
        try {
          const userdata = {
            appSecret: process.env.NEXTAUTH_SECRET as string,
            appKey: process.env.KAKAO_CLIENT_ID as string,
            provider: 'KAKAO' as Provider,
          };
          const response = await postOauthApps(userdata);
          console.log('OAuth App 응답 : ', response);

          return true;
        } catch (error) {
          console.error('OAuth App 에러', error);
          return false;
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
      // 명시적으로 홈 경로로 리다이렉트
      return baseUrl;
    },
  },

  debug: process.env.NODE_ENV === 'development', // 개발 환경에서 디버그 활성화
};
export default NextAuth(authOptions);
