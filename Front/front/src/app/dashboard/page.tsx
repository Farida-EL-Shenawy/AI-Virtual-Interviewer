'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '/images/avatar-placeholder.svg'
    },
    upcomingInterviews: [
      {
        id: 1,
        type: 'Technical Interview',
        company: 'Tech Corp',
        date: '2024-03-01',
        time: '14:00',
        status: 'Scheduled'
      }
    ],
    practiceHistory: [
      {
        id: 1,
        type: 'Technical Practice',
        date: '2024-02-20',
        score: 85,
        duration: '45 mins'
      },
      {
        id: 2,
        type: 'Behavioral Practice',
        date: '2024-02-18',
        score: 90,
        duration: '30 mins'
      }
    ]
  });

  return (
    <div className="min-h-screen pt-16 pb-12 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, {dashboardData.user.name}!</h1>
              <p className="text-gray-400 mt-1">Ready for your next interview?</p>
            </div>
            <Link
              href="/profile/candidate"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Image
                src={dashboardData.user.avatar}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-gray-300 hover:text-white transition-colors">View Profile</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/practice/technical" className="group">
                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Technical Interview</h3>
                      <p className="text-gray-400">Practice coding challenges</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/practice/behavioral" className="group">
                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Behavioral Interview</h3>
                      <p className="text-gray-400">Practice common questions</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Upcoming Interviews</h2>
              {dashboardData.upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium">{interview.type}</h3>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                          {interview.status}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{interview.company}</p>
                      <div className="mt-2 flex items-center text-gray-400 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {interview.date} at {interview.time}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No upcoming interviews</p>
              )}
            </div>
          </div>

          {/* Practice History */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Practice History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.practiceHistory.map((practice) => (
                <div key={practice.id} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white font-medium">{practice.type}</h3>
                    <span className="text-gray-400 text-sm">{practice.date}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Score</span>
                      <span className="text-white font-medium">{practice.score}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${practice.score}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white">{practice.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}