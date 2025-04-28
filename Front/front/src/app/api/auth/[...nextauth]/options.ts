import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthService } from '@/services/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        
        try {
          const user = await AuthService.login({
            email: credentials.email,
            password: credentials.password,
          });
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.profileImage,
          };
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Handle Google sign-in, create/update user in your database
          await AuthService.handleGoogleSignIn({
            email: user.email!,
            name: user.name!,
            image: user.image,
          });
          return true;
        } catch (error) {
          console.error('Google sign-in error:', error);
          return false;
        }
      }
      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};