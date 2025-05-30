'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setAuthError(null);

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setAuthError(data.message || 'Invalid email or password');
        } else {
          // Assuming your API returns a token or session info on success
          // You can store token here if needed (e.g., localStorage) or just redirect
          router.push('/dashboard');
          router.refresh();
        }
      } catch (error) {
        setAuthError('An error occurred during login');
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
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
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
              >
                Forgot your password?
              </Link>
            </div>

            {authError && (
              <div className="p-3 text-sm text-red-500 bg-red-100/10 rounded-md">
                {authError}
              </div>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <button
                type="button"
                onClick={() => alert('Google OAuth not handled in this setup')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
