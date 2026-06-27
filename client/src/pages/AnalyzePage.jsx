import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFile, FiCheckCircle, FiAlertCircle, FiLogOut } from 'react-icons/fi';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const AnalyzePage = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, processing, complete, error
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

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
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('processing');
          setTimeout(() => {
            setUploadStatus('complete');
            setAnalysisResult({
              atsScore: 86,
              keywords: 91,
              formatting: 84,
              impact: 78,
              suggestions: [
                'Add quantifiable achievements to your work experience',
                'Include more industry-specific keywords',
                'Use action verbs at the beginning of bullet points',
                'Add a professional summary section',
                'Include relevant certifications or courses',
              ],
              strengths: [
                'Well-structured sections',
                'Good use of technical skills',
                'Consistent formatting throughout',
              ],
            });
          }, 2500);
          return 100;
        }
        return prev + 4;
      });
    }, 80);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus('idle');
    setProgress(0);
    setAnalysisResult(null);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="relative overflow-hidden pt-8 pb-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_60%)]"></div>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                Hey {firstName}! 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Upload your resume to get an AI-powered analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Upload Area */}
            <div className="lg:col-span-2">
              <Card
                className="min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 relative overflow-hidden transition-all duration-300"
                style={{
                  borderColor: isDragging ? '#3B82F6' : undefined,
                  backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.03)' : undefined,
                }}
              >
                {uploadStatus === 'idle' && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 w-full h-full text-center"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6"
                    >
                      <FiUploadCloud size={40} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & Drop your resume</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Supports PDF, DOC, DOCX (Max 5MB)</p>

                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileInput}
                    />
                    <label htmlFor="resume-upload">
                      <Button as="span" className="pointer-events-none cursor-pointer">Browse Files</Button>
                    </label>
                  </div>
                )}

                {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
                  <div className="flex flex-col items-center w-full max-w-md px-8 text-center">
                    <motion.div
                      animate={{ rotate: uploadStatus === 'processing' ? 360 : 0 }}
                      transition={{ duration: 2, repeat: uploadStatus === 'processing' ? Infinity : 0, ease: 'linear' }}
                      className={`h-16 w-16 rounded-full flex items-center justify-center mb-6 ${uploadStatus === 'processing' ? 'bg-accent-purple/10 text-accent-purple' : 'bg-primary/10 text-primary'}`}
                    >
                      <FiFile size={32} />
                    </motion.div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      {uploadStatus === 'uploading' ? 'Uploading Resume...' : 'AI Analyzing Your Resume...'}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                      {file?.name} ({(file?.size / 1024 / 1024).toFixed(2)} MB)
                    </p>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-2">
                      <motion.div
                        className={`h-full rounded-full ${uploadStatus === 'processing' ? 'bg-accent-purple' : 'bg-primary'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <div className="flex justify-between w-full text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span>{progress}%</span>
                      <span>{uploadStatus === 'processing' ? 'Extracting skills, scoring ATS...' : 'Transferring data...'}</span>
                    </div>
                  </div>
                )}

                {uploadStatus === 'complete' && !analysisResult && (
                  <div className="flex flex-col items-center w-full max-w-md px-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-20 w-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-6"
                    >
                      <FiCheckCircle size={40} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Analysis Complete!</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Loading results...</p>
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

              {/* Analysis Results */}
              {uploadStatus === 'complete' && analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 space-y-6"
                >
                  {/* Score Overview */}
                  <Card className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white">Analysis Results</h2>
                      <Button variant="outline" size="sm" onClick={resetUpload}>Upload Another</Button>
                    </div>

                    {/* ATS Score Circle */}
                    <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                      <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-200 dark:text-slate-700" />
                          <motion.circle
                            cx="60" cy="60" r="50" stroke="url(#scoreGradient)" strokeWidth="8" fill="none"
                            strokeLinecap="round"
                            strokeDasharray={314}
                            initial={{ strokeDashoffset: 314 }}
                            animate={{ strokeDashoffset: 314 - (314 * analysisResult.atsScore) / 100 }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                          />
                          <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">{analysisResult.atsScore}%</span>
                            <p className="text-xs text-slate-500">ATS Score</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 flex-1 w-full">
                        {[
                          { label: 'Keywords', value: analysisResult.keywords, color: 'text-primary' },
                          { label: 'Formatting', value: analysisResult.formatting, color: 'text-accent-cyan' },
                          { label: 'Impact', value: analysisResult.impact, color: 'text-accent-purple' },
                        ].map((metric) => (
                          <div key={metric.label} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-center">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{metric.label}</p>
                            <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}%</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Suggestions & Strengths */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-warning/10 text-warning flex items-center justify-center text-xs">!</span>
                        Suggestions to Improve
                      </h3>
                      <ul className="space-y-3">
                        {analysisResult.suggestions.map((s, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <span className="h-5 w-5 rounded-full bg-warning/10 text-warning flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </Card>

                    <Card className="p-6">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <FiCheckCircle className="text-success" size={18} />
                        Strengths Found
                      </h3>
                      <ul className="space-y-3">
                        {analysisResult.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <FiCheckCircle className="text-success flex-shrink-0 mt-0.5" size={16} />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link to="/job-match" className="flex-1">
                      <Button className="w-full" size="lg" variant="primary">
                         Go to Job Match
                      </Button>
                    </Link>
                    <Link to="/reports" className="flex-1">
                      <Button className="w-full" size="lg" variant="secondary">
                         View Full Report
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-gradient-to-br from-primary/5 to-accent-cyan/5 border-none shadow-none p-6">
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

              <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-none p-6">
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">Privacy Note</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your resume data is processed securely and never shared with third parties without your explicit consent.
                  We use it solely to provide you with insights and mock interview generation.
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-accent-purple/5 to-primary/5 border-none shadow-none p-6">
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">Need more tools?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Upgrade to Pro for unlimited analyses, mock interviews, and job matching.
                </p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href = '/pricing'}>
                  View Pricing
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyzePage;
