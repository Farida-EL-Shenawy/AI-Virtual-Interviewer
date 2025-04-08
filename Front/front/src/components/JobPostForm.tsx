'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

interface JobFormData {
  id?: number;
  title: string;
  department: string;
  type: string;
  hiringManager: string;
  recruitmentPeriod: {
    start: string;
    end: string;
  };
  quota: number;
  salary: string;
  location: string;
  description: string;
  requirements: string;
  postedDate?: string;
  applicants?: number;
  status?: string;
}

interface JobPostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: JobFormData) => void;
  mode?: 'create' | 'edit';
  initialData?: JobFormData;
}

const defaultFormData: JobFormData = {
  title: '',
  department: '',
  type: 'Full-time',
  hiringManager: '',
  recruitmentPeriod: {
    start: '',
    end: ''
  },
  quota: 1,
  salary: '',
  location: '',
  description: '',
  requirements: ''
};

export default function JobPostForm({ isOpen, onClose, onSubmit, mode = 'create', initialData }: JobPostFormProps) {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<JobFormData>(defaultFormData);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultFormData);
    }
  }, [mode, initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.hiringManager) newErrors.hiringManager = 'Hiring manager is required';
    if (!formData.recruitmentPeriod.start) newErrors.recruitmentStart = 'Start date is required';
    if (!formData.recruitmentPeriod.end) newErrors.recruitmentEnd = 'End date is required';
    if (!formData.quota || formData.quota < 1) newErrors.quota = 'Valid quota is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Job description is required';
    if (!formData.requirements) newErrors.requirements = 'Requirements are required';

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    // Prepare data for submission
const submissionData = {
  ...formData,
  postedDate: formData.postedDate || new Date().toISOString().split('T')[0],
  applicants: formData.applicants || 0,
  status: formData.status || 'Active'
};

onSubmit(submissionData);
    onClose();
    // Reset form only in create mode
    if (mode === 'create') {
      setFormData(defaultFormData);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-gradient-to-b from-gray-900 to-black rounded-xl border border-gray-700 shadow-xl flex flex-col max-h-[90vh]">
          <Dialog.Title className="text-2xl font-bold text-white p-6 border-b border-gray-700">
            {mode === 'edit' ? 'Edit Job Posting' : 'Post New Job'}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-6 p-6 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.title && <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.department && <p className="mt-1 text-sm text-red-500">{formErrors.department}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hiring Manager</label>
                <input
                  type="text"
                  value={formData.hiringManager}
                  onChange={(e) => setFormData({ ...formData, hiringManager: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.hiringManager && <p className="mt-1 text-sm text-red-500">{formErrors.hiringManager}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.recruitmentPeriod.start}
                  onChange={(e) => setFormData({ ...formData, recruitmentPeriod: { ...formData.recruitmentPeriod, start: e.target.value } })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.recruitmentStart && <p className="mt-1 text-sm text-red-500">{formErrors.recruitmentStart}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.recruitmentPeriod.end}
                  onChange={(e) => setFormData({ ...formData, recruitmentPeriod: { ...formData.recruitmentPeriod, end: e.target.value } })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.recruitmentEnd && <p className="mt-1 text-sm text-red-500">{formErrors.recruitmentEnd}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Quota</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quota}
                  onChange={(e) => setFormData({ ...formData, quota: parseInt(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.quota && <p className="mt-1 text-sm text-red-500">{formErrors.quota}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.location && <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Salary</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Requirements</label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.requirements && <p className="mt-1 text-sm text-red-500">{formErrors.requirements}</p>}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {mode === 'edit' ? 'Save Changes' : 'Create Job'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}