import { BroadcastCampaign, BroadcastTemplate, BroadcastAnalytics } from '../types/broadcast';

const mockCampaigns: BroadcastCampaign[] = [
  {
    id: 'bc1',
    name: 'Weekly School Newsletter',
    description: 'Weekly updates for parents about school activities',
    type: 'announcement',
    status: 'sent',
    templateId: 'bt1',
    targetAudience: {
      roles: ['parent'],
      groups: ['grade-5', 'grade-6'],
      individuals: [],
      filters: { active: true }
    },
    sentAt: '2024-12-20T09:00:00Z',
    createdAt: '2024-12-19T15:00:00Z',
    createdBy: 'admin',
    analytics: {
      totalSent: 150,
      delivered: 148,
      read: 142,
      replied: 23,
      failed: 2,
      optedOut: 1,
      deliveryRate: 98.7,
      readRate: 95.9,
      responseRate: 16.2,
      optOutRate: 0.7,
      timeline: []
    }
  }
];

const mockTemplates: BroadcastTemplate[] = [
  {
    id: 'bt1',
    name: 'School Newsletter Template',
    category: 'educational',
    language: 'both',
    content: {
      text: 'Dear {{parent_name}}, here are this week\'s school updates...',
      buttons: [
        { type: 'url', text: 'View Full Newsletter', value: 'https://school.edu/newsletter' }
      ]
    },
    variables: [
      { name: 'parent_name', type: 'text', required: true },
      { name: 'week_date', type: 'date', required: true }
    ],
    isApproved: true,
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z'
  }
];

export const broadcastService = {
  async getCampaigns(): Promise<BroadcastCampaign[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCampaigns;
  },

  async getCampaign(id: string): Promise<BroadcastCampaign | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCampaigns.find(campaign => campaign.id === id) || null;
  },

  async createCampaign(campaign: Omit<BroadcastCampaign, 'id' | 'createdAt' | 'analytics'>): Promise<BroadcastCampaign> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newCampaign: BroadcastCampaign = {
      ...campaign,
      id: `bc${Date.now()}`,
      createdAt: new Date().toISOString(),
      analytics: {
        totalSent: 0,
        delivered: 0,
        read: 0,
        replied: 0,
        failed: 0,
        optedOut: 0,
        deliveryRate: 0,
        readRate: 0,
        responseRate: 0,
        optOutRate: 0,
        timeline: []
      }
    };
    
    mockCampaigns.push(newCampaign);
    return newCampaign;
  },

  async getTemplates(): Promise<BroadcastTemplate[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockTemplates;
  },

  async createTemplate(template: Omit<BroadcastTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<BroadcastTemplate> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTemplate: BroadcastTemplate = {
      ...template,
      id: `bt${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockTemplates.push(newTemplate);
    return newTemplate;
  },

  async sendCampaign(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const campaign = mockCampaigns.find(c => c.id === id);
    if (campaign) {
      campaign.status = 'sending';
      // Simulate sending process
      setTimeout(() => {
        campaign.status = 'sent';
        campaign.sentAt = new Date().toISOString();
      }, 2000);
    }
  },

  async getCampaignAnalytics(id: string): Promise<BroadcastAnalytics | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const campaign = mockCampaigns.find(c => c.id === id);
    return campaign?.analytics || null;
  }
};