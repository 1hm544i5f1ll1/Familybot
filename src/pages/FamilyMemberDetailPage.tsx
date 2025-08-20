import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Target, CheckSquare, Plus, Settings } from 'lucide-react';
import { FamilyMember, Goal, ActionableItem, CalendarEvent } from '../types/family';
import { GoalCard } from '../components/family/GoalCard';
import { ActionableItemCard } from '../components/family/ActionableItemCard';
import { CalendarView } from '../components/family/CalendarView';
import { familyService } from '../services/familyService';

export const FamilyMemberDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<FamilyMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'tasks' | 'calendar'>('overview');

  useEffect(() => {
    if (id) {
      loadFamilyMember(id);
    }
  }, [id]);

  const loadFamilyMember = async (memberId: string) => {
    try {
      const data = await familyService.getFamilyMember(memberId);
      setMember(data);
    } catch (error) {
      console.error('Failed to load family member:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoalUpdate = async (goalId: string, updates: Partial<Goal>) => {
    try {
      await familyService.updateGoal(goalId, updates);
      if (member) {
        const updatedGoals = member.goals.map(goal =>
          goal.id === goalId ? { ...goal, ...updates } : goal
        );
        setMember({ ...member, goals: updatedGoals });
      }
    } catch (error) {
      console.error('Failed to update goal:', error);
    }
  };

  const handleActionableItemUpdate = async (itemId: string, updates: Partial<ActionableItem>) => {
    try {
      await familyService.updateActionableItem(itemId, updates);
      if (member) {
        const updatedItems = member.actionableItems.map(item =>
          item.id === itemId ? { ...item, ...updates } : item
        );
        setMember({ ...member, actionableItems: updatedItems });
      }
    } catch (error) {
      console.error('Failed to update actionable item:', error);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">Family member not found</div>
        <button
          onClick={() => navigate('/family')}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Back to Family Members
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/family')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center space-x-4">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
            <p className="text-gray-600 capitalize">{member.role}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-500">
                {member.activeRoles.length} Active Roles
              </span>
              <span className="text-sm text-gray-500">
                Last active: {new Date(member.lastActive).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Goals</h3>
                <div className="space-y-4">
                  {member.goals.slice(0, 3).map(goal => (
                    <GoalCard key={goal.id} goal={goal} onUpdate={handleGoalUpdate} />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h3>
                <div className="space-y-3">
                  {member.actionableItems.filter(item => item.status === 'pending').slice(0, 3).map(item => (
                    <ActionableItemCard key={item.id} item={item} onUpdate={handleActionableItemUpdate} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Goals</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Goal</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {member.goals.map(goal => (
                <GoalCard key={goal.id} goal={goal} onUpdate={handleGoalUpdate} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Actionable Items</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {member.actionableItems.map(item => (
                <ActionableItemCard key={item.id} item={item} onUpdate={handleActionableItemUpdate} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <CalendarView events={member.calendar} onEventClick={handleEventClick} />
        )}
      </div>
    </div>
  );
};