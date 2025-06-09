'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface JobPost {
  _id: string;
  title: string;
  description: string;
  companyId: string;
}

export default function InterviewPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (jobId) {
      fetch(`/api/jobs/${jobId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Could not fetch job details.');
          }
          return res.json();
        })
        .then(data => {
          setJob(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to load interview details.');
          setLoading(false);
        });
    }
  }, [jobId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading Interview...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Interview for: {job?.title}</h1>
        <p className="text-lg text-gray-300 mb-8">This is where the AI interview will take place.</p>
        {/* You can begin integrating your AI interview components here */}
      </div>
    </div>
  );
} 