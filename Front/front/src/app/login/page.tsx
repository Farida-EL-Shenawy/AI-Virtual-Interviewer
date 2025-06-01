'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user, loading: authLoading, error: authContextError, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);

  useEffect(() => {
    // Display message from query params (e.g., after successful registration)
    const message = searchParams.get('message');
    if (message) {
      setFormMessage(message);
    }
  }, [searchParams]);

  useEffect(() => {
    if (authContextError) {
      setFormMessage(authContextError.message || 'Login failed. Please check your credentials.');
    }
  }, [authContextError]);

  useEffect(() => {
    if (user && !authLoading) {
      if (user.role === 'candidate') {
        router.push('/dashboard/candidate');
      } else if (user.role === 'company') {
        router.push('/dashboard/company');
      } else {
        // Fallback or default dashboard if role is not defined
        router.push('/dashboard'); 
      }
    }
  }, [user, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (formMessage) setFormMessage(null); // Clear general form message on input change
    if (authContextError) clearError(); // Clear auth context error
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
      setFormMessage(null); // Clear previous messages
      clearError(); // Clear previous auth context errors
      try {
        await login({ email: formData.email, password: formData.password });
        // Redirect is handled by the useEffect watching the user state
      } catch (error: any) {
        // Error is set in AuthContext, and useEffect will update formMessage
        // If not using AuthContext error for display, set explicitly:
        // setFormMessage(error.message || 'An error occurred during login.');
        console.error("Login page handleSubmit error:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  // If user is already logged in and data is loaded, redirect immediately
  useEffect(() => {
    if (user && !authLoading) {
        // This logic is duplicated, ensure it's correctly placed or refactored
        // Or rely on the other useEffect for redirection post-login attempt
    }
  }, [user, authLoading, router]);


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
          
          {formMessage && (
            <div className={`p-3 mb-4 text-sm rounded-md ${authContextError || errors ? 'text-red-400 bg-red-500/20' : 'text-green-400 bg-green-500/20'}`}>
              {formMessage}
            </div>
          )}

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
                autoComplete="email"
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
                autoComplete="current-password"
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

            <div className="space-y-4">
              <button
                type="submit"
                disabled={authLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <button
                type="button"
                onClick={() => alert('Google OAuth not implemented yet.')}
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
