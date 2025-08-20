import React, { useState, useEffect } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { BroadcastCampaign, BroadcastTemplate } from '../types/broadcast';
import { broadcastService } from '../services/broadcastService';
import { PageHeader } from '../components/common/PageHeader';
import { SearchInput } from '../components/common/SearchInput';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { CampaignCard } from '../components/broadcasting/CampaignCard';
import { TemplateCard } from '../components/broadcasting/TemplateCard';

export const BroadcastingPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<BroadcastCampaign[]>([]);
  const [templates, setTemplates] = useState<BroadcastTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates'>('campaigns');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [campaignsData, templatesData] = await Promise.all([
        broadcastService.getCampaigns(),
        broadcastService.getTemplates()
      ]);
      setCampaigns(campaignsData);
      setTemplates(templatesData);
    } catch (error) {
      console.error('Failed to load broadcast data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCampaign = (campaign: BroadcastCampaign) => {
    console.log('View campaign:', campaign);
  };

  const handleEditCampaign = (campaign: BroadcastCampaign) => {
    console.log('Edit campaign:', campaign);
  };

  const handleEditTemplate = (template: BroadcastTemplate) => {
    console.log('Edit template:', template);
  };

  const handleUseTemplate = (template: BroadcastTemplate) => {
    console.log('Use template:', template);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Broadcasting"
        description="Manage broadcast campaigns and message templates"
        actionLabel={activeTab === 'campaigns' ? 'New Campaign' : 'New Template'}
        onAction={() => console.log('Create new', activeTab)}
      />

      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'campaigns'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Campaigns</span>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Templates</span>
          </button>
        </nav>
      </div>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={`Search ${activeTab}...`}
        className="max-w-md"
      />

      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onView={handleViewCampaign}
              onEdit={handleEditCampaign}
            />
          ))}
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={handleEditTemplate}
              onUse={handleUseTemplate}
            />
          ))}
        </div>
      )}

      {((activeTab === 'campaigns' && filteredCampaigns.length === 0) ||
        (activeTab === 'templates' && filteredTemplates.length === 0)) && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">
            No {activeTab} found
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or create a new {activeTab.slice(0, -1)}
          </p>
        </div>
      )}
    </div>
  );
};