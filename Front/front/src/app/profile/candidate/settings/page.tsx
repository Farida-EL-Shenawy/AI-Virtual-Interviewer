'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';

interface UserSettings {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  notifications: {
    emailNotifications: boolean;
    interviewReminders: boolean;
    practiceReminders: boolean;
    jobAlerts: boolean;
  };
  cv: {
    currentCV: string | null;
  };
}

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings>({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    notifications: {
      emailNotifications: true,
      interviewReminders: true,
      practiceReminders: true,
      jobAlerts: false
    },
    cv: {
      currentCV: 'JohnDoe_CV.pdf'
    }
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccessMessage('Personal information updated successfully!');
    setIsLoading(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleNotificationChange = (setting: keyof UserSettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting]
      }
    }));
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSettings(prev => ({
        ...prev,
        cv: {
          currentCV: file.name
        }
      }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Sidebar role="candidate" />
      <div className="flex-1 pt-16 pb-12 pl-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Settings</h1>
              <p className="text-xl text-gray-300">Manage your account preferences</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
              {['personal', 'notifications', 'cv'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/20 text-green-400 rounded-lg">
                {successMessage}
              </div>
            )}

            {/* Personal Information */}
            {activeTab === 'personal' && (
              <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={settings.personalInfo.name}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, name: e.target.value }
                        }))}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={settings.personalInfo.email}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value }
                        }))}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        value={settings.personalInfo.phone}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">Current Password</label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={settings.personalInfo.currentPassword}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, currentPassword: e.target.value }
                        }))}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        value={settings.personalInfo.newPassword}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, newPassword: e.target.value }
                        }))}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={settings.personalInfo.confirmPassword}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, confirmPassword: e.target.value }
                        }))}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-3">
                      <div>
                        <h3 className="text-white font-medium">
                          {key.split(/(?=[A-Z])/).join(' ')}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Receive notifications for {key.split(/(?=[A-Z])/).join(' ').toLowerCase()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key as keyof UserSettings['notifications'])}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${value ? 'bg-blue-600' : 'bg-gray-700'}`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${value ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CV Management */}
            {activeTab === 'cv' && (
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">CV Management</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-2">Current CV</h3>
                    {settings.cv.currentCV ? (
                      <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-300">{settings.cv.currentCV}</span>
                        <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
                          Remove
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400">No CV uploaded</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="cv-upload"
                      className="block w-full px-4 py-2 text-center border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors duration-200"
                    >
                      <span className="text-gray-300">Upload new CV</span>
                      <input
                        id="cv-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleCVUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="mt-2 text-sm text-gray-400">Supported formats: PDF, DOC, DOCX</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}