import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiMicOff, FiClock, FiCheck, FiArrowRight } from 'react-icons/fi';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const mockQuestions = [
  'Tell me about a time you faced a significant technical challenge and how you overcame it.',
  'How do you handle disagreements with team members on architectural decisions?',
  "Explain React's Virtual DOM and why it is useful.",
  'Where do you see your career in 5 years?',
];

const MockInterview = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = mockQuestions[currentIdx];

  const handleNext = useCallback(() => {
    if (currentIdx < mockQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setAnswer('');
      setTimeLeft(120);
      setIsRecording(false);
    } else {
      setIsFinished(true);
    }
  }, [currentIdx]);

  useEffect(() => {
    if (isFinished) return undefined;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleNext, isFinished]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <Card className="text-center p-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="h-20 w-20 bg-success/10 text-success rounded-full flex items-center justify-center text-4xl mb-6">
              <FiCheck />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Interview Completed!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              Your AI coach is analyzing your responses. The detailed report will be ready shortly.
            </p>
            <Button size="lg" onClick={() => navigate('/reports')}>
              View Detailed Report
            </Button>
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mock Interview Session</h1>
          <p className="text-slate-500 dark:text-slate-400">Senior Frontend Engineer Role</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <FiClock size={18} className={timeLeft < 30 ? 'text-danger animate-pulse' : ''} />
            <span className={`font-mono text-xl ${timeLeft < 30 ? 'text-danger font-bold' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300">
            Question {currentIdx + 1} of {mockQuestions.length}
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mb-10 overflow-hidden">
        <motion.div
          className="bg-primary h-full rounded-full"
          initial={{ width: `${(currentIdx / mockQuestions.length) * 100}%` }}
          animate={{ width: `${((currentIdx + 1) / mockQuestions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 md:p-12 mb-8 shadow-lg border-t-4 border-t-primary">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white leading-relaxed mb-8">
              {currentQuestion}
            </h2>

            <div className="relative">
              <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Type your answer here or use the microphone to speak..."
                className="w-full min-h-[200px] p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none resize-y text-slate-700 dark:text-slate-300 text-lg transition-colors"
              />

              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={toggleRecording}
                  className={`p-3 rounded-full flex items-center justify-center transition-all shadow-md ${
                    isRecording
                      ? 'bg-danger text-white animate-pulse shadow-danger/40'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                  title="Toggle Microphone"
                  type="button"
                >
                  {isRecording ? <FiMicOff size={20} /> : <FiMic size={20} />}
                </button>
              </div>
            </div>

            {isRecording && (
              <div className="mt-3 text-sm text-danger flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
                </span>
                Recording in progress...
              </div>
            )}
          </Card>

          <div className="flex justify-end">
            <Button size="lg" onClick={handleNext} className="group">
              {currentIdx === mockQuestions.length - 1 ? 'Finish Interview' : 'Next Question'}
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MockInterview;
