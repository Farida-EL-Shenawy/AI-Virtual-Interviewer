import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthService } from '@/services/auth';
import { Role, User } from '@/types/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
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
          
          if (user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      }
    })
  ],
  
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
    error: '/login', // Error code passed in query string as ?error=
    signOut: '/logout',
  },

  callbacks: {
    async jwt({ token, user }) {
      // The 'user' object is only passed on the first sign-in.
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // We are adding the user's id and role to the session object
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        if (!user.email) return false; // Or handle error
        // You might want to implement a specific service for Google Sign-In
        // that finds or creates a user in your database.
        // For now, we'll assume a user with this email can sign in.
        return true; 
      }
      return true; // For credentials provider
    },
  },

  events: {
    async signIn(message) {
      console.log('User signed in:', message.user.email);
    },
    async signOut(message) {
      console.log('User signed out:', message.token.email);
    }
  },

  debug: process.env.NODE_ENV === 'development',
};