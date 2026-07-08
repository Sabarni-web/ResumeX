import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiSearch, FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const JobMatcher = () => {
  const [jd, setJd] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = () => {
    if (!jd.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate ML processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        matchPercentage: 78,
        matchingSkills: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'REST APIs'],
        missingSkills: ['TypeScript', 'GraphQL', 'Jest', 'CI/CD'],
        strengths: [
          'Strong frontend foundations',
          'Good experience with state management',
          'Clear communication skills mentioned'
        ],
        weaknesses: [
          'Lack of typed language experience',
          'No automated testing experience shown'
        ],
        suggestions: [
          'Add a project using TypeScript to your portfolio',
          'Mention any testing frameworks you have used, even if basic',
          'Update your summary to explicitly mention CI/CD pipelines if you have used them'
        ]
      });
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">Job Match Analysis</h1>
        <p className="text-slate-500 dark:text-slate-400">Paste a job description below to see how well your currently active resume matches the requirements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Section */}
        <div className="lg:col-span-1 h-full flex flex-col space-y-4">
          <Card className="flex-1 flex flex-col h-[500px]">
            <div className="flex items-center gap-2 mb-4">
              <FiBriefcase className="text-primary" size={20} />
              <h3 className="font-semibold text-slate-800 dark:text-white">Job Description</h3>
            </div>
            
            <textarea 
              className="flex-1 w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:outline-none resize-none text-sm text-slate-700 dark:text-slate-300"
              placeholder="Paste the full job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
            
            <Button 
              className="mt-4" 
              fullWidth 
              size="lg" 
              onClick={handleAnalyze}
              isLoading={isAnalyzing}
              disabled={!jd.trim() || isAnalyzing}
            >
              <FiSearch className="mr-2" /> Analyze Match
            </Button>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 min-h-[500px]">
          <AnimatePresence mode="wait">
            {!results && !isAnalyzing && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center p-8 text-center"
              >
                <div className="max-w-md">
                  <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 mb-6">
                    <FiSearch size={40} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">No Analysis Yet</h3>
                  <p className="text-slate-500 dark:text-slate-400">Paste a job description on the left and hit Analyze to see your match score and personalized insights.</p>
                </div>
              </motion.div>
            )}

            {isAnalyzing && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6"></div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Extracting Requirements...</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">Our AI is parsing the job description and comparing it semantically to your resume.</p>
              </motion.div>
            )}

            {results && !isAnalyzing && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Match Score Card */}
                <Card className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-primary/5 to-accent-cyan/5 border-none">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200 dark:text-slate-700"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        className={`${results.matchPercentage > 75 ? 'text-success' : results.matchPercentage > 50 ? 'text-warning' : 'text-danger'}`}
                        strokeWidth="3"
                        strokeDasharray={`${results.matchPercentage}, 100`}
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${results.matchPercentage}, 100` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-slate-800 dark:text-white">{results.matchPercentage}%</span>
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">Match</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Good Match!</h3>
                    <p className="text-slate-600 dark:text-slate-400">Your resume hits most of the key requirements. With a few tweaks, you have a strong chance of securing an interview.</p>
                  </div>
                </Card>

                {/* Skills Gap Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-t-4 border-t-success p-5">
                    <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                      <FiCheck className="text-success" /> Matching Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.matchingSkills.map((skill, idx) => (
                        <span key={idx} className="bg-success/10 text-success text-xs font-medium px-2.5 py-1 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                  
                  <Card className="border-t-4 border-t-danger p-5">
                    <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                      <FiX className="text-danger" /> Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.missingSkills.map((skill, idx) => (
                        <span key={idx} className="bg-danger/10 text-danger text-xs font-medium px-2.5 py-1 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Actionable Insights */}
                <Card className="p-6">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6">AI Suggestions to Improve</h4>
                  <ul className="space-y-4">
                    {results.suggestions.map((sugg, idx) => (
                      <li key={idx} className="flex gap-3">
                        <div className="mt-0.5 min-w-[20px] text-warning">
                          <FiAlertTriangle />
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300">{sugg}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button variant="outline" fullWidth>Generate Tailored Resume (Beta)</Button>
                  </div>
                </Card>
                
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default JobMatcher;
