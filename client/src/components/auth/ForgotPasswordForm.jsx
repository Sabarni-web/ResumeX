import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import Button from '../common/Button';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Reset Password</h2>
      <p className="text-slate-500 mb-6">Enter your email and we'll send you instructions to reset your password.</p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <FiMail size={18} />
            </div>
            <input type="email" className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <Button fullWidth size="lg" className="mt-4">
          Send Reset Link <FiArrowRight className="ml-2" />
        </Button>
      </form>
      <div className="mt-6 text-center">
        <Link to="/login" className="text-sm font-medium text-primary hover:text-primary-dark">Back to Login</Link>
      </div>
    </div>
  );
};
export default ForgotPasswordForm;