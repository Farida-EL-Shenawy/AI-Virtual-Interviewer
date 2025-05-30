import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: new RegExp(`^${email.trim()}$`, 'i') });
    console.log("User found:", user);
    
    if (!user) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 401 });
    }


    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
