import React from 'react';
import { FiAward, FiBriefcase, FiDownload, FiFileText, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const reports = [
  { title: 'Frontend Resume Review', type: 'Resume Analysis', score: 86, date: 'Today', icon: <FiFileText /> },
  { title: 'Senior React Engineer', type: 'Job Match', score: 78, date: 'Yesterday', icon: <FiBriefcase /> },
  { title: 'System Design Practice', type: 'Mock Interview', score: 72, date: 'Oct 12', icon: <FiMessageSquare /> },
];

const recommendations = [
  'Add TypeScript and testing evidence to your project bullets.',
  'Rewrite two experience bullets with measurable business impact.',
  'Practice concise architecture trade-off answers before senior interviews.',
];

const Reports = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">Reports</h1>
          <p className="text-slate-500 dark:text-slate-400">Track resume quality, job fit, and interview readiness in one place.</p>
        </div>
        <Button variant="outline">
          <FiDownload className="mr-2" /> Export Summary
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard title="Average Score" value="79%" trend="+8%" icon={<FiAward />} tone="success" />
        <MetricCard title="Best Match" value="86%" trend="Resume" icon={<FiTrendingUp />} tone="primary" />
        <MetricCard title="Open Gaps" value="4" trend="Skills" icon={<FiBriefcase />} tone="warning" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="p-0 overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Recent Analysis</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {reports.map((report) => (
              <div key={report.title} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {report.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{report.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{report.type} - {report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${report.score}%` }}></div>
                  </div>
                  <span className="w-12 text-right text-lg font-bold text-slate-800 dark:text-white">{report.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Next Best Actions</h2>
          <div className="space-y-4">
            {recommendations.map((item, index) => (
              <div key={item} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warning/10 text-xs font-bold text-warning">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, trend, icon, tone }) => {
  const toneClasses = {
    success: 'bg-success/10 text-success',
    primary: 'bg-primary/10 text-primary',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="mt-1 text-xs font-semibold text-slate-400">{trend}</p>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-xl ${toneClasses[tone]}`}>
        {icon}
      </div>
    </Card>
  );
};

export default Reports;
