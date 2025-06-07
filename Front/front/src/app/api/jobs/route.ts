import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = 'AcuHire';

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    console.log("Database connected successfully");
    return client.db(DB_NAME);
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Could not connect to database.");
  }
}

export async function POST(req: NextRequest) {
  console.log("Received POST request to /api/jobs");
  try {
    const jobData = await req.json();
    console.log("Request body:", jobData);

    if (!jobData.title || !jobData.description || !jobData.companyId) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json({ message: 'Title, description, and companyId are required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const jobposts = db.collection('jobposts');

    const newJob = {
      ...jobData,
      companyId: new ObjectId(jobData.companyId),
      status: 'active',
      passcode: uuidv4().substring(0, 8),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    console.log("Inserting new job:", newJob);
    const result = await jobposts.insertOne(newJob);
    console.log("Job inserted successfully:", result);

    return NextResponse.json({ message: 'Job posted successfully', jobId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Job creation API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  console.log("Received GET request to /api/jobs");
  try {
    const db = await connectToDatabase();
    const jobposts = db.collection('jobposts');
    const jobs = await jobposts.find({ status: 'active' }).toArray();
    console.log("Fetched jobs:", jobs.length);
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error('Fetch jobs API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 