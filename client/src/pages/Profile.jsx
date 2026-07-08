import React from 'react';
import { FiUser, FiMail, FiLock, FiSettings, FiBell } from 'react-icons/fi';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">Account Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your profile information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <Card className="p-6 text-center">
            <div className="relative mx-auto w-24 h-24 rounded-full mb-4">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full border-4 border-slate-100 dark:border-slate-800"
              />
              <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 hover:bg-primary-dark transition-colors">
                <FiUser size={14} />
              </button>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">John Doe</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Senior Frontend Engineer</p>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              Pro Plan
            </span>
          </Card>

          <Card className="p-2">
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                <FiUser className="text-primary" /> Personal Info
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <FiLock /> Password
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <FiBell /> Notifications
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <FiSettings /> Preferences
              </button>
            </nav>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="md:col-span-2">
          <Card className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Personal Information</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="John"
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Doe"
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FiMail size={16} />
                  </div>
                  <input 
                    type="email" 
                    defaultValue="john.doe@example.com"
                    disabled
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">Email address cannot be changed. Contact support if you need to update it.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Professional Title</label>
                <input 
                  type="text" 
                  defaultValue="Senior Frontend Engineer"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                <Button variant="ghost">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
