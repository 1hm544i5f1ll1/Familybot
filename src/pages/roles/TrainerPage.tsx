import React, { useState, useEffect } from 'react';
import { Dumbbell, Play, Timer, TrendingUp, Target } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { StatusBadge } from '../../components/common/StatusBadge';

interface WorkoutProfile {
  id: string;
  name: string;
  avatar: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  currentWorkout: Workout | null;
  weeklyGoal: number;
  completedWorkouts: number;
  workoutHistory: WorkoutSession[];
}

interface Workout {
  id: string;
  name: string;
  duration: number;
  exercises: Exercise[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  duration?: number;
  completed: boolean;
  videoUrl?: string;
}

interface WorkoutSession {
  id: string;
  workoutName: string;
  date: string;
  duration: number;
  caloriesBurned: number;
  completed: boolean;
}

export const TrainerPage: React.FC = () => {
  const [profiles, setProfiles] = useState<WorkoutProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  useEffect(() => {
    loadWorkoutData();
  }, []);

  const loadWorkoutData = async () => {
    const mockData: WorkoutProfile[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        fitnessLevel: 'intermediate',
        weeklyGoal: 4,
        completedWorkouts: 2,
        currentWorkout: {
          id: '1',
          name: 'Upper Body Strength',
          duration: 45,
          difficulty: 'medium',
          exercises: [
            { id: '1', name: 'Push-ups', sets: 3, reps: '12-15', completed: true },
            { id: '2', name: 'Dumbbell Rows', sets: 3, reps: '10-12', completed: true },
            { id: '3', name: 'Shoulder Press', sets: 3, reps: '8-10', completed: false },
            { id: '4', name: 'Plank', sets: 3, reps: '30-60 sec', duration: 45, completed: false }
          ]
        },
        workoutHistory: [
          { id: '1', workoutName: 'Cardio Blast', date: '2024-01-14', duration: 30, caloriesBurned: 280, completed: true },
          { id: '2', workoutName: 'Lower Body', date: '2024-01-12', duration: 40, caloriesBurned: 320, completed: true },
          { id: '3', workoutName: 'Core Focus', date: '2024-01-10', duration: 25, caloriesBurned: 180, completed: false }
        ]
      }
    ];
    setProfiles(mockData);
    setSelectedProfile(mockData[0]?.id || null);
    setLoading(false);
  };

  const selectedProfileData = profiles.find(profile => profile.id === selectedProfile);

  const getFitnessLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
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
        title="AI Personal Trainer"
        description="Personalized workout plans with video guidance and progress tracking"
      >
        <div className="flex items-center space-x-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
          <Dumbbell className="w-4 h-4" />
          <span className="text-sm font-medium">AI Training</span>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Family Members</h3>
          <div className="space-y-3">
            {profiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  selectedProfile === profile.id ? 'bg-orange-50 border-orange-200' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">{profile.name}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFitnessLevelColor(profile.fitnessLevel)}`}>
                    {profile.fitnessLevel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {selectedProfileData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Weekly Progress</h3>
                    <Target className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedProfileData.completedWorkouts}/{selectedProfileData.weeklyGoal}
                  </p>
                  <p className="text-sm text-gray-500">workouts completed</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">This Week</h3>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">580</p>
                  <p className="text-sm text-gray-500">calories burned</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Avg Duration</h3>
                    <Timer className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">35</p>
                  <p className="text-sm text-gray-500">minutes</p>
                </div>
              </div>

              {selectedProfileData.currentWorkout && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedProfileData.currentWorkout.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{selectedProfileData.currentWorkout.duration} min</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedProfileData.currentWorkout.difficulty)}`}>
                          {selectedProfileData.currentWorkout.difficulty}
                        </span>
                      </div>
                    </div>
                    <Play className="w-6 h-6 text-orange-600" />
                  </div>
                  
                  <div className="space-y-3">
                    {selectedProfileData.currentWorkout.exercises.map(exercise => (
                      <div key={exercise.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            checked={exercise.completed}
                            className="w-4 h-4 text-orange-600"
                            readOnly
                          />
                          <div>
                            <h4 className={`font-medium ${exercise.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {exercise.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {exercise.sets} sets × {exercise.reps}
                              {exercise.duration && ` (${exercise.duration}s each)`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-orange-600">
                            <Play className="w-4 h-4" />
                          </button>
                          <StatusBadge 
                            status={exercise.completed ? 'completed' : 'pending'} 
                            variant={exercise.completed ? 'success' : 'warning'}
                            size="sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Workout History</h3>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-3">
                  {selectedProfileData.workoutHistory.map(session => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{session.workoutName}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(session.date).toLocaleDateString()} • {session.duration} min • {session.caloriesBurned} cal
                        </p>
                      </div>
                      <StatusBadge 
                        status={session.completed ? 'completed' : 'incomplete'} 
                        variant={session.completed ? 'success' : 'error'}
                        size="sm"
                      />
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