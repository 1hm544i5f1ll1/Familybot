import React from 'react';
import { CheckSquare, Clock, AlertTriangle, User, Calendar } from 'lucide-react';
import { ActionableItem } from '../../types/family';

interface ActionableItemCardProps {
  item: ActionableItem;
  onUpdate: (itemId: string, updates: Partial<ActionableItem>) => void;
}

export const ActionableItemCard: React.FC<ActionableItemCardProps> = ({ item, onUpdate }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const isOverdue = item.dueDate && new Date(item.dueDate) < new Date() && item.status !== 'completed';

  const handleStatusChange = (newStatus: ActionableItem['status']) => {
    onUpdate(item.id, { status: newStatus });
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 p-4 hover:shadow-md transition-all duration-200 ${getPriorityColor(item.priority)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
          {item.status.replace('-', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{item.estimatedTime}min</span>
        </div>
        {item.assignedRole && (
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 capitalize">{item.assignedRole.replace('-', ' ')}</span>
          </div>
        )}
      </div>

      {item.dueDate && (
        <div className={`flex items-center space-x-2 mb-3 ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
          {isOverdue && <AlertTriangle className="w-4 h-4" />}
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            Due: {new Date(item.dueDate).toLocaleDateString()}
            {isOverdue && ' (Overdue)'}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {item.category}
        </span>
        <div className="flex space-x-2">
          {item.status === 'pending' && (
            <button
              onClick={() => handleStatusChange('in-progress')}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Start
            </button>
          )}
          {item.status === 'in-progress' && (
            <button
              onClick={() => handleStatusChange('completed')}
              className="text-xs text-green-600 hover:text-green-800 font-medium"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};