import { NextResponse } from 'next/server';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthService } from '@/services/auth';

const resetSchema = z.object({
  token: z.string(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password } = resetSchema.parse(body);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password in database
    await AuthService.resetPassword({
      email: decoded.email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: 'Invalid reset token' },
        { status: 400 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}