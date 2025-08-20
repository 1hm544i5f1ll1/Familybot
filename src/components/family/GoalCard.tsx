import React from 'react';
import { Target, Calendar, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Goal } from '../../types/family';

interface GoalCardProps {
  goal: Goal;
  onUpdate: (goalId: string, updates: Partial<Goal>) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate }) => {
  const completedMilestones = goal.milestones.filter(m => m.completed).length;
  const totalMilestones = goal.milestones.length;
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health': return '🏥';
      case 'education': return '📚';
      case 'lifestyle': return '🌟';
      case 'financial': return '💰';
      case 'personal': return '👤';
      default: return '🎯';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
            <p className="text-sm text-gray-600">{goal.description}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
          {goal.priority}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{goal.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">
            Due: {new Date(goal.targetDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600">
            {completedMilestones}/{totalMilestones} Milestones
          </span>
        </div>
      </div>

      {goal.milestones.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Milestones</h4>
          {goal.milestones.slice(0, 3).map(milestone => (
            <div key={milestone.id} className="flex items-center space-x-2">
              <CheckCircle 
                className={`w-4 h-4 ${milestone.completed ? 'text-green-500' : 'text-gray-300'}`}
              />
              <span className={`text-sm ${milestone.completed ? 'text-gray-900 line-through' : 'text-gray-600'}`}>
                {milestone.title}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Updated {new Date(goal.updatedAt).toLocaleDateString()}
          </span>
          <button
            onClick={() => onUpdate(goal.id, { progress: Math.min(goal.progress + 10, 100) })}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Update Progress
          </button>
        </div>
      </div>
    </div>
  );
};