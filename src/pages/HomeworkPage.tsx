import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Student, HomeworkAssignment } from '../types/school';
import { schoolService } from '../services/schoolService';
import { PageHeader } from '../components/common/PageHeader';
import { SearchInput } from '../components/common/SearchInput';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { StatusBadge } from '../components/common/StatusBadge';

export const HomeworkPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await schoolService.getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to load students:', error);
    } finally {
      setLoading(false);
    }
  };

  const createHomework = async () => {
    try {
      await schoolService.createHomework({
        title: 'New Assignment',
        description: 'Complete the assigned exercises',
        subject: 'Mathematics',
        assignedDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'assigned',
        priority: 'medium',
        estimatedTime: 60,
        attachments: []
      });
      await loadStudents();
    } catch (error) {
      console.error('Failed to create homework:', error);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'submitted': return 'success';
      case 'graded': return 'success';
      case 'overdue': return 'error';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const getAllHomework = () => {
    const allHomework: (HomeworkAssignment & { studentName: string })[] = [];
    students.forEach(student => {
      student.homework.forEach(hw => {
        allHomework.push({ ...hw, studentName: student.name });
      });
    });
    return allHomework;
  };

  const filteredHomework = getAllHomework().filter(hw => {
    const matchesSearch = hw.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hw.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hw.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || hw.subject.toLowerCase() === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const subjects = [...new Set(getAllHomework().map(hw => hw.subject))];

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
        title="Homework Management"
        description="Create and track homework assignments"
        actionLabel="Create Assignment"
        onAction={createHomework}
      />

      <div className="flex items-center space-x-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search homework..."
          className="flex-1"
        />
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject.toLowerCase()}>{subject}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHomework.map(homework => (
          <div
            key={`${homework.id}-${homework.studentName}`}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{homework.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{homework.subject}</p>
                </div>
              </div>
              <StatusBadge 
                status={homework.status} 
                variant={getStatusVariant(homework.status)}
                size="sm"
              />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {homework.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Due: {new Date(homework.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{homework.estimatedTime} minutes</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {homework.studentName}
              </span>
              <div className="flex space-x-2">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View
                </button>
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHomework.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No homework found</div>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};