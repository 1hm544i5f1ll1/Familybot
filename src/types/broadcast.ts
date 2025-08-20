export interface BroadcastCampaign {
  id: string;
  name: string;
  description: string;
  type: 'announcement' | 'reminder' | 'emergency' | 'promotional' | 'educational';
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  templateId: string;
  targetAudience: {
    roles: string[];
    groups: string[];
    individuals: string[];
    filters: Record<string, any>;
  };
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  createdBy: string;
  analytics: BroadcastAnalytics;
}

export interface BroadcastTemplate {
  id: string;
  name: string;
  category: string;
  language: 'en' | 'ar' | 'both';
  content: {
    text: string;
    media?: {
      type: 'image' | 'video' | 'document';
      url: string;
      caption?: string;
    };
    buttons?: TemplateButton[];
  };
  variables: TemplateVariable[];
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateButton {
  type: 'url' | 'phone' | 'quick_reply';
  text: string;
  value: string;
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'date' | 'currency';
  required: boolean;
  defaultValue?: string;
}

export interface BroadcastAnalytics {
  totalSent: number;
  delivered: number;
  read: number;
  replied: number;
  failed: number;
  optedOut: number;
  deliveryRate: number;
  readRate: number;
  responseRate: number;
  optOutRate: number;
  timeline: AnalyticsDataPoint[];
}

export interface AnalyticsDataPoint {
  timestamp: string;
  sent: number;
  delivered: number;
  read: number;
  replied: number;
  failed: number;
}