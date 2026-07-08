import React from 'react';
import { FiTrendingUp, FiFileText, FiTarget, FiMessageSquare } from 'react-icons/fi';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Dummy data for charts
const interviewData = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 72 },
  { name: 'Wed', score: 68 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 90 },
  { name: 'Sat', score: 94 },
];

const skillData = [
  { name: 'React', level: 90 },
  { name: 'Python', level: 75 },
  { name: 'Node.js', level: 80 },
  { name: 'System Design', level: 60 },
  { name: 'AWS', level: 50 },
];

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Welcome back, {firstName}!</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here is what's happening with your job search today.</p>
        </div>
        <Link to="/resume">
          <Button className="shadow-lg shadow-primary/20">
            <FiFileText className="mr-2" /> Upload New Resume
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard 
          title="Overall ATS Score" 
          value="85%" 
          trend="+5%" 
          isPositive={true} 
          icon={<FiTrendingUp />} 
          color="bg-primary/10 text-primary"
        />
        <StatCard 
          title="Resumes Analyzed" 
          value="12" 
          trend="+2" 
          isPositive={true} 
          icon={<FiFileText />} 
          color="bg-accent-purple/10 text-accent-purple"
        />
        <StatCard 
          title="Avg. Job Match" 
          value="72%" 
          trend="-3%" 
          isPositive={false} 
          icon={<FiTarget />} 
          color="bg-accent-cyan/10 text-accent-cyan"
        />
        <StatCard 
          title="Mock Interviews" 
          value="5" 
          trend="+1" 
          isPositive={true} 
          icon={<FiMessageSquare />} 
          color="bg-warning/10 text-warning"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Interview Performance Chart */}
        <Card className="lg:col-span-2 flex flex-col h-96">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Interview Performance Trend</h3>
          <div className="flex-1 w-full h-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={interviewData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Skills Chart */}
        <Card className="flex flex-col h-96">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Top Skills Distribution</h3>
          <div className="flex-1 w-full h-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="level" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Recent Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ActivityCard 
            title="Senior Frontend Engineer"
            type="Job Match"
            score="88%"
            date="Today, 10:23 AM"
            status="excellent"
          />
          <ActivityCard 
            title="React Developer CV"
            type="Resume Analysis"
            score="76%"
            date="Yesterday, 2:45 PM"
            status="good"
          />
          <ActivityCard 
            title="System Design Interview"
            type="Mock Interview"
            score="62%"
            date="Oct 12, 4:00 PM"
            status="needs-work"
          />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, trend, isPositive, icon, color }) => (
  <Card hoverable className="flex items-center p-5">
    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h4>
        <span className={`text-xs font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
          {trend}
        </span>
      </div>
    </div>
  </Card>
);

const ActivityCard = ({ title, type, score, date, status }) => {
  const statusColors = {
    'excellent': 'bg-success text-white',
    'good': 'bg-primary text-white',
    'needs-work': 'bg-warning text-white'
  };

  return (
    <Card hoverable className="p-5 border-l-4 border-l-primary flex flex-col justify-between h-32">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-white truncate max-w-[200px]">{title}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{type}</p>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-md ${statusColors[status]}`}>
          {score}
        </span>
      </div>
      <p className="text-xs text-slate-400 mt-4">{date}</p>
    </Card>
  );
};

export default Dashboard;


