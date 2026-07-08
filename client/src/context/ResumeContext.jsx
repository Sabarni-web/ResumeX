// oxlint-disable react/only-export-components
import { createContext, useContext, useMemo, useState } from 'react';

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [activeResume, setActiveResume] = useState(null);
  const [latestAnalysis, setLatestAnalysis] = useState(null);

  const value = useMemo(() => ({
    activeResume,
    setActiveResume,
    latestAnalysis,
    setLatestAnalysis,
  }), [activeResume, latestAnalysis]);

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }

  return context;
};
