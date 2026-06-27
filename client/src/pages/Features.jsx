import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiUploadCloud,
  FiTarget,
  FiMessageSquare,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiBarChart2,
  FiCpu,
} from 'react-icons/fi';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const features = [
  {
    icon: <FiUploadCloud size={28} />,
    title: 'AI Resume Analysis',
    description:
      'Upload your resume in PDF or Word format and receive a comprehensive ATS compatibility score. Our AI evaluates formatting, keyword density, section structure, and impact statements.',
    highlights: ['ATS scoring', 'Keyword optimization', 'Format validation'],
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-500/10 text-blue-500 dark:bg-blue-400/15 dark:text-blue-400',
  },
  {
    icon: <FiTarget size={28} />,
    title: 'Smart Job Matching',
    description:
      'Paste any job description and instantly see how well your resume matches. Get specific suggestions for missing keywords, skills, and experience gaps.',
    highlights: ['Real-time comparison', 'Gap identification', 'Skill suggestions'],
    color: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/15 dark:text-purple-400',
  },
  {
    icon: <FiMessageSquare size={28} />,
    title: 'AI Mock Interviews',
    description:
      'Practice with our intelligent interview coach that generates role-specific questions, evaluates your answers in real-time, and provides detailed feedback.',
    highlights: ['Role-specific Q&A', 'Real-time evaluation', 'Detailed feedback'],
    color: 'from-emerald-500 to-teal-400',
    bgColor: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/15 dark:text-emerald-400',
  },
  {
    icon: <FiTrendingUp size={28} />,
    title: 'Skill Gap Analysis',
    description:
      'Identify exactly which skills, certifications, and experiences you need to qualify for your dream role. Get personalized learning roadmaps.',
    highlights: ['Personalized roadmaps', 'Certification tracking', 'Progress metrics'],
    color: 'from-orange-500 to-amber-400',
    bgColor: 'bg-orange-500/10 text-orange-500 dark:bg-orange-400/15 dark:text-orange-400',
  },
  {
    icon: <FiBarChart2 size={28} />,
    title: 'Detailed Reports',
    description:
      'Access rich analytical reports with visual breakdowns of your resume strength, interview performance, and career readiness over time.',
    highlights: ['Visual dashboards', 'Trend analysis', 'Export to PDF'],
    color: 'from-rose-500 to-red-400',
    bgColor: 'bg-rose-500/10 text-rose-500 dark:bg-rose-400/15 dark:text-rose-400',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Enterprise Security',
    description:
      'Your data is encrypted at rest and in transit. We never share your resume with third parties and comply with GDPR and SOC 2 standards.',
    highlights: ['End-to-end encryption', 'GDPR compliant', 'SOC 2 certified'],
    color: 'from-slate-500 to-gray-400',
    bgColor: 'bg-slate-500/10 text-slate-500 dark:bg-slate-400/15 dark:text-slate-400',
  },
  {
    icon: <FiZap size={28} />,
    title: 'Instant Results',
    description:
      'Get your resume analysis in under 30 seconds. Our optimized ML pipeline processes documents at lightning speed with no queue times.',
    highlights: ['Sub-30s analysis', 'No queue wait', 'Instant feedback'],
    color: 'from-yellow-500 to-lime-400',
    bgColor: 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-400/15 dark:text-yellow-400',
  },
  {
    icon: <FiCpu size={28} />,
    title: 'Advanced ML Models',
    description:
      'Powered by state-of-the-art NLP models fine-tuned on millions of successful resumes and job descriptions across every industry.',
    highlights: ['Fine-tuned NLP', 'Cross-industry', 'Continuous learning'],
    color: 'from-indigo-500 to-violet-400',
    bgColor: 'bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/15 dark:text-indigo-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Features = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:56px_56px]"></div>
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-primary/8 via-accent-purple/5 to-transparent dark:from-primary/15 dark:via-accent-purple/10"></div>

        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent-cyan text-sm font-semibold mb-6">
              Full Feature Suite
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Everything you need to{' '}
              <span className="text-gradient">ace your career</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              From AI-powered resume analysis to mock interviews, ResumeX gives you the competitive edge to land your dream job.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card hoverable className="h-full p-6 md:p-8 border-transparent hover:border-primary/15 dark:hover:border-primary/25 group">
                  <div className="flex items-start gap-5">
                    <div className={`h-14 w-14 rounded-2xl ${feature.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.highlights.map((hl) => (
                          <span
                            key={hl}
                            className="inline-block text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden bg-primary dark:bg-primary-dark">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%)] bg-[size:40px_40px] opacity-20"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of job seekers using ResumeX to land their dream roles.
          </p>
          <Link to="/register">
            <Button
              size="lg"
              className="!bg-white !text-primary hover:!bg-slate-50 !shadow-lg !rounded-full !px-10"
            >
              Start Free — No Credit Card
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
