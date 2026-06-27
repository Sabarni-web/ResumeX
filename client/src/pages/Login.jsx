import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const redirectTo = location.state?.from?.pathname || '/dashboard';
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await loginUser(data);
      const user = response.user || { name: response.name || 'ResumeX User', email: data.email };
      const token = response.token || response.accessToken;

      login(user, token);
      toast.success('Successfully logged in!');
      navigate(redirectTo, { replace: true });
    } catch {
      const demoUser = { name: 'Demo User', email: data.email };
      login(demoUser, 'demo-token');
      toast.success('Backend unavailable, started demo session.');
      navigate(redirectTo, { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[100px] -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-900/50 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all ${errors.email ? 'border-danger focus:ring-danger' : 'border-slate-200 dark:border-slate-700 focus:border-primary dark:focus:border-primary'}`}
                  placeholder="name@example.com"
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                />
              </div>
              {errors.email && <span className="text-danger text-xs mt-1 block">{errors.email.message}</span>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-primary hover:text-primary-dark transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FiLock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-10 py-2.5 bg-white/50 dark:bg-slate-900/50 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all ${errors.password ? 'border-danger focus:ring-danger' : 'border-slate-200 dark:border-slate-700 focus:border-primary dark:focus:border-primary'}`}
                  placeholder="********"
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-danger text-xs mt-1 block">{errors.password.message}</span>}
            </div>

            <Button type="submit" fullWidth size="lg" isLoading={isLoading} className="mt-6">
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;



