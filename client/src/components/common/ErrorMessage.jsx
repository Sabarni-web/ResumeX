import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-slate-800 dark:text-red-400 dark:border-red-800" role="alert">
      <FiAlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
      <span className="sr-only">Error</span>
      <div>{message}</div>
    </div>
  );
};
export default ErrorMessage;