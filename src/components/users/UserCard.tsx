import React from 'react';
import { User, Phone, Mail, Shield, Clock } from 'lucide-react';
import { User as UserType } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface UserCardProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'suspended': return 'error';
      default: return 'warning';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return '👑';
      case 'teacher': return '👨‍🏫';
      case 'parent': return '👨‍👩‍👧‍👦';
      case 'student': return '🎓';
      default: return '👤';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-xl">
            {user.avatar || getRoleIcon(user.role)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>
        <StatusBadge 
          status={user.status} 
          variant={getStatusVariant(user.status)}
          size="sm"
        />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Phone className="w-4 h-4" />
          <span>{user.phone}</span>
        </div>
        {user.email && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
        )}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last seen: {new Date(user.lastSeen).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <Shield className="w-3 h-3" />
          <span>{user.permissions.length} permissions</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(user)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};