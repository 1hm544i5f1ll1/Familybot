import React from 'react';
import { User, Calendar, Target, CheckSquare, Clock, TrendingUp } from 'lucide-react';
import { FamilyMember } from '../../types/family';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onClick: () => void;
}

export const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ member, onClick }) => {
  const activeGoals = member.goals.filter(g => g.status === 'active').length;
  const pendingItems = member.actionableItems.filter(i => i.status === 'pending').length;
  const upcomingEvents = member.calendar.filter(e => 
    new Date(e.startTime) > new Date() && e.status === 'scheduled'
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">{member.role}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
          {member.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">{activeGoals} Active Goals</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckSquare className="w-4 h-4 text-orange-500" />
          <span className="text-sm text-gray-600">{pendingItems} Pending</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600">{upcomingEvents} Upcoming</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-purple-500" />
          <span className="text-sm text-gray-600">{member.activeRoles.length} Roles</span>
        </div>
      </div>

      {member.goals.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Recent Goals</h4>
          {member.goals.slice(0, 2).map(goal => (
            <div key={goal.id} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 truncate">{goal.title}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{goal.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};