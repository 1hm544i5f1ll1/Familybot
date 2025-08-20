import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Heart, AlertTriangle, Calendar } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { StatusBadge } from '../../components/common/StatusBadge';

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  notes: string;
  triggers: string[];
}

interface CBTExercise {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  type: 'breathing' | 'mindfulness' | 'cognitive' | 'behavioral';
}

interface FamilyMemberMental {
  id: string;
  name: string;
  avatar: string;
  currentMood: number;
  weeklyAverage: number;
  moodEntries: MoodEntry[];
  exercises: CBTExercise[];
  riskLevel: 'low' | 'medium' | 'high';
}

export const PsychologistPage: React.FC = () => {
  const [members, setMembers] = useState<FamilyMemberMental[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  useEffect(() => {
    loadMentalHealthData();
  }, []);

  const loadMentalHealthData = async () => {
    const mockData: FamilyMemberMental[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        currentMood: 7,
        weeklyAverage: 6.8,
        riskLevel: 'low',
        moodEntries: [
          { id: '1', date: '2024-01-15', mood: 7, notes: 'Good day at work', triggers: ['work_success'] },
          { id: '2', date: '2024-01-14', mood: 6, notes: 'Feeling tired', triggers: ['fatigue'] },
          { id: '3', date: '2024-01-13', mood: 8, notes: 'Great family time', triggers: ['family_time'] }
        ],
        exercises: [
          { id: '1', title: '4-7-8 Breathing', description: 'Deep breathing exercise for anxiety', completed: true, completedAt: '2024-01-15', type: 'breathing' },
          { id: '2', title: 'Gratitude Journal', description: 'Write 3 things you\'re grateful for', completed: false, type: 'cognitive' },
          { id: '3', title: 'Body Scan Meditation', description: '10-minute mindfulness practice', completed: false, type: 'mindfulness' }
        ]
      }
    ];
    setMembers(mockData);
    setSelectedMember(mockData[0]?.id || null);
    setLoading(false);
  };

  const selectedMemberData = members.find(member => member.id === selectedMember);

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'text-green-600';
    if (mood >= 6) return 'text-yellow-600';
    if (mood >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        title="AI Psychologist/Psychiatrist"
        description="Mental health support with mood tracking and CBT exercises"
      >
        <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
          <Brain className="w-4 h-4" />
          <span className="text-sm font-medium">AI Monitoring</span>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Member Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Family Members</h3>
          <div className="space-y-3">
            {members.map(member => (
              <button
                key={member.id}
                onClick={() => setSelectedMember(member.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  selectedMember === member.id ? 'bg-purple-50 border-purple-200' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getMoodColor(member.currentMood)}`}>
                      Mood: {member.currentMood}/10
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(member.riskLevel)}`}>
                  {member.riskLevel}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {selectedMemberData && (
            <>
              {/* Mood Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Current Mood</h3>
                    <Heart className="w-5 h-5 text-pink-500" />
                  </div>
                  <p className={`text-3xl font-bold ${getMoodColor(selectedMemberData.currentMood)}`}>
                    {selectedMemberData.currentMood}/10
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Weekly Average</h3>
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className={`text-3xl font-bold ${getMoodColor(selectedMemberData.weeklyAverage)}`}>
                    {selectedMemberData.weeklyAverage}/10
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Risk Level</h3>
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(selectedMemberData.riskLevel)}`}>
                    {selectedMemberData.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Mood Tracking */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Mood Entries</h3>
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="space-y-3">
                  {selectedMemberData.moodEntries.map(entry => (
                    <div key={entry.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                        <span className={`text-lg font-bold ${getMoodColor(entry.mood)}`}>
                          {entry.mood}/10
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{entry.notes}</p>
                      <div className="flex flex-wrap gap-1">
                        {entry.triggers.map(trigger => (
                          <span key={trigger} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {trigger.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CBT Exercises */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">CBT Exercises</h3>
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedMemberData.exercises.map(exercise => (
                    <div key={exercise.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{exercise.title}</h4>
                        <StatusBadge 
                          status={exercise.completed ? 'completed' : 'pending'} 
                          variant={exercise.completed ? 'success' : 'warning'}
                          size="sm"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          exercise.type === 'breathing' ? 'bg-blue-100 text-blue-800' :
                          exercise.type === 'mindfulness' ? 'bg-green-100 text-green-800' :
                          exercise.type === 'cognitive' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {exercise.type}
                        </span>
                        {exercise.completed && exercise.completedAt && (
                          <span className="text-xs text-gray-500">
                            {new Date(exercise.completedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};