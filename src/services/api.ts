import { 
  User, 
  Conversation, 
  Message, 
  BroadcastTemplate, 
  BroadcastCampaign,
  Student,
  Homework,
  Event,
  FamilyRole,
  Analytics,
  BotSettings
} from '../types';

// Mock data for development
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1-555-123-4567',
    email: 'sarah@example.com',
    role: 'parent',
    status: 'active',
    lastSeen: '2024-01-15T10:30:00Z',
    permissions: ['view_children', 'receive_notifications'],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Ahmed Al-Rashid',
    phone: '+966-50-123-4567',
    email: 'ahmed@example.com',
    role: 'parent',
    status: 'active',
    lastSeen: '2024-01-15T09:15:00Z',
    permissions: ['view_children', 'receive_notifications'],
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Ms. Emily Davis',
    phone: '+1-555-987-6543',
    email: 'emily.davis@school.edu',
    role: 'teacher',
    status: 'active',
    lastSeen: '2024-01-15T11:00:00Z',
    permissions: ['manage_homework', 'mark_attendance', 'send_broadcasts'],
    createdAt: '2024-01-01T00:00:00Z'
  }
];

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1-555-123-4567',
    lastMessage: 'Can you help me with my child\'s homework schedule?',
    timestamp: '2024-01-15T10:30:00Z',
    unread: 3,
    status: 'active',
    role: 'Parent',
    avatar: '👩‍💼',
    language: 'en',
    isGroup: false
  },
  {
    id: '2',
    name: 'Ahmed Al-Rashid',
    phone: '+966-50-123-4567',
    lastMessage: 'مرحبا، أحتاج مساعدة في الترجمة',
    timestamp: '2024-01-15T10:15:00Z',
    unread: 1,
    status: 'active',
    role: 'Parent',
    avatar: '👨‍💼',
    language: 'ar',
    isGroup: false
  }
];

// API Service Class
class ApiService {
  private baseUrl = '/api';

