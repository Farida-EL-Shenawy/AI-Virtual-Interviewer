'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function SignupPage() {
  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Path</h1>
          <p className="text-xl text-gray-300">Select how you want to join AI Virtual Interviewer</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Candidate Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <Link href="/signup/candidate" className="block">
              <div className="p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-blue-600/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/images/candidate-icon.svg"
                      alt="Candidate"
                      width={64}
                      height={64}
                      className="w-16 h-16"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Join as a Candidate</h2>
                  <p className="text-gray-300">
                    Practice interviews, get feedback, and showcase your skills to potential employers
                  </p>
                  <span className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out mt-4">
                    Sign Up as Candidate
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Company Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            <Link href="/signup/company" className="block">
              <div className="p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-blue-600/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/images/company-icon.svg"
                      alt="Company"
                      width={64}
                      height={64}
                      className="w-16 h-16"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Join as a Company</h2>
                  <p className="text-gray-300">
                    Streamline your hiring process with AI-powered interviews and candidate assessments
                  </p>
                  <span className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out mt-4">
                    Sign Up as Company
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}