'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useSession } from 'next-auth/react';

interface JobFormData {
  title: string;
  description: string;
  location: string;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'internship';
  remoteOption: boolean;
  salaryRange: {
    min?: number;
    max?: number;
    currency: string;
  };
  requirements: string[];
  preferredTraits: string[];
  tags: string[];
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
  description: '',
  location: '',
  employmentType: 'full_time',
  remoteOption: false,
  salaryRange: {
    min: 0,
    max: 0,
    currency: 'USD'
  },
  requirements: [],
  preferredTraits: [],
  tags: [],
};

export default function JobPostForm({ isOpen, onClose, onSubmit, mode = 'create', initialData }: JobPostFormProps) {
  const { data: session } = useSession();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<JobFormData>(defaultFormData);
  const [requirementInput, setRequirementInput] = useState('');
  const [traitInput, setTraitInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultFormData);
    }
  }, [mode, initialData, isOpen]);

  const handleAddItem = (field: 'requirements' | 'preferredTraits' | 'tags', value: string) => {
    if (value.trim() !== '') {
      setFormData(prev => ({ ...prev, [field]: [...prev[field], value.trim()] }));
      if (field === 'requirements') setRequirementInput('');
      if (field === 'preferredTraits') setTraitInput('');
      if (field === 'tags') setTagInput('');
    }
  };

  const handleRemoveItem = (field: 'requirements' | 'preferredTraits' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.description) newErrors.description = 'Job description is required';
    if (!formData.location) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    onSubmit(formData);
    onClose();
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Employment Type</label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="full_time">Full-time</option>
                  <option value="part_time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.remoteOption}
                    onChange={(e) => setFormData({ ...formData, remoteOption: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-2 block text-sm text-gray-300">Remote Option</label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Min Salary</label>
                    <input
                    type="number"
                    value={formData.salaryRange.min || ''}
                    onChange={(e) => setFormData({ ...formData, salaryRange: {...formData.salaryRange, min: parseFloat(e.target.value)} })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Max Salary</label>
                    <input
                    type="number"
                    value={formData.salaryRange.max || ''}
                    onChange={(e) => setFormData({ ...formData, salaryRange: {...formData.salaryRange, max: parseFloat(e.target.value)} })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                    <input
                    type="text"
                    value={formData.salaryRange.currency}
                    onChange={(e) => setFormData({ ...formData, salaryRange: {...formData.salaryRange, currency: e.target.value} })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
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

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Requirements</label>
                <div className="flex">
                    <input type="text" value={requirementInput} onChange={e => setRequirementInput(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="button" onClick={() => handleAddItem('requirements', requirementInput)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">Add</button>
                </div>
                <ul className="mt-2 space-y-2">
                    {formData.requirements.map((item, index) => <li key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded-lg"><span>{item}</span><button type="button" onClick={() => handleRemoveItem('requirements', index)} className="text-red-500 hover:text-red-700">Remove</button></li>)}
                </ul>
            </div>
            
            {/* Preferred Traits */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Traits</label>
                <div className="flex">
                    <input type="text" value={traitInput} onChange={e => setTraitInput(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="button" onClick={() => handleAddItem('preferredTraits', traitInput)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">Add</button>
                </div>
                <ul className="mt-2 space-y-2">
                    {formData.preferredTraits.map((item, index) => <li key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded-lg"><span>{item}</span><button type="button" onClick={() => handleRemoveItem('preferredTraits', index)} className="text-red-500 hover:text-red-700">Remove</button></li>)}
                </ul>
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                <div className="flex">
                    <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="button" onClick={() => handleAddItem('tags', tagInput)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">Add</button>
                </div>
                <ul className="mt-2 space-y-2">
                    {formData.tags.map((item, index) => <li key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded-lg"><span>{item}</span><button type="button" onClick={() => handleRemoveItem('tags', index)} className="text-red-500 hover:text-red-700">Remove</button></li>)}
                </ul>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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