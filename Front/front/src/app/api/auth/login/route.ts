import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose'; // For creating JWTs

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = 'AcuHire';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-fallback-jwt-secret-for-development');
const JWT_ISSUER = 'urn:AcuHire:issuer';
const JWT_AUDIENCE = 'urn:AcuHire:audience';

if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET environment variable is not set. Using a fallback secret for development.');
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);
    const users = db.collection('users');

    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Create JWT
    const token = await new SignJWT({ 
        userId: user._id.toString(), 
        email: user.email, 
        name: user.name,
        role: user.role 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(JWT_ISSUER)
      .setAudience(JWT_AUDIENCE)
      .setExpirationTime('1h') // Token expires in 1 hour
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Set token in an HTTP-only cookie for security
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1 hour in seconds
    });

    return response;

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
