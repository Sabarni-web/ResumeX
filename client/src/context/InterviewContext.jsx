// oxlint-disable react/only-export-components
import { createContext, useContext, useMemo, useState } from 'react';

const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState([]);

  const value = useMemo(() => ({
    session,
    setSession,
    answers,
    setAnswers,
  }), [session, answers]);

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>;
};

export const useInterviewContext = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error('useInterviewContext must be used within an InterviewProvider');
  }

  return context;
};
