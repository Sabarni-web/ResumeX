import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/global.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { InterviewProvider } from './context/InterviewContext.jsx';
import { ResumeProvider } from './context/ResumeContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <InterviewProvider>
            <App />
          </InterviewProvider>
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
