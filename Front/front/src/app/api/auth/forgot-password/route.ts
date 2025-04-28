import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const emailSchema = z.object({
  email: z.string().email('Invalid email format'),
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = emailSchema.parse(body);

    // Generate reset token
    const resetToken = jwt.sign(
      { email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json(
      { message: 'Password reset email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}