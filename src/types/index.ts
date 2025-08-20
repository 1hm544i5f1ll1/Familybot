export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  lastSeen: string;
  permissions: string[];
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface Conversation {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: 'active' | 'completed' | 'broadcast';
  role: string;
  avatar: string;
  language: 'en' | 'ar' | 'auto';
  isGroup: boolean;
  participants?: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
  type: 'text' | 'voice' | 'image' | 'document' | 'location';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  metadata?: {
    translated?: boolean;
    originalLanguage?: string;
    transcribed?: boolean;
    location?: { lat: number; lng: number };
  };
}

export interface BroadcastTemplate {
  id: string;
  name: string;
  content: string;
  language: 'en' | 'ar' | 'both';
  category: 'school' | 'emergency' | 'general' | 'marketing';
  variables: string[];
  status: 'active' | 'pending' | 'rejected';
  createdAt: string;
}

export interface BroadcastCampaign {
  id: string;
  name: string;
  templateId: string;
  recipients: string[];
  scheduledAt?: string;
  sentAt?: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  stats: {
    sent: number;
    delivered: number;
    read: number;
    failed: number;
  };
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  class: string;
  parentId: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive';
  attendance: {
    present: number;
    absent: number;
    late: number;
    percentage: number;
  };
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  class: string;
  dueDate: string;
  createdAt: string;
  status: 'active' | 'completed' | 'overdue';
  submissions: {
    studentId: string;
    submittedAt?: string;
    status: 'pending' | 'submitted' | 'graded';
    grade?: number;
  }[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  type: 'meeting' | 'exam' | 'holiday' | 'sports' | 'cultural';
  rsvpEnabled: boolean;
  rsvpDeadline?: string;
  attendees: {
    userId: string;
    status: 'pending' | 'accepted' | 'declined';
    respondedAt?: string;
  }[];
  createdBy: string;
  createdAt: string;
}

export interface FamilyRole {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  config: Record<string, any>;
  usage: {
    totalSessions: number;
    activeUsers: number;
    completedTasks: number;
    satisfaction: number;
  };
  familyMembers: FamilyMember[];
}

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  relationship: 'parent' | 'child' | 'spouse' | 'other';
  status: 'active' | 'inactive' | 'needs_attention';
  currentGoals: Goal[];
  actionableItems: ActionableItem[];
  calendar: CalendarEvent[];
  timeline: TimelineEvent[];
  preferences: Record<string, any>;
  healthMetrics?: HealthMetrics;
  educationProgress?: EducationProgress;
  wellnessData?: WellnessData;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
  progress: number; // 0-100
  targetDate: string;
  createdAt: string;
  milestones: Milestone[];
  assignedRole: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
  dueDate?: string;
}

export interface ActionableItem {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  dueDate: string;
  estimatedDuration: number; // minutes
  category: string;
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: 'appointment' | 'task' | 'reminder' | 'milestone' | 'activity';
  category: string;
  location?: string;
  attendees?: string[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
  reminders: number[]; // minutes before event
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'achievement' | 'milestone' | 'activity' | 'assessment' | 'note';
  category: string;
  importance: 'low' | 'medium' | 'high';
  attachments?: string[];
  createdBy: string;
}

export interface HealthMetrics {
  height: number;
  weight: number;
  bmi: number;
  bloodPressure?: string;
  heartRate?: number;
  sleepHours: number;
  waterIntake: number; // liters
  exerciseMinutes: number;
  lastCheckup: string;
  medications: Medication[];
  allergies: string[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
}

export interface EducationProgress {
  currentGrade?: string;
  subjects: Subject[];
  overallGPA?: number;
  attendance: number; // percentage
  behaviorScore: number;
  strengths: string[];
  areasForImprovement: string[];
  nextAssessment?: string;
}

export interface Subject {
  name: string;
  grade: string;
  progress: number; // percentage
  lastAssessment: string;
  nextAssessment?: string;
  teacher?: string;
}

export interface WellnessData {
  stressLevel: number; // 1-10
  moodRating: number; // 1-10
  energyLevel: number; // 1-10
  socialInteraction: number; // hours per day
  screenTime: number; // hours per day
  outdoorTime: number; // hours per day
  lastWellnessCheck: string;
}

export interface Analytics {
  messageVolume: {
    total: number;
    change: number;
    data: number[];
  };
  responseTime: {
    average: number;
    change: number;
    data: number[];
  };
  taskCompletion: {
    rate: number;
    change: number;
    data: number[];
  };
  userSatisfaction: {
    score: number;
    change: number;
    data: number[];
  };
  languageDistribution: {
    english: number;
    arabic: number;
  };
  roleUsage: {
    name: string;
    usage: number;
    color: string;
  }[];
}

export interface BotSettings {
  general: {
    botName: string;
    defaultLanguage: 'en' | 'ar';
    timezone: string;
    workingHours: {
      start: string;
      end: string;
      days: string[];
    };
  };
  ai: {
    model: string;
    temperature: number;
    maxTokens: number;
    systemPrompt: string;
  };
  translation: {
    autoDetect: boolean;
    defaultPairs: string[];
    confidence: number;
  };
  compliance: {
    gdprEnabled: boolean;
    dataRetention: number;
    auditLogging: boolean;
    optOutKeywords: string[];
  };
}