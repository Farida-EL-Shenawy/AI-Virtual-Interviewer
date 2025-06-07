import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = 'AcuHire';

async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI);
  return client.db(DB_NAME);
}

export async function GET(req: NextRequest, { params }: { params: { jobId: string } }) {
  try {
    const { jobId } = params;
    const db = await connectToDatabase();
    
    // First, find the interview session associated with the job post
    const interviewSessions = db.collection('interviewSessions');
    const session = await interviewSessions.findOne({ jobPostId: new ObjectId(jobId) });

    if (!session) {
      // If no session, maybe we generate questions now.
      // For this example, let's assume questions are pre-generated or we can generate them.
      // This part can be expanded based on the app's logic.
      // For now, let's return a default set of questions or an empty array.
      return NextResponse.json([], { status: 200 });
    }

    // Then, find all questions for that session
    const questions = db.collection('questions');
    const questionCursor = await questions.find({ sessionId: session._id });
    const questionList = await questionCursor.toArray();

    return NextResponse.json(questionList, { status: 200 });
  } catch (error) {
    console.error('Fetch questions API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 