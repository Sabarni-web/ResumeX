import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hoverable = false, 
  glass = false,
  onClick,
  ...props 
}) => {
  const baseClasses = "rounded-2xl p-6 transition-all duration-300";
  
  const glassClasses = glass 
    ? "glass-card" 
    : "bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-800 shadow-soft";
    
  const hoverClasses = hoverable 
    ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer dark:hover:border-slate-700" 
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
