import React from 'react';
import { 
  MessageSquare, 
  Users, 
  Settings, 
  BarChart3, 
  Send, 
  GraduationCap, 
  Heart, 
  Shield, 
  Home,
  Bot,
  Calendar,
  Bell,
  FileText,
  UserCheck,
  CreditCard,
  Languages,
  Mic,
  MapPin,
  Plane,
  Utensils,
  Dumbbell,
  Brain,
  Palette,
  Calculator
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, isCollapsed }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'broadcasting', label: 'Broadcasting', icon: Send },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const schoolItems = [
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'homework', label: 'Homework', icon: FileText },
    { id: 'fees', label: 'Fee Management', icon: CreditCard },
    { id: 'events', label: 'Events & RSVP', icon: Calendar },
  ];

  const familyRoles = [
    { id: 'nanny', label: 'Nanny/Governess', icon: Heart },
    { id: 'tutor', label: 'Private Tutor', icon: GraduationCap },
    { id: 'mental', label: 'Psychologist', icon: Brain },
    { id: 'nutrition', label: 'Nutritionist', icon: Utensils },
    { id: 'fitness', label: 'Personal Trainer', icon: Dumbbell },
    { id: 'financial', label: 'Financial Advisor', icon: Calculator },
    { id: 'travel', label: 'Travel Planner', icon: Plane },
    { id: 'design', label: 'Interior Designer', icon: Palette },
  ];

  const systemItems = [
    { id: 'translation', label: 'Translation', icon: Languages },
    { id: 'transcription', label: 'Transcription', icon: Mic },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'settings', label: 'Bot Settings', icon: Settings },
  ];

  const renderMenuSection = (title: string, items: any[]) => (
    <div className="mb-6">
      {!isCollapsed && (
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-4">
          {title}
        </h3>
      )}
      <div className="space-y-1 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'px-2' : ''}`}>
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">WhatsApp Bot</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Admin Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {renderMenuSection('Main', menuItems)}
          {renderMenuSection('School', schoolItems)}
          {renderMenuSection('Family Roles', familyRoles)}
          {renderMenuSection('System', systemItems)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;