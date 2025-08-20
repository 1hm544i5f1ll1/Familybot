import React from 'react';
import { MessageSquare, Globe, CheckCircle, Clock } from 'lucide-react';
import { BroadcastTemplate } from '../../types/broadcast';
import { StatusBadge } from '../common/StatusBadge';

interface TemplateCardProps {
  template: BroadcastTemplate;
  onEdit: (template: BroadcastTemplate) => void;
  onUse: (template: BroadcastTemplate) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  onEdit, 
  onUse 
}) => {
  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'en': return '🇺🇸';
      case 'ar': return '🇸🇦';
      case 'both': return '🌐';
      default: return '🌍';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{template.category}</p>
          </div>
        </div>
        <StatusBadge 
          status={template.isApproved ? 'approved' : 'pending'} 
          variant={template.isApproved ? 'success' : 'warning'}
          size="sm"
        />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {template.content.text}
        </p>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          <span className="text-lg">{getLanguageIcon(template.language)}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
            {template.language === 'both' ? 'Multilingual' : template.language}
          </span>
        </div>
        {template.variables.length > 0 && (
          <div className="flex items-center space-x-1">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {template.variables.length} variables
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Updated {new Date(template.updatedAt).toLocaleDateString()}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(template)}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onUse(template)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
};