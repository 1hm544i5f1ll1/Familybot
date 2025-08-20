import React from 'react';
import { Send, Users, Eye, MessageSquare, Calendar } from 'lucide-react';
import { BroadcastCampaign } from '../../types/broadcast';
import { StatusBadge } from '../common/StatusBadge';

interface CampaignCardProps {
  campaign: BroadcastCampaign;
  onView: (campaign: BroadcastCampaign) => void;
  onEdit: (campaign: BroadcastCampaign) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ 
  campaign, 
  onView, 
  onEdit 
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'sent': return 'success';
      case 'sending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const deliveryRate = campaign.analytics.totalSent > 0 
    ? (campaign.analytics.delivered / campaign.analytics.totalSent * 100).toFixed(1)
    : '0';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{campaign.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{campaign.description}</p>
        </div>
        <StatusBadge 
          status={campaign.status} 
          variant={getStatusVariant(campaign.status)}
          size="sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {campaign.analytics.totalSent} sent
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {deliveryRate}% delivered
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-purple-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {campaign.analytics.replied} replies
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-orange-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {campaign.sentAt ? new Date(campaign.sentAt).toLocaleDateString() : 'Not sent'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
          {campaign.type} campaign
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(campaign)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            View
          </button>
          <button
            onClick={() => onEdit(campaign)}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};