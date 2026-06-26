import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success('Reset link sent to your email!');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[100px] -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Reset Password</h1>
            <p className="text-slate-500 dark:text-slate-400">
              {isSubmitted ? "Check your email for instructions" : "Enter your email to receive a reset link"}
            </p>
          </div>

          {!isSubmitted ? (
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

              <Button type="submit" fullWidth size="lg" isLoading={isLoading} className="mt-6">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="h-16 w-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail size={24} />
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                We've sent a password reset link to your email address. Please check your inbox and spam folder.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline" fullWidth>
                Try another email
              </Button>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-dark transition-colors">
              <FiArrowLeft className="mr-2" /> Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
