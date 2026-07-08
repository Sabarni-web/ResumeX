import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiTrendingUp, FiTarget, FiMessageSquare } from 'react-icons/fi';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="w-full">
      <section className="relative overflow-hidden pt-24 pb-24 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px]"></div>
        <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-primary/10 to-transparent dark:from-primary/20"></div>

        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent-cyan text-sm font-semibold mb-6">
              ResumeX 2.0 is now live
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
              Land your dream job with <br className="hidden md:block" />
              <span className="text-gradient">AI-Powered</span> Insights
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Analyze your resume, match with job descriptions, and practice with an AI interview coach. Get actionable feedback to stand out from the crowd.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signin">
                <Button size="lg" className="w-full sm:w-auto px-8">
                  Upload Resume - It's Free
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                  View Demo
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500 dark:text-slate-500">
              No credit card required. Free tier available forever.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 mx-auto max-w-5xl relative"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </section>

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
            viewport={{ once: true, margin: '-100px' }}
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

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How it works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Four simple steps to your next career move.</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
              <Step number="1" title="Upload Resume" description="Drop your current resume in PDF or Word format." />
              <Step number="2" title="AI Analysis" description="Our ML models parse and evaluate your profile." />
              <Step number="3" title="Match & Improve" description="Compare with jobs and fill in the missing gaps." />
              <Step number="4" title="Practice & Shine" description="Ace the interview with AI-guided mock sessions." />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden bg-primary dark:bg-primary-dark">
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to accelerate your career?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join thousands of job seekers who have successfully landed their dream roles using ResumeX.</p>
          <Link to="/signin">
            <button className="bg-white text-primary hover:bg-slate-50 font-semibold py-4 px-10 rounded-full shadow-lg transition-transform hover:-translate-y-1 text-lg">
              Start Your Free Trial
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const DashboardPreview = () => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-danger"></span>
        <span className="h-3 w-3 rounded-full bg-warning"></span>
        <span className="h-3 w-3 rounded-full bg-success"></span>
      </div>
      <span className="text-xs font-semibold uppercase text-slate-400">ResumeX Career Console</span>
    </div>

    <div className="grid gap-4 p-4 text-left lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800/80">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-primary">ATS Health</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Frontend Resume Review</h3>
            </div>
            <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-bold text-success">86%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full w-[86%] rounded-full bg-success"></div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              ['Keywords', '91%'],
              ['Format', '84%'],
              ['Impact', '78%'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-white p-3 shadow-sm dark:bg-slate-900">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800/80">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-slate-900 dark:text-white">Match Trend</h4>
            <span className="text-xs font-medium text-success">+12% this week</span>
          </div>
          <div className="flex h-28 items-end gap-2">
            {[44, 58, 52, 68, 74, 82, 88].map((height, index) => (
              <div key={index} className="flex flex-1 items-end rounded-t-md bg-primary/10">
                <div className="w-full rounded-t-md bg-primary" style={{ height: `${height}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl bg-slate-900 p-5 text-white dark:bg-slate-950">
          <p className="text-xs font-semibold uppercase text-accent-cyan">Interview Coach</p>
          <h4 className="mt-2 text-lg font-bold">Next question queued</h4>
          <p className="mt-3 text-sm text-slate-300">Explain how you debug a slow React screen and measure the fix.</p>
          <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
            <span>Role: Frontend Engineer</span>
            <span>2:00 timer</span>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800/80">
          <h4 className="font-semibold text-slate-900 dark:text-white">Skill gaps</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {['TypeScript', 'Testing', 'GraphQL', 'CI/CD'].map((skill) => (
              <span key={skill} className="rounded-md bg-danger/10 px-2.5 py-1 text-xs font-semibold text-danger">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

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
