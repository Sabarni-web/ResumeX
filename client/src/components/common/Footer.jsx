import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-background-dark transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent-cyan text-white font-bold text-xl">
                R
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                Resume<span className="text-primary">X</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              AI-powered Resume Analyzer & Interview Coach. Get hired faster with data-driven insights.
            </p>
            <div className="flex items-center space-x-4 text-slate-400 dark:text-slate-500">
              <a href="#" className="hover:text-primary dark:hover:text-accent-cyan transition-colors"><FiTwitter size={20} /></a>
              <a href="#" className="hover:text-primary dark:hover:text-accent-cyan transition-colors"><FiGithub size={20} /></a>
              <a href="#" className="hover:text-primary dark:hover:text-accent-cyan transition-colors"><FiLinkedin size={20} /></a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/resume" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">Resume Analyzer</Link></li>
              <li><Link to="/job-match" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">Job Match</Link></li>
              <li><Link to="/interview" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">Mock Interview</Link></li>
              <li><Link to="/pricing" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">Guides</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">API Docs</a></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent-cyan transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} ResumeX. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
            <span className="flex h-2 w-2 rounded-full bg-success"></span>
            Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
