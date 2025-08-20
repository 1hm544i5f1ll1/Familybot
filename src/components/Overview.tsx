import React from 'react';
import { 
  MessageSquare, 
  Users, 
  Send, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  Heart,
  Activity
} from 'lucide-react';

const Overview: React.FC = () => {
  const stats = [
    { label: 'Active Conversations', value: '1,234', change: '+12%', icon: MessageSquare, color: 'bg-blue-500' },
    { label: 'Total Users', value: '5,678', change: '+8%', icon: Users, color: 'bg-green-500' },
    { label: 'Messages Sent Today', value: '9,876', change: '+15%', icon: Send, color: 'bg-purple-500' },
    { label: 'Tasks Completed', value: '432', change: '+23%', icon: CheckCircle, color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { type: 'message', content: 'New homework assignment created for Grade 5', time: '2 minutes ago' },
    { type: 'alert', content: 'Fee reminder sent to 45 parents', time: '15 minutes ago' },
    { type: 'success', content: 'Travel itinerary completed for Johnson family', time: '1 hour ago' },
    { type: 'info', content: 'Attendance marked for Morning Assembly', time: '2 hours ago' },
  ];

  const familyRolesActivity = [
    { role: 'Nanny/Governess', active: 12, completed: 45, color: 'bg-pink-500' },
    { role: 'Private Tutor', active: 8, completed: 23, color: 'bg-indigo-500' },
    { role: 'Travel Planner', active: 3, completed: 7, color: 'bg-cyan-500' },
    { role: 'Nutritionist', active: 15, completed: 34, color: 'bg-green-500' },
    { role: 'Personal Trainer', active: 6, completed: 18, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change} from yesterday</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'message' ? 'bg-blue-500' :
                    activity.type === 'alert' ? 'bg-yellow-500' :
                    activity.type === 'success' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.content}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Family Roles Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-pink-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Family Roles Activity</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {familyRolesActivity.map((role, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{role.role}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{role.active} active</span>
                    <span>{role.completed} completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Send className="h-5 w-5 mr-2" />
            Send Broadcast
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <Users className="h-5 w-5 mr-2" />
            Add User
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark Attendance
          </button>
          <button className="flex items-center justify-center p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
            <TrendingUp className="h-5 w-5 mr-2" />
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;