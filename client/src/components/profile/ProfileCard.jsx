import React from 'react';
import { FiUser, FiMail, FiCalendar } from 'react-icons/fi';
import Button from '../common/Button';

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white text-3xl font-bold shadow-lg">
        {user?.name?.charAt(0) || 'U'}
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{user?.name || 'User Name'}</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <span className="flex items-center justify-center md:justify-start"><FiMail className="mr-2" /> {user?.email || 'email@example.com'}</span>
          <span className="flex items-center justify-center md:justify-start"><FiCalendar className="mr-2" /> Joined {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-3 justify-center md:justify-start">
          <Button variant="outline" size="sm">Edit Profile</Button>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;