'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InterviewAccess from './InterviewAccess';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    position: string;
    company: string;
    appliedDate: string;
    status: string;
    interviewDate?: string;
    interviewTime?: string;
    type?: string;
  };
}

export default function JobDetailsModal({ isOpen, onClose, job }: JobDetailsModalProps) {
  const [showInterviewAccess, setShowInterviewAccess] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-xl p-6 max-w-lg w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{job.position}</h2>
              <p className="text-gray-300">{job.company}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Application Details</h3>
              <div className="space-y-2">
                <p className="text-gray-300">Applied on: {job.appliedDate}</p>
                <p className="text-gray-300">Status: <span className="text-blue-400">{job.status}</span></p>
                {job.type && <p className="text-gray-300">Interview Type: {job.type}</p>}
                {job.interviewDate && (
                  <p className="text-gray-300">Interview Date: {job.interviewDate}</p>
                )}
                {job.interviewTime && (
                  <p className="text-gray-300">Interview Time: {job.interviewTime}</p>
                )}
              </div>
            </div>

            {job.status === 'Interview Scheduled' && (
              <div className="mt-6">
                <button
                  onClick={() => setShowInterviewAccess(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Join Interview
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <InterviewAccess
        isOpen={showInterviewAccess}
        onClose={() => setShowInterviewAccess(false)}
        onSubmit={async (code) => {
          try {
            const response = await fetch('/api/verify-interview-code', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ code }),
            });

            if (!response.ok) {
              throw new Error('Invalid access code');
            }

            const data = await response.json();
            window.location.href = `/interview/${data.interviewId}`;
          } catch (error) {
            throw error;
          }
        }}
      />
    </>
  );
}