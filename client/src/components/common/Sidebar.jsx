import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiFileText, 
  FiBriefcase, 
  FiVideo, 
  FiPieChart, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiMenu
} from 'react-icons/fi';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome size={20} />, path: '/dashboard' },
    { name: 'Resume Analyzer', icon: <FiFileText size={20} />, path: '/resume' },
    { name: 'Job Match', icon: <FiBriefcase size={20} />, path: '/job-match' },
    { name: 'Mock Interview', icon: <FiVideo size={20} />, path: '/interview' },
    { name: 'Reports', icon: <FiPieChart size={20} />, path: '/reports' },
    { name: 'Profile', icon: <FiUser size={20} />, path: '/profile' },
  ];

  const sidebarContent = (
    <div className={`h-full flex flex-col bg-white dark:bg-card-dark border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 min-w-[2rem] items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent-cyan text-white font-bold text-xl">
              R
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white truncate">
              Resume<span className="text-primary">X</span>
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="flex w-full justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent-cyan text-white font-bold text-xl">
              R
            </div>
          </div>
        )}
        
        {/* Desktop Collapse Button */}
        <button 
          className="hidden md:flex p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors absolute -right-3 top-5 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 shadow-sm z-10"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/dashboard');
          
          return (
            <NavLink
              key={idx}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent-cyan font-medium' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title={isCollapsed ? item.name : ""}
            >
              <div className={`${isActive ? 'text-primary dark:text-accent-cyan' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'}`}>
                {item.icon}
              </div>
              
              {!isCollapsed && (
                <span className="truncate whitespace-nowrap">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button className="flex w-full items-center gap-3 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
          <FiSettings size={20} className="text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button className="flex w-full items-center gap-3 px-3 py-2 rounded-xl text-danger hover:bg-danger/10 transition-colors group">
          <FiLogOut size={20} />
          {!isCollapsed && <span>Log out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen sticky top-0 z-40">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 h-full z-50 md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
