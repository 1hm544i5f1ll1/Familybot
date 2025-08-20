import React from 'react';
import { Bot, Users, TrendingUp, Settings, Zap } from 'lucide-react';
import { AIRole } from '../../types/aiRoles';
import { StatusBadge } from '../common/StatusBadge';

interface AIRoleCardProps {
  role: AIRole;
  onConfigure: (role: AIRole) => void;
  onViewDetails: (role: AIRole) => void;
}

export const AIRoleCard: React.FC<AIRoleCardProps> = ({ 
  role, 
  onConfigure, 
  onViewDetails 
}) => {
  const getRoleIcon = (type: string) => {
    const icons = {
      nanny: '👶',
      psychologist: '🧠',
      nutritionist: '🥗',
      trainer: '💪',
      tutor: '📚',
      coach: '🎯',
      financial: '💰',
      travel: '✈️',
      designer: '🎨',
      stylist: '👗',
      yoga: '🧘',
      physician: '👩‍⚕️',
      pet: '🐕',
      assistant: '📋'
    };
    return icons[type as keyof typeof icons] || '🤖';
  };

  const getAutonomyColor = (level: string) => {
    switch (level) {
      case 'full': return 'bg-green-100 text-green-800';
      case 'assisted': return 'bg-yellow-100 text-yellow-800';
      case 'professional_required': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const autonomousCapabilities = role.capabilities.filter(c => c.autonomyLevel === 'full').length;
  const totalCapabilities = role.capabilities.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-2xl">
            {getRoleIcon(role.type)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{role.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role.aiModel}</p>
          </div>
        </div>
        <StatusBadge 
          status={role.autonomyLevel.replace('_', ' ')} 
          variant={role.autonomyLevel === 'full' ? 'success' : 'warning'}
          size="sm"
        />
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {role.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {autonomousCapabilities}/{totalCapabilities} Autonomous
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {role.professionalNetwork.length} Professionals
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-purple-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {role.performance.successRate}% Success
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Bot className="w-4 h-4 text-orange-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {role.performance.tasksCompleted} Tasks
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Specializations</h4>
        <div className="flex flex-wrap gap-1">
          {role.specializations.slice(0, 3).map(spec => (
            <span 
              key={spec}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
            >
              {spec}
            </span>
          ))}
          {role.specializations.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
              +{role.specializations.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Response: {role.availability.responseTime}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(role)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Details
          </button>
          <button
            onClick={() => onConfigure(role)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            <Settings className="w-3 h-3" />
            <span>Configure</span>
          </button>
        </div>
      </div>
    </div>
  );
};