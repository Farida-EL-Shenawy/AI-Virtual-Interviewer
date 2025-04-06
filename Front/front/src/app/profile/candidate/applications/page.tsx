'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import JobDetailsModal from '@/components/JobDetailsModal';

export default function CandidateApplications() {
  const [selectedJob, setSelectedJob] = useState(null);
  // Mock data - replace with actual API calls
  const [applications, setApplications] = useState([
    {
      id: 1,
      position: 'Senior Software Engineer',
      company: 'Tech Corp',
      appliedDate: '2024-03-01',
      status: 'Interview Scheduled',
      interviewDate: '2024-03-15',
      interviewTime: '10:00 AM',
      type: 'Technical Interview'
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'Innovation Inc',
      appliedDate: '2024-02-28',
      status: 'Pending Review',
    },
    {
      id: 3,
      position: 'Frontend Engineer',
      company: 'Digital Solutions',
      appliedDate: '2024-02-25',
      status: 'Rejected',
      feedback: 'Position has been filled'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-blue-500/20 text-blue-400';
      case 'Pending Review':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Rejected':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Sidebar role="candidate" />
      <div className="flex-1 pt-16 pb-12 pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">My Applications</h1>
              <p className="text-xl text-gray-300">Track your job applications and interview status</p>
            </div>

            {/* Applications List */}
            <div className="space-y-6">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{application.position}</h3>
                      <p className="text-gray-300">{application.company}</p>
                      <p className="text-gray-400 text-sm mt-1">Applied on {application.appliedDate}</p>
                    </div>

                    <div className="flex flex-col md:items-end gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>

                      {application.status === 'Interview Scheduled' && (
                        <button
                          onClick={() => setSelectedJob(application)}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>

                  {application.status === 'Interview Scheduled' && (
                    <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div>
                          <p className="text-blue-400 font-medium">{application.type}</p>
                          <p className="text-gray-300 text-sm">Date: {application.interviewDate}</p>
                          <p className="text-gray-300 text-sm">Time: {application.interviewTime}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {application.status === 'Rejected' && application.feedback && (
                    <div className="mt-4 p-4 bg-red-500/10 rounded-lg">
                      <p className="text-red-400 text-sm">{application.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      {selectedJob && (
        <JobDetailsModal
          isOpen={true}
          onClose={() => setSelectedJob(null)}
          job={selectedJob}
        />
      )}
    </div>
  );
}