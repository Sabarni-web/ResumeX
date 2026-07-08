import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/common/PublicLayout';
import DashboardLayout from './components/common/DashboardLayout';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Features = lazy(() => import('./pages/Features'));
const Pricing = lazy(() => import('./pages/Pricing'));
const SignIn = lazy(() => import('./pages/SignIn'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AnalyzePage = lazy(() => import('./pages/AnalyzePage'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ResumeAnalyzer = lazy(() => import('./pages/ResumeAnalyzer'));
const JobMatcher = lazy(() => import('./pages/JobMatcher'));
const MockInterview = lazy(() => import('./pages/MockInterview'));
const Reports = lazy(() => import('./pages/Reports'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Fallback loader component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background-light dark:bg-background-dark">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes with Public Layout */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
        <Route path="/signin" element={<PublicLayout><SignIn /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
        
        {/* Admin Login - Dedicated layout */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* User Protected Routes with Public Layout */}
        <Route path="/analyze" element={<PrivateRoute><PublicLayout><AnalyzePage /></PublicLayout></PrivateRoute>} />
        <Route path="/job-match" element={<PrivateRoute><PublicLayout><JobMatcher /></PublicLayout></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><PublicLayout><Reports /></PublicLayout></PrivateRoute>} />
        
        {/* Admin Protected Routes with Dashboard Layout */}
        <Route path="/dashboard" element={<AdminRoute><DashboardLayout><Dashboard /></DashboardLayout></AdminRoute>} />
        <Route path="/resume" element={<AdminRoute><DashboardLayout><ResumeAnalyzer /></DashboardLayout></AdminRoute>} />
        <Route path="/interview" element={<AdminRoute><DashboardLayout><MockInterview /></DashboardLayout></AdminRoute>} />
        <Route path="/profile" element={<AdminRoute><DashboardLayout><Profile /></DashboardLayout></AdminRoute>} />
        
        {/* 404 */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

