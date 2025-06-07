'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface JobPost {
  _id: string;
  title: string;
  description: string;
  location: string;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'internship';
  remoteOption: boolean;
  salaryRange: {
    min?: number;
    max?: number;
    currency: string;
  };
  requirements: string[];
  tags: string[];
  passcode: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [passcode, setPasscode] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const handleApply = (jobId: string) => {
    setSelectedJobId(jobId);
  };
  
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const job = jobs.find(j => j._id === selectedJobId);
    if(job && job.passcode === passcode) {
        router.push(`/interview/${selectedJobId}`);
    } else {
        alert('Incorrect passcode');
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Available Job Openings
        </motion.h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-400 mb-2">{job.location}</p>
              <div className="flex-grow">
                <p className="text-gray-300 mb-4">{job.description.substring(0, 150)}...</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-400">
                    {job.requirements.slice(0, 3).map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                </div>
              </div>
              {selectedJobId === job._id ? (
                <form onSubmit={handlePasscodeSubmit} className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter passcode to apply"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Submit
                  </button>
                </form>
              ) : (
                <button onClick={() => handleApply(job._id)} className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg self-end">
                  Apply Now
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 