export interface FamilyMember {
  id: string;
  name: string;
  role: 'parent' | 'child' | 'guardian';
  avatar: string;
  age?: number;
  preferences: Record<string, any>;
  activeRoles: string[];
  status: 'active' | 'inactive' | 'busy';
  lastActive: string;
  goals: Goal[];
  actionableItems: ActionableItem[];
  calendar: CalendarEvent[];
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'education' | 'lifestyle' | 'financial' | 'personal';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  targetDate: string;
  status: 'active' | 'completed' | 'paused';
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
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
  category: string;
  assignedRole?: string;
  dueDate?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  estimatedTime: number; // in minutes
  dependencies?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: 'appointment' | 'reminder' | 'goal' | 'task' | 'event';
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  attendees?: string[];
  location?: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
  };
}

export interface AIRole {
  id: string;
  name: string;
  type: 'nanny' | 'tutor' | 'trainer' | 'nutritionist' | 'coach' | 'advisor' | 'planner' | 'designer' | 'stylist' | 'instructor' | 'physician' | 'specialist';
  description: string;
  isActive: boolean;
  assignedMembers: string[];
  configuration: Record<string, any>;
  performance: {
    satisfaction: number;
    responseTime: number;
    completionRate: number;
    lastActive: string;
  };
  goals: string[];
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  memberId: string;
  roleId?: string;
  metadata?: Record<string, any>;
}