'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';

export default function CandidateProfile() {
  // Mock data - replace with actual API calls
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    cv: {
      name: 'John_Doe_CV.pdf',
      url: '#'
    },
    interviewHistory: [
      {
        id: 1,
        type: 'Technical Interview',
        company: 'Tech Corp',
        date: '2024-02-15',
        status: 'Completed',
        score: 85
      },
      {
        id: 2,
        type: 'Behavioral Interview',
        company: 'Innovation Inc',
        date: '2024-02-20',
        status: 'Scheduled'
      }
    ]
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Sidebar role="candidate" />
      <div className="flex-1 pt-16 pb-12 pl-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Candidate Profile</h1>
              <p className="text-xl text-gray-300">Manage your profile and track your interview progress</p>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information Card */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Name</label>
                    <p className="text-white text-lg">{`${profileData.firstName} ${profileData.lastName}`}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Email</label>
                    <p className="text-white text-lg">{profileData.email}</p>
                  </div>
                </div>
              </div>

              {/* CV Section */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">CV Document</h2>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-white">{profileData.cv.name}</p>
                  <a
                    href={profileData.cv.url}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                  >
                    Download CV
                  </a>
                </div>
              </div>

              {/* Interview History */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Interview History</h2>
                <div className="space-y-4">
                  {profileData.interviewHistory.map((interview) => (
                    <div key={interview.id} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium">{interview.type}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          interview.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {interview.status}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{interview.company}</p>
                      <p className="text-gray-400 text-sm">{interview.date}</p>
                      {interview.score && (
                        <div className="mt-2">
                          <div className="flex items-center">
                            <span className="text-gray-300 text-sm">Score:</span>
                            <span className="ml-2 text-white font-medium">{interview.score}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-500 rounded-full h-2"
                              style={{ width: `${interview.score}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}