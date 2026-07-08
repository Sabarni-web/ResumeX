import React, { useCallback } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const ResumeUpload = ({ onUpload }) => {
  const handleDragOver = useCallback((e) => e.preventDefault(), []);
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  }, [onUpload]);

  return (
    <div 
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 transition-colors rounded-2xl p-12 text-center cursor-pointer"
    >
      <FiUploadCloud size={48} className="mx-auto text-primary mb-4" />
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Upload your resume</h3>
      <p className="text-slate-500 mb-6">Drag and drop your PDF or DOCX file here, or click to browse</p>
      <input type="file" className="hidden" id="resume-upload" onChange={(e) => e.target.files && onUpload(e.target.files[0])} accept=".pdf,.doc,.docx" />
      <label htmlFor="resume-upload" className="inline-block px-6 py-2.5 bg-primary text-white rounded-xl font-medium cursor-pointer shadow-sm hover:bg-primary-dark transition-colors">
        Browse Files
      </label>
    </div>
  );
};
export default ResumeUpload;