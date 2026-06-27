import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut, FiUser, FiShield } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode toggle
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent-cyan text-white font-bold text-xl">
            R
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            Resume<span className="text-primary">X</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx} 
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-primary dark:text-accent-cyan'
                  : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-accent-cyan'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Show "Analyze Resume" link if user is logged in and not admin */}
          {isAuthenticated && !isAdmin && (
            <Link
              to="/analyze"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/analyze'
                  ? 'text-primary dark:text-accent-cyan'
                  : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-accent-cyan'
              }`}
            >
              Analyze Resume
            </Link>
          )}

          {/* Show "Admin Panel" link if admin */}
          {isAuthenticated && isAdmin && (
            <Link
              to="/dashboard"
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                location.pathname === '/dashboard'
                  ? 'text-primary dark:text-accent-cyan'
                  : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-accent-cyan'
              }`}
            >
              <FiShield size={14} />
              Admin Panel
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {!isAuthenticated ? (
            <>
              {/* Sign In button — user facing, visually different */}
              <Link
                to="/signin"
                className="rounded-full border-2 border-primary/30 px-5 py-2 text-sm font-medium text-primary hover:bg-primary/5 dark:border-accent-cyan/30 dark:text-accent-cyan dark:hover:bg-accent-cyan/5 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* User info */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent-purple overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm flex items-center justify-center">
                  <FiUser size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[120px] truncate">
                  {user?.name || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:text-danger hover:bg-danger/5 dark:text-slate-400 dark:hover:text-danger transition-all"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300">
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 dark:text-white focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-slate-200 dark:border-slate-700/50"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  to={link.path}
                  className={`text-base font-medium ${
                    location.pathname === link.path
                      ? 'text-primary dark:text-accent-cyan'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated && !isAdmin && (
                <Link to="/analyze" className="text-base font-medium text-slate-600 dark:text-slate-300">
                  Analyze Resume
                </Link>
              )}

              {isAuthenticated && isAdmin && (
                <Link to="/dashboard" className="text-base font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <FiShield size={16} />
                  Admin Panel
                </Link>
              )}

              <hr className="border-slate-200 dark:border-slate-700" />

              {!isAuthenticated ? (
                <>
                  <Link to="/signin" className="text-base font-medium text-primary dark:text-accent-cyan">
                    Sign In
                  </Link>
                  <Link to="/register" className="inline-block w-full text-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-white shadow-md">
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <FiUser size={16} />
                    <span>{user?.name || 'User'}</span>
                    {isAdmin && <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-bold ml-2">Admin</span>}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-base font-medium text-danger"
                  >
                    <FiLogOut size={18} />
                    Log Out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
