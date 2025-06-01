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
    const companyName = formData.get('companyName')?.toString();
    const website = formData.get('website')?.toString(); // Optional
    const address = formData.get('address')?.toString(); // Optional

    if (!email || !password || !companyName) {
      return NextResponse.json({ message: 'Missing required fields: email, password, and company name' }, { status: 400 });
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
      passwordHash: passwordHash,
      name: companyName, // Using companyName as the 'name' for company users
      role: 'company',
      companyProfile: {
        companyName,
        website,
        address,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await users.insertOne(newUser);

    return NextResponse.json({ message: 'Company user created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 