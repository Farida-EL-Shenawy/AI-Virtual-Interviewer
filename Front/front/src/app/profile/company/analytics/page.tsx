'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';

interface AnalyticsData {
  totalInterviews: number;
  completedInterviews: number;
  averageScore: number;
  successRate: number;
  monthlyData: {
    month: string;
    interviews: number;
    successRate: number;
  }[];
}

export default function AnalyticsPage() {
  // Mock data - replace with actual API calls
  const [analyticsData] = useState<AnalyticsData>({
    totalInterviews: 150,
    completedInterviews: 120,
    averageScore: 85,
    successRate: 75,
    monthlyData: [
      { month: 'Jan', interviews: 20, successRate: 70 },
      { month: 'Feb', interviews: 25, successRate: 72 },
      { month: 'Mar', interviews: 30, successRate: 75 },
      { month: 'Apr', interviews: 35, successRate: 78 },
      { month: 'May', interviews: 40, successRate: 80 },
    ],
  });

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
              <h1 className="text-4xl font-bold text-white mb-4">Interview Analytics</h1>
              <p className="text-xl text-gray-300">Track and analyze your interview performance</p>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-lg font-medium text-gray-300">Total Interviews</h3>
                <p className="text-3xl font-bold text-white mt-2">{analyticsData.totalInterviews}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-lg font-medium text-gray-300">Completed</h3>
                <p className="text-3xl font-bold text-white mt-2">{analyticsData.completedInterviews}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-lg font-medium text-gray-300">Average Score</h3>
                <p className="text-3xl font-bold text-white mt-2">{analyticsData.averageScore}%</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-lg font-medium text-gray-300">Success Rate</h3>
                <p className="text-3xl font-bold text-white mt-2">{analyticsData.successRate}%</p>
              </motion.div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-8">
              <h3 className="text-xl font-semibold text-white mb-6">Monthly Trends</h3>
              <div className="h-64 relative">
                {/* Simple bar chart visualization */}
                <div className="flex items-end justify-between h-48 space-x-2">
                  {analyticsData.monthlyData.map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(data.interviews / 40) * 100}%` }}
                      />
                      <span className="text-sm text-gray-300 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Success Rate Trend */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Success Rate Trend</h3>
              <div className="h-64 relative">
                {/* Line chart visualization */}
                <div className="flex items-end justify-between h-48 space-x-2">
                  {analyticsData.monthlyData.map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${data.successRate}%` }}
                      />
                      <span className="text-sm text-gray-300 mt-2">{data.month}</span>
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