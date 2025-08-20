import { FamilyMember, Goal, ActionableItem, CalendarEvent, AIRole } from '../types/family';

// Mock data for development
const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'parent',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    age: 35,
    preferences: { language: 'en', timezone: 'UTC+3' },
    activeRoles: ['financial-advisor', 'travel-planner'],
    status: 'active',
    lastActive: new Date().toISOString(),
    goals: [
      {
        id: 'g1',
        title: 'Save for Family Vacation',
        description: 'Save $5000 for summer vacation to Europe',
        category: 'financial',
        priority: 'high',
        progress: 65,
        targetDate: '2025-06-01',
        status: 'active',
        milestones: [
          { id: 'm1', title: 'Save $1000', completed: true, completedAt: '2024-11-01' },
          { id: 'm2', title: 'Save $3000', completed: true, completedAt: '2024-12-15' },
          { id: 'm3', title: 'Save $5000', completed: false, dueDate: '2025-06-01' }
        ],
        createdAt: '2024-10-01',
        updatedAt: '2024-12-15'
      }
    ],
    actionableItems: [
      {
        id: 'a1',
        title: 'Review monthly budget',
        description: 'Analyze December expenses and adjust January budget',
        priority: 'high',
        category: 'financial',
        assignedRole: 'financial-advisor',
        dueDate: '2025-01-05',
        status: 'pending',
        estimatedTime: 30,
        createdAt: '2024-12-20',
        updatedAt: '2024-12-20'
      }
    ],
    calendar: [
      {
        id: 'c1',
        title: 'Budget Review Meeting',
        description: 'Monthly financial review with AI advisor',
        startTime: '2025-01-05T10:00:00Z',
        endTime: '2025-01-05T11:00:00Z',
        type: 'appointment',
        category: 'financial',
        priority: 'high',
        status: 'scheduled'
      }
    ],
    timeline: [
      {
        id: 't1',
        title: 'Started Financial Planning',
        description: 'Activated financial advisor role and set savings goals',
        date: '2024-10-01',
        type: 'milestone',
        category: 'financial',
        importance: 'high',
        createdBy: 'system'
      }
    ]
  }
];

export const familyService = {
  async getFamilyMembers(): Promise<FamilyMember[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFamilyMembers;
  },

  async getFamilyMember(id: string): Promise<FamilyMember | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockFamilyMembers.find(member => member.id === id) || null;
  },

  async updateFamilyMember(id: string, updates: Partial<FamilyMember>): Promise<FamilyMember> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const memberIndex = mockFamilyMembers.findIndex(m => m.id === id);
    if (memberIndex !== -1) {
      mockFamilyMembers[memberIndex] = { ...mockFamilyMembers[memberIndex], ...updates };
      return mockFamilyMembers[memberIndex];
    }
    throw new Error('Family member not found');
  },

  async createGoal(memberId: string, goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Goal> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newGoal: Goal = {
      ...goal,
      id: `g${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const member = mockFamilyMembers.find(m => m.id === memberId);
    if (member) {
      member.goals.push(newGoal);
    }
    
    return newGoal;
  },

  async updateGoal(goalId: string, updates: Partial<Goal>): Promise<Goal> {
    await new Promise(resolve => setTimeout(resolve, 400));
    for (const member of mockFamilyMembers) {
      const goalIndex = member.goals.findIndex(g => g.id === goalId);
      if (goalIndex !== -1) {
        member.goals[goalIndex] = { 
          ...member.goals[goalIndex], 
          ...updates, 
          updatedAt: new Date().toISOString() 
        };
        return member.goals[goalIndex];
      }
    }
    throw new Error('Goal not found');
  },

  async createActionableItem(memberId: string, item: Omit<ActionableItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ActionableItem> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newItem: ActionableItem = {
      ...item,
      id: `a${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const member = mockFamilyMembers.find(m => m.id === memberId);
    if (member) {
      member.actionableItems.push(newItem);
    }
    
    return newItem;
  },

  async updateActionableItem(itemId: string, updates: Partial<ActionableItem>): Promise<ActionableItem> {
    await new Promise(resolve => setTimeout(resolve, 400));
    for (const member of mockFamilyMembers) {
      const itemIndex = member.actionableItems.findIndex(i => i.id === itemId);
      if (itemIndex !== -1) {
        member.actionableItems[itemIndex] = { 
          ...member.actionableItems[itemIndex], 
          ...updates, 
          updatedAt: new Date().toISOString() 
        };
        return member.actionableItems[itemIndex];
      }
    }
    throw new Error('Actionable item not found');
  },

  async createCalendarEvent(memberId: string, event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newEvent: CalendarEvent = {
      ...event,
      id: `c${Date.now()}`
    };
    
    const member = mockFamilyMembers.find(m => m.id === memberId);
    if (member) {
      member.calendar.push(newEvent);
    }
    
    return newEvent;
  }
};