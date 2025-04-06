'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CompanySignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
    companySize: '',
    hiringNeeds: '',
    interviewTypes: []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interviewTypes: checked
        ? [...prev.interviewTypes, value]
        : prev.interviewTypes.filter(item => item !== value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.companySize) newErrors.companySize = 'Company size is required';
    if (!formData.hiringNeeds) newErrors.hiringNeeds = 'Hiring needs description is required';
    if (formData.interviewTypes.length === 0) newErrors.interviewTypes = 'Please select at least one interview type';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // TODO: Implement API call to register company
      console.log('Form submitted:', formData);
      router.push('/login');
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
        className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up as Company</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Business Email</label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-300">Industry</label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
            </div>

            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-gray-300">Company Size</label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
              {errors.companySize && <p className="mt-1 text-sm text-red-500">{errors.companySize}</p>}
            </div>

            <div>
              <label htmlFor="hiringNeeds" className="block text-sm font-medium text-gray-300">Hiring Needs</label>
              <textarea
                id="hiringNeeds"
                name="hiringNeeds"
                value={formData.hiringNeeds}
                onChange={handleChange}
                placeholder="Describe your hiring needs and requirements"
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              {errors.hiringNeeds && <p className="mt-1 text-sm text-red-500">{errors.hiringNeeds}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Interview Types Needed</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="interviewTypes"
                    value="technical"
                    checked={formData.interviewTypes.includes('technical')}
                    onChange={handleCheckboxChange}
                    className="rounded bg-gray-800 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Technical Interviews</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="interviewTypes"
                    value="behavioral"
                    checked={formData.interviewTypes.includes('behavioral')}
                    onChange={handleCheckboxChange}
                    className="rounded bg-gray-800 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Behavioral Interviews</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="interviewTypes"
                    value="system-design"
                    checked={formData.interviewTypes.includes('system-design')}
                    onChange={handleCheckboxChange}
                    className="rounded bg-gray-800 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">System Design Interviews</span>
                </label>
              </div>
              {errors.interviewTypes && <p className="mt-1 text-sm text-red-500">{errors.interviewTypes}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}