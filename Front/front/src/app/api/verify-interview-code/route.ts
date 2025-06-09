import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = 'AcuHire';

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    return client.db(DB_NAME);
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Could not connect to database.");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ message: 'Access code is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const jobposts = db.collection('jobposts');

    const job = await jobposts.findOne({ passcode: code, status: 'active' });

    if (!job) {
      return NextResponse.json({ message: 'Invalid access code' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Access code verified', jobId: job._id }, { status: 200 });
  } catch (error) {
    console.error('Verify access code API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 