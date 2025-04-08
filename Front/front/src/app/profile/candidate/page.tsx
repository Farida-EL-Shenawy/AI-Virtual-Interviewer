'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export default function CandidateDashboard() {
  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    user: {
      name: 'John Doe',
      upcomingInterviews: 2,
      completedPractices: 15
    },
    upcomingInterviews: [
      {
        id: 1,
        type: 'Technical Interview',
        company: 'Tech Corp',
        date: '2024-03-15',
        time: '10:00 AM'
      },
      {
        id: 2,
        type: 'Behavioral Interview',
        company: 'Innovation Inc',
        date: '2024-03-20',
        time: '2:00 PM'
      }
    ],
    practiceStats: {
      technicalScore: 85,
      behavioralScore: 90,
      totalPractices: 15,
      recentScores: [75, 82, 88, 85, 90]
    },
    recentActivities: [
      {
        id: 1,
        type: 'Practice Completed',
        description: 'Technical Interview Practice',
        score: 90,
        date: '2024-03-10'
      },
      {
        id: 2,
        type: 'Interview Scheduled',
        description: 'Tech Corp - Software Engineer Position',
        date: '2024-03-09'
      },
      {
        id: 3,
        type: 'Practice Completed',
        description: 'Behavioral Interview Practice',
        score: 85,
        date: '2024-03-08'
      }
    ]
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <Sidebar role="candidate" />
      <div className="flex-1 pt-16 pb-12 pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome back, {dashboardData.user.name}!</h1>
              <p className="text-xl text-gray-300">Your interview preparation hub</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Link
                href="/practice/technical"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-white mb-2">Technical Interview Practice</h3>
                <p className="text-blue-100">Practice coding challenges and system design questions</p>
              </Link>
              <Link
                href="/practice/behavioral"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-white mb-2">Behavioral Interview Practice</h3>
                <p className="text-purple-100">Improve your soft skills and communication</p>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Technical Score</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-bold text-white">{dashboardData.practiceStats.technicalScore}%</p>
                  <span className="ml-2 text-green-400 text-sm">+5%</span>
                </div>
                <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: `${dashboardData.practiceStats.technicalScore}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Behavioral Score</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-bold text-white">{dashboardData.practiceStats.behavioralScore}%</p>
                  <span className="ml-2 text-green-400 text-sm">+3%</span>
                </div>
                <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 rounded-full h-2"
                    style={{ width: `${dashboardData.practiceStats.behavioralScore}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Practice Sessions</h3>
                <p className="text-3xl font-bold text-white mt-2">{dashboardData.practiceStats.totalPractices}</p>
                <span className="text-blue-400 text-sm">Last 30 days</span>
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Upcoming Interviews</h2>
              <div className="space-y-4">
                {dashboardData.upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">{interview.type}</h3>
                      <p className="text-gray-300 text-sm">{interview.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{interview.date}</p>
                      <p className="text-gray-300 text-sm">{interview.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {dashboardData.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">{activity.type}</h3>
                      <p className="text-gray-300 text-sm">{activity.description}</p>
                    </div>
                    <div className="text-right">
                      {activity.score && (
                        <p className="text-green-400 font-medium">{activity.score}%</p>
                      )}
                      <p className="text-gray-400 text-sm">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}