  // User Management
  async getUsers(): Promise<User[]> {
    // Simulate API call
    await this.delay(500);
    return mockUsers;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    await this.delay(300);
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      phone: userData.phone || '',
      email: userData.email,
      role: userData.role || 'parent',
      status: 'active',
      lastSeen: new Date().toISOString(),
      permissions: this.getDefaultPermissions(userData.role || 'parent'),
      createdAt: new Date().toISOString()
    };
    return newUser;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    await this.delay(300);
    const existingUser = mockUsers.find(u => u.id === id);
    if (!existingUser) throw new Error('User not found');
    return { ...existingUser, ...userData };
  }

  async deleteUser(id: string): Promise<void> {
    await this.delay(300);
    // Simulate deletion
  }

  // Conversations
  async getConversations(): Promise<Conversation[]> {
    await this.delay(400);
    return mockConversations;
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    await this.delay(300);
    return [
      {
        id: '1',
        conversationId,
        sender: 'user',
        content: 'Can you help me with my child\'s homework schedule?',
        timestamp: '2024-01-15T10:30:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '2',
        conversationId,
        sender: 'bot',
        content: 'Of course! I\'d be happy to help you organize your child\'s homework schedule. Could you tell me which grade they\'re in?',
        timestamp: '2024-01-15T10:31:00Z',
        type: 'text',
        status: 'read'
      }
    ];
  }

  async sendMessage(conversationId: string, content: string): Promise<Message> {
    await this.delay(200);
    return {
      id: Date.now().toString(),
      conversationId,
      sender: 'bot',
      content,
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sent'
    };
  }

  // Broadcasting
  async getBroadcastTemplates(): Promise<BroadcastTemplate[]> {
    await this.delay(400);
    return [
      {
        id: '1',
        name: 'Homework Reminder',
        content: 'Dear {{parent_name}}, your child {{student_name}} has homework due tomorrow in {{subject}}.',
        language: 'en',
        category: 'school',
        variables: ['parent_name', 'student_name', 'subject'],
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Fee Reminder',
        content: 'تذكير: رسوم {{student_name}} للشهر {{month}} مستحقة. المبلغ: {{amount}}',
        language: 'ar',
        category: 'school',
        variables: ['student_name', 'month', 'amount'],
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z'
      }
    ];
  }

  async createBroadcastTemplate(template: Partial<BroadcastTemplate>): Promise<BroadcastTemplate> {
    await this.delay(300);
    return {
      id: Date.now().toString(),
      name: template.name || '',
      content: template.content || '',
      language: template.language || 'en',
      category: template.category || 'general',
      variables: template.variables || [],
      status: 'pending',
      createdAt: new Date().toISOString()
    };
  }

  async getBroadcastCampaigns(): Promise<BroadcastCampaign[]> {
    await this.delay(400);
    return [
      {
        id: '1',
        name: 'Weekly Homework Reminder',
        templateId: '1',
        recipients: ['1', '2'],
        status: 'sent',
        sentAt: '2024-01-15T08:00:00Z',
        stats: {
          sent: 150,
          delivered: 148,
          read: 142,
          failed: 2
        }
      }
    ];
  }

  async createBroadcastCampaign(campaign: Partial<BroadcastCampaign>): Promise<BroadcastCampaign> {
    await this.delay(500);
    return {
      id: Date.now().toString(),
      name: campaign.name || '',
      templateId: campaign.templateId || '',
      recipients: campaign.recipients || [],
      status: 'draft',
      stats: {
        sent: 0,
        delivered: 0,
        read: 0,
        failed: 0
      }
    };
  }

  // School Management
  async getStudents(): Promise<Student[]> {
    await this.delay(400);
    return [
      {
        id: '1',
        name: 'Emma Johnson',
        grade: '5',
        class: '5A',
        parentId: '1',
        status: 'active',
        attendance: {
          present: 18,
          absent: 2,
          late: 1,
          percentage: 85.7
        }
      },
      {
        id: '2',
        name: 'Omar Al-Rashid',
        grade: '5',
        class: '5A',
        parentId: '2',
        status: 'active',
        attendance: {
          present: 20,
          absent: 1,
          late: 0,
          percentage: 95.2
        }
      }
    ];
  }

  async markAttendance(studentId: string, status: 'present' | 'absent' | 'late'): Promise<void> {
    await this.delay(300);
    // Simulate attendance marking
  }

  async getHomework(): Promise<Homework[]> {
    await this.delay(400);
    return [
      {
        id: '1',
        title: 'Math Chapter 5 Exercises',
        description: 'Complete exercises 1-20 from Chapter 5: Fractions',
        subject: 'Mathematics',
        grade: '5',
        class: '5A',
        dueDate: '2024-01-16T23:59:00Z',
        createdAt: '2024-01-14T10:00:00Z',
        status: 'active',
        submissions: [
          {
            studentId: '1',
            status: 'pending'
          },
          {
            studentId: '2',
            submittedAt: '2024-01-15T14:30:00Z',
            status: 'submitted'
          }
        ]
      }
    ];
  }

  async createHomework(homework: Partial<Homework>): Promise<Homework> {
    await this.delay(300);
    return {
      id: Date.now().toString(),
      title: homework.title || '',
      description: homework.description || '',
      subject: homework.subject || '',
      grade: homework.grade || '',
      class: homework.class || '',
      dueDate: homework.dueDate || '',
      createdAt: new Date().toISOString(),
      status: 'active',
      submissions: []
    };
  }

  async getEvents(): Promise<Event[]> {
    await this.delay(400);
    return [
      {
        id: '1',
        title: 'Parent-Teacher Conference',
        description: 'Individual meetings with parents to discuss student progress',
        date: '2024-01-20T14:00:00Z',
        location: 'School Main Hall',
        type: 'meeting',
        rsvpEnabled: true,
        rsvpDeadline: '2024-01-18T23:59:00Z',
        attendees: [
          {
            userId: '1',
            status: 'accepted',
            respondedAt: '2024-01-15T10:00:00Z'
          },
          {
            userId: '2',
            status: 'pending'
          }
        ],
        createdBy: '3',
        createdAt: '2024-01-10T00:00:00Z'
      }
    ];
  }

  async createEvent(event: Partial<Event>): Promise<Event> {
    await this.delay(300);
    return {
      id: Date.now().toString(),
      title: event.title || '',
      description: event.description || '',
      date: event.date || '',
      location: event.location,
      type: event.type || 'meeting',
      rsvpEnabled: event.rsvpEnabled || false,
      rsvpDeadline: event.rsvpDeadline,
      attendees: [],
      createdBy: '1', // Current user
      createdAt: new Date().toISOString()
    };
  }

  // Family Roles
  async getFamilyRoles(): Promise<FamilyRole[]> {
    await this.delay(400);
    return [
      {
        id: 'nanny',
        name: 'Nanny/Governess',
        description: 'Child care and developmental support',
        icon: '👶',
        isActive: true,
        config: {
          maxChildren: 5,
          ageRange: '0-12',
          services: ['feeding', 'activities', 'education']
        },
        usage: {
          totalSessions: 245,
          activeUsers: 12,
          completedTasks: 189,
          satisfaction: 4.8
        }
      },
      {
        id: 'tutor',
        name: 'Private Tutor',
        description: 'Educational support and homework assistance',
        icon: '📚',
        isActive: true,
        config: {
          subjects: ['math', 'science', 'english', 'arabic'],
          grades: ['1-12'],
          sessionDuration: 60
        },
        usage: {
          totalSessions: 156,
          activeUsers: 8,
          completedTasks: 134,
          satisfaction: 4.7
        }
      }
    ];
  }

  async updateFamilyRole(id: string, config: Record<string, any>): Promise<FamilyRole> {
    await this.delay(300);
    const roles = await this.getFamilyRoles();
    const role = roles.find(r => r.id === id);
    if (!role) throw new Error('Role not found');
    return { ...role, config: { ...role.config, ...config } };
  }

  // Analytics
  async getAnalytics(): Promise<Analytics> {
    await this.delay(500);
    return {
      messageVolume: {
        total: 12543,
        change: 15.3,
        data: [8500, 9200, 9800, 10500, 11200, 11800, 12543]
      },
      responseTime: {
        average: 1.2,
        change: -8.5,
        data: [2.1, 1.8, 1.6, 1.5, 1.3, 1.2, 1.2]
      },
      taskCompletion: {
        rate: 94.2,
        change: 2.1,
        data: [88, 89, 91, 92, 93, 94, 94.2]
      },
      userSatisfaction: {
        score: 4.8,
        change: 0.2,
        data: [4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8]
      },
      languageDistribution: {
        english: 68,
        arabic: 32
      },
      roleUsage: [
        { name: 'Nanny/Governess', usage: 35, color: 'bg-pink-500' },
        { name: 'Private Tutor', usage: 28, color: 'bg-indigo-500' },
        { name: 'Personal Assistant', usage: 18, color: 'bg-purple-500' },
        { name: 'Travel Planner', usage: 12, color: 'bg-cyan-500' },
        { name: 'Nutritionist', usage: 7, color: 'bg-green-500' }
      ]
    };
  }

  // Bot Settings
  async getBotSettings(): Promise<BotSettings> {
    await this.delay(400);
    return {
      general: {
        botName: 'FamilyBot Assistant',
        defaultLanguage: 'en',
        timezone: 'UTC+3',
        workingHours: {
          start: '08:00',
          end: '18:00',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        }
      },
      ai: {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2048,
        systemPrompt: 'You are a helpful family assistant and school management bot.'
      },
      translation: {
        autoDetect: true,
        defaultPairs: ['en-ar', 'ar-en'],
        confidence: 0.8
      },
      compliance: {
        gdprEnabled: true,
        dataRetention: 365,
        auditLogging: true,
        optOutKeywords: ['stop', 'unsubscribe', 'opt-out']
      }
    };
  }

  async updateBotSettings(settings: Partial<BotSettings>): Promise<BotSettings> {
    await this.delay(300);
    const currentSettings = await this.getBotSettings();
    return { ...currentSettings, ...settings };
  }

  // Translation & Transcription
  async translateText(text: string, from: string, to: string): Promise<string> {
    await this.delay(800);
    // Mock translation
    if (from === 'ar' && to === 'en') {
      return 'Hello, I need help with translation';
    }
    return 'مرحبا، أحتاج مساعدة في الترجمة';
  }

  async transcribeAudio(audioUrl: string): Promise<string> {
    await this.delay(1200);
    return 'This is a transcribed voice message from the user.';
  }

  // Utility methods
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getDefaultPermissions(role: string): string[] {
    const permissions = {
      admin: ['*'],
      teacher: ['manage_homework', 'mark_attendance', 'send_broadcasts', 'view_students'],
      parent: ['view_children', 'receive_notifications', 'rsvp_events'],
      student: ['view_homework', 'submit_assignments']
    };
    return permissions[role as keyof typeof permissions] || [];
  }
}

export const apiService = new ApiService();