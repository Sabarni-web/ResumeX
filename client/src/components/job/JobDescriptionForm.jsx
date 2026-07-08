import React, { useState } from 'react';
import { FiBriefcase } from 'react-icons/fi';
import Button from '../common/Button';

const JobDescriptionForm = ({ onSubmit, isLoading }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ jobTitle, description });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Target Job Title</label>
        <div className="relative">
          <FiBriefcase className="absolute left-3 top-3.5 text-slate-400" />
          <input 
            type="text" 
            required
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-800 dark:text-slate-200"
            placeholder="e.g. Senior Frontend Developer"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Job Description</label>
        <textarea 
          required
          rows={6}
          className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-slate-800 dark:text-slate-200"
          placeholder="Paste the job description here..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
        Analyze Match
      </Button>
    </form>
  );
};
export default JobDescriptionForm;