import React, { useState, useEffect } from 'react';
import { 
  Heart,
  GraduationCap,
  Plane,
  Utensils,
  Dumbbell,
  Brain,
  Palette,
  Calculator,
  Settings,
  BarChart3,
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  MessageSquare,
  Play,
  Pause,
  Edit,
  Eye
} from 'lucide-react';
import { FamilyRole } from '../types';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

const FamilyRoles: React.FC = () => {
  const [roles, setRoles] = useState<FamilyRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<FamilyRole | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const data = await apiService.getFamilyRoles();
      setRoles(data);
    } catch (error) {
      toast.error('Failed to load family roles');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (roleId: string, isActive: boolean) => {
    try {
      await apiService.updateFamilyRole(roleId, { isActive });
      toast.success(`Role ${isActive ? 'activated' : 'deactivated'}`);
      loadRoles();
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const getRoleIcon = (roleId: string) => {
    const icons = {
      nanny: Heart,
      tutor: GraduationCap,
      travel: Plane,
      nutrition: Utensils,
      fitness: Dumbbell,
      mental: Brain,
      design: Palette,
      financial: Calculator
    };
    return icons[roleId as keyof typeof icons] || Heart;
  };

  const getRoleColor = (roleId: string) => {
    const colors = {
      nanny: 'bg-pink-500',
      tutor: 'bg-indigo-500',
      travel: 'bg-cyan-500',
      nutrition: 'bg-green-500',
      fitness: 'bg-orange-500',
      mental: 'bg-purple-500',
      design: 'bg-yellow-500',
      financial: 'bg-blue-500'
    };
    return colors[roleId as keyof typeof colors] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Family Roles Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure and monitor AI-powered family assistance roles</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>View Analytics</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Global Settings</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Roles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {roles.filter(r => r.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {roles.reduce((sum, r) => sum + r.usage.activeUsers, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tasks Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {roles.reduce((sum, r) => sum + r.usage.completedTasks, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(roles.reduce((sum, r) => sum + r.usage.satisfaction, 0) / roles.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {roles.map((role) => {
          const Icon = getRoleIcon(role.id);
          return (
            <div
              key={role.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${getRoleColor(role.id)} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleRole(role.id, !role.isActive)}
                    className={`p-1 rounded-full ${
                      role.isActive ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {role.isActive ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRole(role);
                      setShowConfig(true);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{role.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{role.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    role.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {role.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Active Users</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {role.usage.activeUsers}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Sessions</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {role.usage.totalSessions}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Satisfaction</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {role.usage.satisfaction}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedRole(role)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>+12%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Role Performance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Role Performance Overview</h3>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 3 months</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usage Chart */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Usage by Role</h4>
            <div className="space-y-3">
              {roles.slice(0, 5).map((role, index) => {
                const Icon = getRoleIcon(role.id);
                const percentage = (role.usage.totalSessions / Math.max(...roles.map(r => r.usage.totalSessions))) * 100;
                return (
                  <div key={role.id} className="flex items-center space-x-3">
                    <div className={`${getRoleColor(role.id)} p-2 rounded-lg`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{role.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{role.usage.totalSessions}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getRoleColor(role.id)}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Satisfaction Ratings */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Satisfaction Ratings</h4>
            <div className="space-y-3">
              {roles.slice(0, 5).map((role) => {
                const Icon = getRoleIcon(role.id);
                return (
                  <div key={role.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`${getRoleColor(role.id)} p-2 rounded-lg`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{role.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= role.usage.satisfaction
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {role.usage.satisfaction}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Role Activity</h3>
        <div className="space-y-4">
          {[
            { role: 'Nanny/Governess', action: 'Created bedtime routine for Emma', time: '2 minutes ago', icon: Heart },
            { role: 'Private Tutor', action: 'Completed math session with Omar', time: '15 minutes ago', icon: GraduationCap },
            { role: 'Travel Planner', action: 'Booked family vacation to Dubai', time: '1 hour ago', icon: Plane },
            { role: 'Nutritionist', action: 'Updated meal plan for Sarah', time: '2 hours ago', icon: Utensils },
            { role: 'Personal Trainer', action: 'Scheduled workout session', time: '3 hours ago', icon: Dumbbell }
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                  <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.role}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FamilyRoles;