import React, { useState, useEffect } from 'react';
import { Bot, Plus, Settings, Users, Zap } from 'lucide-react';
import { AIRole } from '../types/aiRoles';
import { aiRolesService } from '../services/aiRolesService';
import { PageHeader } from '../components/common/PageHeader';
import { SearchInput } from '../components/common/SearchInput';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { AIRoleCard } from '../components/aiRoles/AIRoleCard';

export const AIRolesPage: React.FC = () => {
  const [roles, setRoles] = useState<AIRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [autonomyFilter, setAutonomyFilter] = useState('all');

  useEffect(() => {
    loadAIRoles();
  }, []);

  const loadAIRoles = async () => {
    try {
      const data = await aiRolesService.getAIRoles();
      setRoles(data);
    } catch (error) {
      console.error('Failed to load AI roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigureRole = (role: AIRole) => {
    console.log('Configure role:', role);
  };

  const handleViewDetails = (role: AIRole) => {
    console.log('View role details:', role);
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAutonomy = autonomyFilter === 'all' || role.autonomyLevel === autonomyFilter;
    return matchesSearch && matchesAutonomy;
  });

  const totalTasks = roles.reduce((sum, role) => sum + role.performance.tasksCompleted, 0);
  const avgSuccessRate = roles.length > 0 
    ? roles.reduce((sum, role) => sum + role.performance.successRate, 0) / roles.length 
    : 0;
  const totalProfessionals = roles.reduce((sum, role) => sum + role.professionalNetwork.length, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Family Roles"
        description="Manage AI assistants that help family members autonomously or connect with professionals"
        actionLabel="Add AI Role"
        onAction={() => console.log('Add new AI role')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTasks.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgSuccessRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Professionals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalProfessionals}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search AI roles..."
          className="flex-1"
        />
        <select
          value={autonomyFilter}
          onChange={(e) => setAutonomyFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Autonomy Levels</option>
          <option value="full">Full Autonomy</option>
          <option value="assisted">Assisted</option>
          <option value="professional_required">Professional Required</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map(role => (
          <AIRoleCard
            key={role.id}
            role={role}
            onConfigure={handleConfigureRole}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredRoles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No AI roles found</div>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};