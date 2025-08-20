import React from 'react';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart
} from 'lucide-react';

const Analytics: React.FC = () => {
  const metrics = [
    {
      title: 'Message Volume',
      value: '12,543',
      change: '+15.3%',
      changeType: 'increase',
      period: 'vs last week',
      data: [65, 78, 85, 92, 108, 120, 135]
    },
    {
      title: 'Response Time',
      value: '1.2s',
      change: '-8.5%',
      changeType: 'decrease',
      period: 'avg response',
      data: [2.1, 1.8, 1.6, 1.5, 1.3, 1.2, 1.2]
    },
    {
      title: 'Task Completion',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'increase',
      period: 'success rate',
      data: [88, 89, 91, 92, 93, 94, 94.2]
    },
    {
      title: 'User Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      changeType: 'increase',
      period: 'avg rating',
      data: [4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8]
    }
  ];

  const roleUsage = [
    { name: 'Nanny/Governess', usage: 35, color: 'bg-pink-500' },
    { name: 'Private Tutor', usage: 28, color: 'bg-indigo-500' },
    { name: 'Personal Assistant', usage: 18, color: 'bg-purple-500' },
    { name: 'Travel Planner', usage: 12, color: 'bg-cyan-500' },
    { name: 'Nutritionist', usage: 7, color: 'bg-green-500' }
  ];

  const schoolMetrics = [
    { label: 'Attendance Tracked', value: '2,345', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Homework Assignments', value: '567', icon: MessageSquare, color: 'text-blue-600' },
    { label: 'Fee Reminders Sent', value: '123', icon: AlertTriangle, color: 'text-yellow-600' },
    { label: 'Events Created', value: '34', icon: Clock, color: 'text-purple-600' }
  ];

  const languageStats = [
    { language: 'English', messages: 5420, percentage: 68 },
    { language: 'Arabic', messages: 2580, percentage: 32 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</h3>
              <TrendingUp className={`h-4 w-4 ${metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                <p className={`text-sm ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} {metric.period}
                </p>
              </div>
              <div className="w-16 h-8">
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <polyline
                    points={metric.data.map((value, i) => `${(i * 100) / (metric.data.length - 1)},${40 - (value * 30) / Math.max(...metric.data)}`).join(' ')}
                    fill="none"
                    stroke={metric.changeType === 'increase' ? '#10B981' : '#EF4444'}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Usage Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Family Role Usage</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {roleUsage.map((role, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{role.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${role.color}`}
                      style={{ width: `${role.usage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{role.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* School Workflow Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">School Workflows</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {schoolMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${metric.color}`} />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Language & Translation Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Language Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {languageStats.map((lang, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">{lang.language}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{lang.messages} messages</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{lang.percentage}%</p>
                <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Performance Trends (Last 7 Days)</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {[45, 52, 48, 61, 55, 67, 73].map((value, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1">
              <div
                className="bg-blue-600 rounded-t-lg w-full min-h-[20px] transition-all hover:bg-blue-700"
                style={{ height: `${(value / 73) * 200}px` }}
              ></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;