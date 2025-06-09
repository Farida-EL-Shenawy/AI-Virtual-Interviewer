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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const jobposts = db.collection('jobposts');

    const job = await jobposts.findOne({ _id: new ObjectId(id) });

    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error('Fetch single job API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const jobposts = db.collection('jobposts');

    const result = await jobposts.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Job deletion API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 