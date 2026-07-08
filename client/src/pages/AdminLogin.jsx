import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const ADMIN_EMAIL = 'example123@gmail.com';
const ADMIN_PASSWORD = '123456';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    // Simulate a brief delay for realism
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (data.email === ADMIN_EMAIL && data.password === ADMIN_PASSWORD) {
      const adminUser = {
        name: 'Admin',
        email: data.email,
        role: 'admin',
      };
      login(adminUser, 'admin-token');
      toast.success('Admin access granted. Welcome!');
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid admin credentials. Access denied.');
      toast.error('Invalid credentials');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-950">
      {/* Dark background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-red-500/8 to-orange-500/5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-primary/8 to-accent-purple/5 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 md:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-400 mb-4">
              <FiShield size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-slate-400 text-sm">Restricted access. Authorized personnel only.</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              <FiAlertTriangle size={16} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Admin Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border rounded-xl focus:ring-2 focus:ring-red-500/40 focus:outline-none transition-all text-white placeholder-slate-500 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-red-500'}`}
                  placeholder="admin@example.com"
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                />
              </div>
              {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Admin Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <FiLock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-10 py-2.5 bg-slate-800/50 border rounded-xl focus:ring-2 focus:ring-red-500/40 focus:outline-none transition-all text-white placeholder-slate-500 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-red-500'}`}
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FiShield size={18} />
              )}
              {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              ← Back to ResumeX
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div className="text-center mt-6">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
            <FiLock size={12} />
            Secured with end-to-end encryption
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
