import { AIRole, ProfessionalContact, AITask, AIDecision } from '../types/aiRoles';

const mockAIRoles: AIRole[] = [
  {
    id: 'nanny',
    name: 'Nanny/Governess',
    type: 'nanny',
    description: 'AI-powered childcare assistant with professional network',
    capabilities: [
      {
        id: 'schedule',
        name: 'Schedule Management',
        description: 'Automates daily routines and activity planning',
        autonomyLevel: 'full',
        confidence: 95,
        examples: ['Create daily schedule', 'Plan activities', 'Track progress']
      },
      {
        id: 'development',
        name: 'Child Development',
        description: 'Monitors developmental milestones',
        autonomyLevel: 'assisted',
        confidence: 85,
        examples: ['Track milestones', 'Suggest activities', 'Progress reports']
      }
    ],
    autonomyLevel: 'assisted',
    professionalNetwork: [],
    aiModel: 'gpt-4',
    specializations: ['child development', 'behavioral therapy', 'early education'],
    languages: ['en', 'ar'],
    availability: {
      timezone: 'UTC+3',
      workingHours: { start: '06:00', end: '22:00' },
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      emergencyAvailable: true,
      responseTime: '< 1 minute'
    },
    performance: {
      tasksCompleted: 1250,
      successRate: 94.5,
      averageResponseTime: 0.8,
      userSatisfaction: 4.8,
      professionalReferrals: 23,
      autonomousResolutions: 1180,
      lastActive: new Date().toISOString()
    },
    configuration: {
      personalityTraits: ['caring', 'patient', 'educational', 'safety-focused'],
      communicationStyle: 'friendly',
      proactivityLevel: 8,
      escalationThreshold: 7,
      learningEnabled: true,
      memoryRetention: 90,
      customInstructions: 'Always prioritize child safety and development'
    }
  },
  {
    id: 'psychologist',
    name: 'Psychologist/Psychiatrist',
    type: 'psychologist',
    description: 'Mental health support with professional referral network',
    capabilities: [
      {
        id: 'mood_tracking',
        name: 'Mood Tracking',
        description: 'Daily mood monitoring and analysis',
        autonomyLevel: 'full',
        confidence: 90,
        examples: ['Track daily moods', 'Identify patterns', 'Generate reports']
      },
      {
        id: 'therapy',
        name: 'Therapeutic Support',
        description: 'Crisis intervention and professional referrals',
        autonomyLevel: 'professional_required',
        confidence: 70,
        examples: ['Crisis assessment', 'Professional matching', 'Emergency protocols']
      }
    ],
    autonomyLevel: 'assisted',
    professionalNetwork: [],
    aiModel: 'gpt-4',
    specializations: ['CBT', 'mood disorders', 'anxiety', 'depression'],
    languages: ['en', 'ar'],
    availability: {
      timezone: 'UTC+3',
      workingHours: { start: '00:00', end: '23:59' },
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      emergencyAvailable: true,
      responseTime: '< 30 seconds'
    },
    performance: {
      tasksCompleted: 890,
      successRate: 96.2,
      averageResponseTime: 0.5,
      userSatisfaction: 4.9,
      professionalReferrals: 45,
      autonomousResolutions: 820,
      lastActive: new Date().toISOString()
    },
    configuration: {
      personalityTraits: ['empathetic', 'non-judgmental', 'supportive', 'professional'],
      communicationStyle: 'professional',
      proactivityLevel: 9,
      escalationThreshold: 6,
      learningEnabled: true,
      memoryRetention: 95,
      customInstructions: 'Always prioritize mental health and safety'
    }
  }
];

export const aiRolesService = {
  async getAIRoles(): Promise<AIRole[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAIRoles;
  },

  async getAIRole(id: string): Promise<AIRole | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAIRoles.find(role => role.id === id) || null;
  },

  async updateAIRole(id: string, updates: Partial<AIRole>): Promise<AIRole> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const roleIndex = mockAIRoles.findIndex(role => role.id === id);
    if (roleIndex !== -1) {
      mockAIRoles[roleIndex] = { ...mockAIRoles[roleIndex], ...updates };
      return mockAIRoles[roleIndex];
    }
    throw new Error('AI Role not found');
  },

  async findProfessionals(roleType: string, requirements: any): Promise<ProfessionalContact[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return []; // Mock professional search
  },

  async createTask(task: Omit<AITask, 'id' | 'createdAt'>): Promise<AITask> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newTask: AITask = {
      ...task,
      id: `task_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    return newTask;
  },

  async makeAIDecision(taskId: string, context: any): Promise<AIDecision> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      id: `decision_${Date.now()}`,
      taskId,
      decision: 'autonomous',
      confidence: 85,
      reasoning: 'Task can be handled autonomously with high confidence',
      alternatives: ['find_professional', 'escalate'],
      timestamp: new Date().toISOString()
    };
  }
};