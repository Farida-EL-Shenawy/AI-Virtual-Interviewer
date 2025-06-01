import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-fallback-jwt-secret-for-development');
const JWT_ISSUER = 'urn:AcuHire:issuer';
const JWT_AUDIENCE = 'urn:AcuHire:audience';

if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET environment variable is not set. Using a fallback secret for development.');
}

export async function GET(req: NextRequest) {
  const tokenCookie = req.cookies.get('token');

  if (!tokenCookie || !tokenCookie.value) {
    return NextResponse.json({ message: 'Not authenticated, no token found' }, { status: 401 });
  }

  const token = tokenCookie.value;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    // Token is valid, return user data from payload
    // Ensure the payload structure matches what the User type expects
    return NextResponse.json({
      id: payload.userId as string, // Assuming userId is in payload
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string, // Assuming role is in payload
      // Add other fields if your User type expects them and they are in the JWT
    });
  } catch (error) {
    console.warn('Session check error (JWT verification failed):', error);
    // Clear the invalid cookie
    const response = NextResponse.json({ message: 'Session expired or invalid' }, { status: 401 });
    // Ensure you get the cookie store again if needed for setting cookies in error response
    // For App Router, NextResponse.cookies.set should work directly.
    response.cookies.set('token', '', { httpOnly: true, path: '/', maxAge: 0 });
    return response;
  }
} 