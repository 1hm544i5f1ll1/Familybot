import React, { useState, useEffect } from 'react';
import { QrCode, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Student, AttendanceRecord } from '../types/school';
import { schoolService } from '../services/schoolService';
import { PageHeader } from '../components/common/PageHeader';
import { SearchInput } from '../components/common/SearchInput';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { StatusBadge } from '../components/common/StatusBadge';

export const AttendancePage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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

  const markAttendance = async (studentId: string, status: 'present' | 'absent' | 'late') => {
    try {
      await schoolService.markAttendance(studentId, {
        studentId,
        date: selectedDate,
        status,
        checkInTime: new Date().toISOString(),
        method: 'manual'
      });
      await loadStudents();
    } catch (error) {
      console.error('Failed to mark attendance:', error);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'error';
      case 'late': return 'warning';
      default: return 'default';
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        title="Attendance Tracking"
        description="Mark and monitor student attendance"
        actionLabel="Generate QR Code"
        onAction={() => console.log('Generate QR code')}
      />

      <div className="flex items-center space-x-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search students..."
          className="flex-1"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <div
            key={student.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {student.grade} - {student.class}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <StatusBadge 
                status={student.status} 
                variant={getStatusVariant(student.status)}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => markAttendance(student.id, 'present')}
                className="flex items-center justify-center p-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Present
              </button>
              <button
                onClick={() => markAttendance(student.id, 'late')}
                className="flex items-center justify-center p-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <Clock className="w-4 h-4 mr-1" />
                Late
              </button>
              <button
                onClick={() => markAttendance(student.id, 'absent')}
                className="flex items-center justify-center p-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
              >
                Absent
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <QrCode className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">QR Check-in</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">Location</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No students found</div>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};