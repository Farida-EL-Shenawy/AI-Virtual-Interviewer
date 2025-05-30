import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = 'AcuHire';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString();
    const phone = formData.get('phone')?.toString();
    const linkedin = formData.get('linkedin')?.toString();
    const cv = formData.get('cv'); // optional File

    if (!email || !password || !firstName || !lastName || !phone || !linkedin) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);
    const users = db.collection('users');

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: passwordHash,
      name: `${firstName} ${lastName}`,
      role: 'candidate',
      candidateProfile: {
        phone,
        socialLinks: {
          linkedin
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await users.insertOne(newUser);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
