'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
// We will use a direct fetch call for company sign-up for now.
// import { AuthService } from '@/services/auth'; 

interface CompanyFormData {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  website?: string;
  address?: string;
}

interface Errors {
  companyName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  // No need for website or address errors unless specific validation is added
}

export default function CompanySignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CompanyFormData>({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    address: ''
  });

  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear specific field error when user starts typing
    if (errors[name as keyof Errors]) {
        setErrors(prev => ({
            ...prev,
            [name]: undefined
        }));
    }
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const payload = new FormData();
        payload.append('companyName', formData.companyName);
        payload.append('email', formData.email);
        payload.append('password', formData.password);
        if (formData.website) payload.append('website', formData.website);
        if (formData.address) payload.append('address', formData.address);

        const response = await fetch('/api/auth/company-signup', {
          method: 'POST',
          body: payload,
        });

        const result = await response.json();

        if (!response.ok) {
          setFormError(result.message || 'Sign-up failed. Please try again.');
          return;
        }

        router.push('/login?message=Company registration successful! Please log in.');
      } catch (error: any) {
        console.error('Company sign-up error:', error);
        setFormError(error?.message || 'An unexpected error occurred. Please try again.');
      }
    } else {
        // Errors will be displayed by the individual field error messages
        console.log("Validation errors:", validationErrors);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up as a Company</h2>
          {formError && (
            <div className="mb-4 p-3 rounded-md bg-red-500/20 border border-red-500 text-red-300 text-sm">
              {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.companyName ? 'border-red-500' : 'border-gray-600'} text-white px-3 py-2 focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-white px-3 py-2 focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-600'} text-white px-3 py-2 focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} text-white px-3 py-2 focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-300">Company Website (Optional)</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300">Company Address (Optional)</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Sign Up
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}