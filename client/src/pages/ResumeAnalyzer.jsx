import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFile, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const ResumeAnalyzer = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, processing, complete, error
  const [progress, setProgress] = useState(0);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      setUploadStatus('error');
      return;
    }

    setFile(selectedFile);
    simulateUploadProcess();
  };

  const simulateUploadProcess = () => {
    setUploadStatus('uploading');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('processing');
          setTimeout(() => {
            setUploadStatus('complete');
          }, 2000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus('idle');
    setProgress(0);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">Resume Analyzer</h1>
        <p className="text-slate-500 dark:text-slate-400">Upload your resume to get an AI-powered detailed analysis of your skills, formatting, and ATS compatibility.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Area */}
        <div className="lg:col-span-2">
          <Card className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 relative overflow-hidden transition-colors" style={{
            borderColor: isDragging ? '#3B82F6' : undefined,
            backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.05)' : undefined
          }}>
            
            {uploadStatus === 'idle' && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center p-8 w-full h-full text-center"
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <FiUploadCloud size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop your resume</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Supports PDF, DOCX (Max 5MB)</p>
                
                <input 
                  type="file" 
                  id="resume-upload" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInput}
                />
                <label htmlFor="resume-upload">
                  <Button as="span" className="pointer-events-none">Browse Files</Button>
                </label>
              </div>
            )}

            {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
              <div className="flex flex-col items-center w-full max-w-md px-8 text-center">
                <motion.div 
                  animate={{ rotate: uploadStatus === 'processing' ? 360 : 0 }}
                  transition={{ duration: 2, repeat: uploadStatus === 'processing' ? Infinity : 0, ease: "linear" }}
                  className={`h-16 w-16 rounded-full flex items-center justify-center mb-6 ${uploadStatus === 'processing' ? 'bg-accent-purple/10 text-accent-purple' : 'bg-primary/10 text-primary'}`}
                >
                  <FiFile size={32} />
                </motion.div>
                
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                  {uploadStatus === 'uploading' ? 'Uploading Resume...' : 'AI Processing...'}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  {file?.name} ({(file?.size / 1024 / 1024).toFixed(2)} MB)
                </p>

                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    className={`h-full rounded-full ${uploadStatus === 'processing' ? 'bg-accent-purple' : 'bg-primary'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between w-full text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span>{progress}%</span>
                  <span>{uploadStatus === 'processing' ? 'Analyzing structure, extracting skills...' : 'Transferring data...'}</span>
                </div>
              </div>
            )}

            {uploadStatus === 'complete' && (
              <div className="flex flex-col items-center w-full max-w-md px-8 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-20 w-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-6"
                >
                  <FiCheckCircle size={40} />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Analysis Complete!</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Your resume has been successfully parsed and scored.</p>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={resetUpload}>Upload Another</Button>
                  <Button onClick={() => navigate('/reports')}>View Results</Button>
                </div>
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="flex flex-col items-center w-full max-w-md px-8 text-center">
                <div className="h-20 w-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6">
                  <FiAlertCircle size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Upload Failed</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Please upload a valid PDF or Word document under 5MB.</p>
                <Button variant="outline" onClick={resetUpload}>Try Again</Button>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gradient-to-br from-primary/5 to-accent-cyan/5 border-none shadow-none">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center">
              <span className="bg-primary text-white h-6 w-6 rounded-full inline-flex items-center justify-center text-xs mr-2">i</span>
              What gets analyzed?
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start">
                <FiCheckCircle className="text-success mt-1 mr-2 flex-shrink-0" />
                <span><strong>ATS Compatibility:</strong> Keyword density, standard section headers, font and layout parseability.</span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="text-success mt-1 mr-2 flex-shrink-0" />
                <span><strong>Impact Metrics:</strong> Use of action verbs and quantifiable achievements.</span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="text-success mt-1 mr-2 flex-shrink-0" />
                <span><strong>Skill Extraction:</strong> Identification of hard and soft skills across your experience.</span>
              </li>
            </ul>
          </Card>
          
          <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-none">
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Privacy Note</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your resume data is processed securely and never shared with third parties without your explicit consent. 
              We use it solely to provide you with insights and mock interview generation.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;

