import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiTrendingUp, FiTarget, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[80px] dark:bg-primary/30"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-accent-purple/20 rounded-full blur-[80px] dark:bg-accent-purple/20"></div>
          <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-accent-cyan/20 rounded-full blur-[80px] dark:bg-accent-cyan/20"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent-cyan text-sm font-semibold mb-6">
              ResumeX 2.0 is now live
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
              Land your dream job with <br className="hidden md:block"/>
              <span className="text-gradient">AI-Powered</span> Insights
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Analyze your resume, match with job descriptions, and practice with our AI interview coach. Get actionable feedback to stand out from the crowd.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto px-8">
                  Upload Resume - It's Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                Watch Demo
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-500">
              No credit card required. Free tier available forever.
            </p>
          </motion.div>
          
          {/* Dashboard Preview Image/Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 mx-auto max-w-5xl relative"
          >
            <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-2 shadow-2xl backdrop-blur-sm">
              <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[16/9] flex items-center justify-center">
                <span className="text-slate-400 dark:text-slate-600 font-medium">Dashboard Preview Placeholder</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to succeed</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Our comprehensive suite of tools ensures you're prepared for every step of the hiring process.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <FeatureCard 
              icon={<FiUploadCloud />} 
              title="AI Resume Analysis" 
              description="Get instant feedback on formatting, keywords, and impact to beat the ATS."
            />
            <FeatureCard 
              icon={<FiTarget />} 
              title="Smart Job Match" 
              description="Compare your resume against any job description and discover missing skills."
            />
            <FeatureCard 
              icon={<FiMessageSquare />} 
              title="Mock Interviews" 
              description="Practice with an AI coach that asks role-specific questions and evaluates answers."
            />
            <FeatureCard 
              icon={<FiTrendingUp />} 
              title="Skill Gap Analysis" 
              description="Identify exactly what you need to learn to qualify for your target roles."
            />
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How it works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Four simple steps to your next career move.</p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
              <Step number="1" title="Upload Resume" description="Drop your current resume in PDF or Word format." />
              <Step number="2" title="AI Analysis" description="Our ML models parse and evaluate your profile." />
              <Step number="3" title="Match & Improve" description="Compare with jobs and fill in the missing gaps." />
              <Step number="4" title="Practice & Shine" description="Ase the interview with AI-guided mock sessions." />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary dark:bg-primary-dark"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to accelerate your career?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join thousands of job seekers who have successfully landed their dream roles using ResumeX.</p>
          <Link to="/register">
            <button className="bg-white text-primary hover:bg-slate-50 font-semibold py-4 px-10 rounded-full shadow-lg transition-transform hover:-translate-y-1 text-lg">
              Start Your Free Trial
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, description }) => (
  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
    <Card hoverable className="h-full border-transparent hover:border-primary/20 dark:hover:border-primary/30">
      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent-cyan flex items-center justify-center text-2xl mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </Card>
  </motion.div>
);

const Step = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="h-16 w-16 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-900 shadow-lg flex items-center justify-center text-xl font-bold text-primary dark:text-accent-cyan mb-6 relative z-10">
      {number}
    </div>
    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);

export default Home;
