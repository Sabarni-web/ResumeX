import React, { useState, useEffect } from 'react';
import { FiMenu, FiBell, FiSun, FiMoon } from 'react-icons/fi';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-sans text-slate-800 dark:text-slate-100">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-card-dark/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              onClick={() => setIsMobileOpen(true)}
            >
              <FiMenu size={20} />
            </button>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-white hidden sm:block">
              {/* Dynamic Title based on route can go here */}
            </h1>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
              <FiBell size={18} />
              <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-danger"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent-purple overflow-hidden cursor-pointer border-2 border-white dark:border-slate-800 shadow-sm">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="h-full w-full object-cover" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-background-dark p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
