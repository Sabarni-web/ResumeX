import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiZap } from 'react-icons/fi';
import Button from '../components/common/Button';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for getting started with AI resume analysis.',
    features: [
      { text: '3 resume analyses/month', included: true },
      { text: 'Basic ATS score', included: true },
      { text: 'Keyword suggestions', included: true },
      { text: 'Format validation', included: true },
      { text: 'Job matching', included: false },
      { text: 'Mock interviews', included: false },
      { text: 'Detailed reports', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started Free',
    popular: false,
    gradient: '',
  },
  {
    name: 'Pro',
    price: { monthly: 19, yearly: 15 },
    description: 'For serious job seekers who want every advantage.',
    features: [
      { text: 'Unlimited resume analyses', included: true },
      { text: 'Advanced ATS score + tips', included: true },
      { text: 'Smart keyword optimization', included: true },
      { text: 'Format + impact analysis', included: true },
      { text: 'Unlimited job matching', included: true },
      { text: '10 mock interviews/month', included: true },
      { text: 'Detailed PDF reports', included: true },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Pro Trial',
    popular: true,
    gradient: 'from-primary to-accent-cyan',
  },
  {
    name: 'Enterprise',
    price: { monthly: 49, yearly: 39 },
    description: 'For teams, universities, and career services.',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Team management dashboard', included: true },
      { text: 'Custom branding', included: true },
      { text: 'API access', included: true },
      { text: 'Unlimited mock interviews', included: true },
      { text: 'Analytics & reporting', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: '24/7 priority support', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: '',
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]"></div>

        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-accent-purple/10 text-accent-purple dark:bg-accent-purple/20 text-sm font-semibold mb-6">
              Simple, Transparent Pricing
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Choose the plan that{' '}
              <span className="text-gradient">fits your goals</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Start for free. Upgrade when you're ready to unlock the full power of AI-driven career tools.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative h-7 w-14 rounded-full transition-colors duration-300 ${isYearly ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
              >
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md"
                  style={{ left: isYearly ? '30px' : '2px' }}
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                Yearly
                <span className="ml-1.5 text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">Save 20%</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary/40 bg-white dark:bg-slate-800 shadow-xl shadow-primary/10 scale-[1.03] z-10'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-card-dark hover:border-primary/20 dark:hover:border-primary/30 hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-accent-cyan text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                      <FiZap size={12} /> Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-slate-500 dark:text-slate-400 text-sm">/month</span>
                    )}
                  </div>
                  {isYearly && plan.price.monthly > 0 && (
                    <p className="text-xs text-slate-500 mt-1">Billed ${plan.price.yearly * 12}/year</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <FiCheck className="text-success flex-shrink-0" size={16} />
                      ) : (
                        <FiX className="text-slate-300 dark:text-slate-600 flex-shrink-0" size={16} />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/register" className="w-full">
                  <Button
                    fullWidth
                    size="lg"
                    variant={plan.popular ? 'primary' : 'outline'}
                    className={plan.popular ? '!shadow-lg !shadow-primary/20' : ''}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left mt-10">
            {[
              { q: 'Can I switch plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
              { q: 'Is there a free trial for Pro?', a: 'Yes! The Pro plan comes with a 14-day free trial. No credit card required to start.' },
              { q: 'What file formats are supported?', a: 'We support PDF, DOC, and DOCX files up to 5MB in size.' },
              { q: 'Is my resume data secure?', a: 'Absolutely. All data is encrypted at rest and in transit. We never sell or share your information.' },
            ].map((faq) => (
              <div key={faq.q} className="glass-card p-6 rounded-xl">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
