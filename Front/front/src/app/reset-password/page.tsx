'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AuthService } from '@/services/auth';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters long' });
      return;
    }
    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    setIsSubmitting(true);
    try {
      await AuthService.resetPassword({
        token: token!,
        password: password,
      });
      setStatus({
        type: 'success',
        message: 'Password has been reset successfully. Redirecting to login...'
      });
      setTimeout(() => router.push('/login'), 3000);
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.message || 'Failed to reset password. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h2>
          <p className="text-gray-300 text-sm mb-6 text-center">
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
                disabled={isSubmitting}
              />
            </div>

            {status.message && (
              <div
                className={`p-3 rounded-md ${status.type === 'success' ? 'bg-green-800/50 text-green-200' : 'bg-red-800/50 text-red-200'}`}
              >
                {status.message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="text-sm text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}