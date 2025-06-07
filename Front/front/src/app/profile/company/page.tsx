'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

export default function CompanyProfile() {
  const router = useRouter();

  // Mock data - replace with actual API calls
  const [profileData, setProfileData] = useState({
    companyName: 'Tech Corp',
    industry: 'Technology',
    companySize: '201-500 employees',
    email: 'hr@techcorp.com',
    hiringNeeds: 'Looking for skilled software engineers and UI/UX designers',
    activeJobs: [
      {
        id: 1,
        title: 'Senior Software Engineer',
        department: 'Engineering',
        type: 'Full-time',
        status: 'Active',
        applicants: 45,
        qualifiedApplicants: 32,
        interviewsScheduled: 15
      },
      {
        id: 2,
        title: 'UI/UX Designer',
        department: 'Design',
        type: 'Full-time',
        status: 'Active',
        applicants: 28,
        qualifiedApplicants: 20,
        interviewsScheduled: 10
      }
    ],
    applicantStats: {
      totalApplicants: 156,
      newApplications: 34,
      qualifiedCandidates: 98,
      interviewsScheduled: 45,
      offersSent: 12,
      applicationsByDepartment: [
        { department: 'Engineering', count: 85 },
        { department: 'Design', count: 45 },
        { department: 'Marketing', count: 26 }
      ],
      applicationTrend: [
        { date: '2024-01', count: 42 },
        { date: '2024-02', count: 38 },
        { date: '2024-03', count: 54 },
        { date: '2024-04', count: 22 }
      ]
    }
  });

  const applicationTrendData = {
    labels: profileData.applicantStats.applicationTrend.map(item => item.date),
    datasets: [
      {
        label: 'Applications',
        data: profileData.applicantStats.applicationTrend.map(item => item.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4
      }
    ]
  };

  const departmentData = {
    labels: profileData.applicantStats.applicationsByDepartment.map(item => item.department),
    datasets: [
      {
        label: 'Applications by Department',
        data: profileData.applicantStats.applicationsByDepartment.map(item => item.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(147, 51, 234, 0.5)',
          'rgba(236, 72, 153, 0.5)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(147, 51, 234)',
          'rgb(236, 72, 153)'
        ],
        borderWidth: 1
      }
    ]
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
            {/* Dashboard Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Company Dashboard</h1>
              <p className="text-xl text-gray-300">Track your hiring progress and applicant insights</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Total Applicants</h3>
                <p className="text-3xl font-bold text-white mt-2">{profileData.applicantStats.totalApplicants}</p>
                <span className="text-green-400 text-sm">+{profileData.applicantStats.newApplications} new</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Qualified Candidates</h3>
                <p className="text-3xl font-bold text-white mt-2">{profileData.applicantStats.qualifiedCandidates}</p>
                <span className="text-blue-400 text-sm">{Math.round((profileData.applicantStats.qualifiedCandidates / profileData.applicantStats.totalApplicants) * 100)}% qualification rate</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Interviews Scheduled</h3>
                <p className="text-3xl font-bold text-white mt-2">{profileData.applicantStats.interviewsScheduled}</p>
                <span className="text-purple-400 text-sm">Next 7 days</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">Offers Sent</h3>
                <p className="text-3xl font-bold text-white mt-2">{profileData.applicantStats.offersSent}</p>
                <span className="text-yellow-400 text-sm">Pending responses</span>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-6">Application Trend</h2>
                <div className="h-64">
                  <Line data={applicationTrendData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                      },
                      x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                      }
                    },
                    plugins: {
                      legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } }
                    }
                  }} />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-6">Applications by Department</h2>
                <div className="h-64">
                  <Bar data={departmentData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                      },
                      x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                      }
                    },
                    plugins: {
                      legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } }
                    }
                  }} />
                </div>
              </div>
            </div>

            {/* Active Jobs Table */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Active Job Postings</h2>
                <button
                  onClick={() => router.push('/profile/company/jobs')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Manage Jobs
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm">
                      <th className="pb-4">Position</th>
                      <th className="pb-4">Department</th>
                      <th className="pb-4">Type</th>
                      <th className="pb-4">Total Applicants</th>
                      <th className="pb-4">Qualified</th>
                      <th className="pb-4">Interviews</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {profileData.activeJobs.map((job) => (
                      <tr key={job.id} className="border-t border-gray-700">
                        <td className="py-4 text-white">{job.title}</td>
                        <td className="py-4">{job.department}</td>
                        <td className="py-4">{job.type}</td>
                        <td className="py-4">{job.applicants}</td>
                        <td className="py-4">{job.qualifiedApplicants}</td>
                        <td className="py-4">{job.interviewsScheduled}</td>
                        <td className="py-4">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}