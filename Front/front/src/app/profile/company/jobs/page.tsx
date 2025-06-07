'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import JobPostForm from '@/components/JobPostForm';

interface JobFormData {
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
  preferredTraits: string[];
  tags: string[];
}

interface JobPost extends JobFormData {
  _id: string;
  companyId: string;
  status: 'active' | 'closed';
  passcode: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function JobsPage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleJobSubmit = async (formData: JobFormData) => {
    console.log('handleJobSubmit called with:', formData);
    // if (!session?.user?.id) {
    //   console.error('User not authenticated');
    //   return;
    // }

    // console.log(session?.user.id)
    const jobData = {
      ...formData,
      companyId: session.user.id,
    };
    console.log('Submitting job data:', jobData);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      console.log('API response:', response);
      if (response.ok) {
        console.log('Job posted successfully, fetching updated jobs...');
        fetchJobs(); // Refresh job list
        setIsJobModalOpen(false);
        setSelectedJob(null);
      } else {
        console.error('Failed to post job, response status:', response.status);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || job.employmentType.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesType;
  });
  
  const handleEdit = (jobId: string) => {
    const job = jobs.find(j => j._id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsJobModalOpen(true);
    }
  };

  const handleDelete = async (jobId: string) => {
    // Implement delete functionality
    console.log('Delete job:', jobId);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-violet-900 to-black">
      <Sidebar role="company" />
      <div className="flex-1 pt-16 pb-12 pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Manage Job Postings</h1>
              <p className="text-xl text-gray-300">Create and manage your company's job opportunities</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search jobs by title or location"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>

                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setIsJobModalOpen(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Post New Job
                </button>
              </div>
            </div>

            {/* Job Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{job.title}</h3>
                    </div>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                      {job.employmentType}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-300">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.salaryRange.min} - {job.salaryRange.max} {job.salaryRange.currency}
                    </div>
                  </div>

                  <div className="text-gray-400 text-sm mb-6">
                    {job.description.length > 150
                      ? `${job.description.substring(0, 150)}...`
                      : job.description}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-gray-300 text-sm">
                      Passcode: <span className="font-medium">{job.passcode}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(job._id)}
                        className="p-2 text-gray-300 hover:text-white transition-colors duration-150"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors duration-150"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <JobPostForm
        isOpen={isJobModalOpen}
        onClose={() => {
          setIsJobModalOpen(false);
          setSelectedJob(null);
        }}
        onSubmit={handleJobSubmit}
        mode={selectedJob ? 'edit' : 'create'}
        initialData={selectedJob ? jobToFormData(selectedJob) : undefined}
      />
    </div>
  );
}

function jobToFormData(job: JobPost): JobFormData {
  return {
    title: job.title,
    description: job.description,
    location: job.location,
    employmentType: job.employmentType,
    remoteOption: job.remoteOption,
    salaryRange: job.salaryRange,
    requirements: job.requirements,
    preferredTraits: job.preferredTraits,
    tags: job.tags,
  };
}