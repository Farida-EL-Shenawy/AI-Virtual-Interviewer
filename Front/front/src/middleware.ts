import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { Role } from './types/auth';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/signup'];
    if (publicRoutes.includes(path)) {
      return NextResponse.next();
    }

    // Ensure user is authenticated
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Role-based route protection
    const role = token.role as Role;
    const candidateRoutes = ['/dashboard/candidate', '/interview', '/practice'];
    const companyRoutes = ['/dashboard/company', '/job-postings', '/analytics'];

    if (role === 'candidate' && companyRoutes.some(route => path.startsWith(route))) {
      return NextResponse.redirect(new URL('/dashboard/candidate', req.url));
    }

    if (role === 'company' && candidateRoutes.some(route => path.startsWith(route))) {
      return NextResponse.redirect(new URL('/dashboard/company', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/interview/:path*',
    '/practice/:path*',
    '/job-postings/:path*',
    '/analytics/:path*',
    '/profile/:path*',
  ],
};