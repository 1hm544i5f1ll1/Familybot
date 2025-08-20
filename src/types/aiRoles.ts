export interface AIRole {
  id: string;
  name: string;
  type: 'nanny' | 'psychologist' | 'nutritionist' | 'trainer' | 'tutor' | 'coach' | 'financial' | 'travel' | 'designer' | 'stylist' | 'yoga' | 'physician' | 'pet' | 'assistant';
  description: string;
  capabilities: AICapability[];
  autonomyLevel: 'full' | 'assisted' | 'professional_required';
  professionalNetwork: ProfessionalContact[];
  aiModel: string;
  specializations: string[];
  languages: string[];
  availability: AvailabilitySchedule;
  performance: AIPerformanceMetrics;
  configuration: AIRoleConfiguration;
}

export interface AICapability {
  id: string;
  name: string;
  description: string;
  autonomyLevel: 'full' | 'assisted' | 'professional_required';
  confidence: number;
  examples: string[];
}

export interface ProfessionalContact {
  id: string;
  name: string;
  profession: string;
  specialization: string[];
  rating: number;
  location: string;
  availability: string;
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  credentials: string[];
  languages: string[];
  pricing: {
    hourlyRate?: number;
    sessionRate?: number;
    packageDeals?: PricingPackage[];
  };
  reviews: Review[];
  lastContacted?: string;
}

export interface PricingPackage {
  name: string;
  description: string;
  price: number;
  duration: string;
  sessions: number;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface AvailabilitySchedule {
  timezone: string;
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: string[];
  emergencyAvailable: boolean;
  responseTime: string;
}

export interface AIPerformanceMetrics {
  tasksCompleted: number;
  successRate: number;
  averageResponseTime: number;
  userSatisfaction: number;
  professionalReferrals: number;
  autonomousResolutions: number;
  lastActive: string;
}

export interface AIRoleConfiguration {
  personalityTraits: string[];
  communicationStyle: 'formal' | 'casual' | 'friendly' | 'professional';
  proactivityLevel: number;
  escalationThreshold: number;
  learningEnabled: boolean;
  memoryRetention: number;
  customInstructions: string;
}

export interface AITask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'escalated' | 'failed';
  assignedRole: string;
  familyMemberId: string;
  autonomyLevel: 'full' | 'assisted' | 'professional_required';
  estimatedDuration: number;
  actualDuration?: number;
  confidence: number;
  steps: AITaskStep[];
  professionalRequired: boolean;
  professionalAssigned?: string;
  createdAt: string;
  completedAt?: string;
  feedback?: TaskFeedback;
}

export interface AITaskStep {
  id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  autonomyLevel: 'full' | 'assisted' | 'professional_required';
  confidence: number;
  result?: string;
  timestamp?: string;
}

export interface TaskFeedback {
  rating: number;
  comment: string;
  improvements: string[];
  timestamp: string;
}

export interface AIDecision {
  id: string;
  taskId: string;
  decision: 'autonomous' | 'find_professional' | 'escalate';
  confidence: number;
  reasoning: string;
  alternatives: string[];
  timestamp: string;
}