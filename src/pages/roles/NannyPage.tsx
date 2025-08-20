import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Clock, Baby, BookOpen, Activity } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { StatusBadge } from '../../components/common/StatusBadge';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  schedule: ScheduleItem[];
  milestones: Milestone[];
  activities: Activity[];
}

interface ScheduleItem {
  id: string;
  time: string;
  activity: string;
  status: 'completed' | 'pending' | 'missed';
}

interface Milestone {
  id: string;
  title: string;
  ageTarget: number;
  achieved: boolean;
  achievedAt?: string;
}

interface Activity {
  id: string;
  name: string;
  duration: number;
  category: 'educational' | 'physical' | 'creative' | 'social';
  completed: boolean;
}

export const NannyPage: React.FC = () => {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    // Mock data
    const mockChildren: ChildProfile[] = [
      {
        id: '1',
        name: 'Emma Johnson',
        age: 5,
        avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=150',
        schedule: [
          { id: '1', time: '08:00', activity: 'Breakfast & Morning Routine', status: 'completed' },
          { id: '2', time: '09:00', activity: 'Educational Play Time', status: 'completed' },
          { id: '3', time: '10:30', activity: 'Outdoor Activities', status: 'pending' },
          { id: '4', time: '12:00', activity: 'Lunch & Rest Time', status: 'pending' }
        ],
        milestones: [
          { id: '1', title: 'Reading Simple Words', ageTarget: 5, achieved: true, achievedAt: '2024-01-10' },
          { id: '2', title: 'Counting to 20', ageTarget: 5, achieved: true, achievedAt: '2024-01-05' },
          { id: '3', title: 'Tying Shoelaces', ageTarget: 6, achieved: false }
        ],
        activities: [
          { id: '1', name: 'Alphabet Recognition', duration: 30, category: 'educational', completed: true },
          { id: '2', name: 'Drawing & Coloring', duration: 45, category: 'creative', completed: false },
          { id: '3', name: 'Physical Exercise', duration: 20, category: 'physical', completed: false }
        ]
      }
    ];
    setChildren(mockChildren);
    setSelectedChild(mockChildren[0]?.id || null);
    setLoading(false);
  };

  const selectedChildData = children.find(child => child.id === selectedChild);

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
        title="AI Nanny/Governess"
        description="Automated childcare with expert child development support"
      >
        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
          <Heart className="w-4 h-4" />
          <span className="text-sm font-medium">AI Active</span>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Child Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Children</h3>
          <div className="space-y-3">
            {children.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  selectedChild === child.id ? 'bg-indigo-50 border-indigo-200' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{child.name}</p>
                  <p className="text-sm text-gray-500">{child.age} years old</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {selectedChildData && (
            <>
              {/* Today's Schedule */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="space-y-3">
                  {selectedChildData.schedule.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{item.time}</span>
                        <span className="text-gray-600">{item.activity}</span>
                      </div>
                      <StatusBadge 
                        status={item.status} 
                        variant={item.status === 'completed' ? 'success' : item.status === 'pending' ? 'warning' : 'error'}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Milestones */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Development Milestones</h3>
                  <Baby className="w-5 h-5 text-pink-600" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedChildData.milestones.map(milestone => (
                    <div key={milestone.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                        <StatusBadge 
                          status={milestone.achieved ? 'achieved' : 'pending'} 
                          variant={milestone.achieved ? 'success' : 'default'}
                          size="sm"
                        />
                      </div>
                      <p className="text-sm text-gray-600">Target Age: {milestone.ageTarget} years</p>
                      {milestone.achieved && milestone.achievedAt && (
                        <p className="text-sm text-green-600">
                          Achieved: {new Date(milestone.achievedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Activities */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Learning Activities</h3>
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedChildData.activities.map(activity => (
                    <div key={activity.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{activity.name}</h4>
                        <Activity className="w-4 h-4 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{activity.duration} minutes</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.category === 'educational' ? 'bg-blue-100 text-blue-800' :
                          activity.category === 'physical' ? 'bg-green-100 text-green-800' :
                          activity.category === 'creative' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {activity.category}
                        </span>
                        <StatusBadge 
                          status={activity.completed ? 'completed' : 'pending'} 
                          variant={activity.completed ? 'success' : 'warning'}
                          size="sm"
                        />
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