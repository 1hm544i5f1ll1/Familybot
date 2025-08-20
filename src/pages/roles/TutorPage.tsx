import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, CheckCircle, Clock, Star } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { StatusBadge } from '../../components/common/StatusBadge';

interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  subjects: Subject[];
  currentLesson: Lesson | null;
  weeklyProgress: number;
  quizzes: Quiz[];
}

interface Subject {
  id: string;
  name: string;
  progress: number;
  grade: string;
  nextTopic: string;
  strengths: string[];
  improvements: string[];
}

interface Lesson {
  id: string;
  title: string;
  subject: string;
  duration: number;
  progress: number;
  activities: Activity[];
}

interface Activity {
  id: string;
  type: 'video' | 'quiz' | 'exercise' | 'reading';
  title: string;
  completed: boolean;
  score?: number;
}

interface Quiz {
  id: string;
  subject: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  topics: string[];
}

export const TutorPage: React.FC = () => {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    const mockData: StudentProfile[] = [
      {
        id: '1',
        name: 'Emma Johnson',
        avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=150',
        grade: '5th Grade',
        weeklyProgress: 85,
        currentLesson: {
          id: '1',
          title: 'Fractions and Decimals',
          subject: 'Mathematics',
          duration: 45,
          progress: 60,
          activities: [
            { id: '1', type: 'video', title: 'Introduction to Fractions', completed: true },
            { id: '2', type: 'quiz', title: 'Fraction Basics Quiz', completed: true, score: 85 },
            { id: '3', type: 'exercise', title: 'Practice Problems', completed: false },
            { id: '4', type: 'reading', title: 'Decimal Conversion', completed: false }
          ]
        },
        subjects: [
          {
            id: '1',
            name: 'Mathematics',
            progress: 78,
            grade: 'B+',
            nextTopic: 'Geometry Basics',
            strengths: ['Problem solving', 'Mental math'],
            improvements: ['Word problems', 'Fractions']
          },
          {
            id: '2',
            name: 'Science',
            progress: 92,
            grade: 'A',
            nextTopic: 'Solar System',
            strengths: ['Experiments', 'Observations'],
            improvements: ['Scientific writing']
          }
        ],
        quizzes: [
          { id: '1', subject: 'Mathematics', title: 'Multiplication Tables', score: 18, maxScore: 20, date: '2024-01-14', topics: ['multiplication', 'tables'] },
          { id: '2', subject: 'Science', title: 'Plant Life Cycle', score: 19, maxScore: 20, date: '2024-01-12', topics: ['biology', 'plants'] },
          { id: '3', subject: 'Mathematics', title: 'Addition & Subtraction', score: 16, maxScore: 20, date: '2024-01-10', topics: ['addition', 'subtraction'] }
        ]
      }
    ];
    setStudents(mockData);
    setSelectedStudent(mockData[0]?.id || null);
    setLoading(false);
  };

  const selectedStudentData = students.find(student => student.id === selectedStudent);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'quiz': return '❓';
      case 'exercise': return '✏️';
      case 'reading': return '📖';
      default: return '📚';
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
        title="AI Private Tutor"
        description="Personalized learning with AI explanations and progress tracking"
      >
        <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">AI Teaching</span>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Students</h3>
          <div className="space-y-3">
            {students.map(student => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  selectedStudent === student.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.grade}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {selectedStudentData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Weekly Progress</h3>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{selectedStudentData.weeklyProgress}%</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Subjects</h3>
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{selectedStudentData.subjects.length}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Quizzes Taken</h3>
                    <Brain className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{selectedStudentData.quizzes.length}</p>
                </div>
              </div>

              {selectedStudentData.currentLesson && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedStudentData.currentLesson.title}</h3>
                      <p className="text-sm text-gray-600">{selectedStudentData.currentLesson.subject} • {selectedStudentData.currentLesson.duration} min</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{selectedStudentData.currentLesson.progress}%</p>
                      <p className="text-sm text-gray-500">completed</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedStudentData.currentLesson.activities.map(activity => (
                      <div key={activity.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getActivityIcon(activity.type)}</span>
                          <div>
                            <h4 className={`font-medium ${activity.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {activity.title}
                            </h4>
                            <p className="text-sm text-gray-600 capitalize">{activity.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {activity.score && (
                            <span className="text-sm font-medium text-green-600">{activity.score}%</span>
                          )}
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
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Progress</h3>
                  <div className="space-y-4">
                    {selectedStudentData.subjects.map(subject => (
                      <div key={subject.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{subject.name}</h4>
                          <span className={`font-bold ${getGradeColor(subject.grade)}`}>{subject.grade}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">Next: {subject.nextTopic}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Quizzes</h3>
                  <div className="space-y-3">
                    {selectedStudentData.quizzes.map(quiz => (
                      <div key={quiz.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                          <span className="text-sm font-bold text-green-600">
                            {quiz.score}/{quiz.maxScore}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{quiz.subject} • {new Date(quiz.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};