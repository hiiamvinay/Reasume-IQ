import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const Settings: React.FC = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Manage your account preferences</p>
          </div>

          <div className="max-w-4xl space-y-6">
            {/* Account Settings */}
            <div className="glass-card-dark p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">👤</span>
                <h2 className="text-2xl font-bold text-white">Account Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-sm">Email Address</p>
                  <p className="text-white font-semibold mt-1">john.doe@example.com</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Change Email
                  </Button>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-sm">Password</p>
                  <p className="text-white font-semibold mt-1">••••••••</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Change Password
                  </Button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="glass-card-dark p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🔔</span>
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
              </div>
              <div className="space-y-4">
                {/* Email Notifications Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-white font-semibold">Email Notifications</p>
                    <p className="text-gray-400 text-sm mt-1">Receive updates about your scans and recommendations</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifs(!emailNotifs)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      emailNotifs ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        emailNotifs ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Weekly Digest Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-white font-semibold">Weekly Digest</p>
                    <p className="text-gray-400 text-sm mt-1">Get a summary of your progress every week</p>
                  </div>
                  <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-blue-600 transition-colors">
                    <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-7 transition-transform" />
                  </button>
                </div>

                {/* Job Alerts Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-white font-semibold">Job Alerts</p>
                    <p className="text-gray-400 text-sm mt-1">Get notified about relevant job postings</p>
                  </div>
                  <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-600 transition-colors">
                    <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="glass-card-dark p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🔒</span>
                <h2 className="text-2xl font-bold text-white">Privacy & Security</h2>
              </div>
              <div className="space-y-4">
                {/* Public Profile Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-white font-semibold">Public Profile</p>
                    <p className="text-gray-400 text-sm mt-1">Allow others to view your profile</p>
                  </div>
                  <button
                    onClick={() => setPublicProfile(!publicProfile)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      publicProfile ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        publicProfile ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Data Privacy */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-white font-semibold">Data Privacy</p>
                  <p className="text-gray-400 text-sm mt-2">Your data is encrypted and never shared with third parties</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Learn More
                  </Button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-white font-semibold">Two-Factor Authentication</p>
                  <p className="text-gray-400 text-sm mt-2">Add an extra layer of security to your account</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="glass-card-dark p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🎨</span>
                <h2 className="text-2xl font-bold text-white">Preferences</h2>
              </div>
              <div className="space-y-4">
                {/* Theme */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-white font-semibold">Theme</p>
                    <p className="text-gray-400 text-sm mt-1">Dark Mode</p>
                  </div>
                  <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-blue-600 transition-colors">
                    <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-7 transition-transform" />
                  </button>
                </div>

                {/* Language */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-white font-semibold">Language</p>
                  <select className="mt-2 w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-card-dark p-8 rounded-2xl border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">⚠️</span>
                <h2 className="text-2xl font-bold text-white">Danger Zone</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-400 text-sm">These actions are permanent and cannot be undone</p>
                <div className="flex flex-col md:flex-row gap-3">
                  <Button variant="outline" size="md" className="text-red-400 border-red-500/50 hover:border-red-500">
                    Download My Data
                  </Button>
                  <Button size="md" className="bg-red-600 hover:bg-red-700 text-white">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end pt-6">
              <Button variant="outline" size="lg">
                Cancel
              </Button>
              <Button variant="gradient" size="lg">
                Save Changes
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
