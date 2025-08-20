import React, { useState, useEffect } from 'react';
import { GraduationCap, Users, Calendar, CreditCard, Plus, Search } from 'lucide-react';
import { Student, SchoolEvent } from '../types/school';
import { schoolService } from '../services/schoolService';

export const SchoolPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'attendance' | 'homework' | 'fees' | 'events'>('attendance');

  useEffect(() => {
    loadSchoolData();
  }, []);

  const loadSchoolData = async () => {
    try {
      const [studentsData, eventsData] = await Promise.all([
        schoolService.getStudents(),
        schoolService.getSchoolEvents()
      ]);
      setStudents(studentsData);
      setEvents(eventsData);
    } catch (error) {
      console.error('Failed to load school data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'attendance', label: 'Attendance', icon: Users },
    { id: 'homework', label: 'Homework', icon: GraduationCap },
    { id: 'fees', label: 'Fee Management', icon: CreditCard },
    { id: 'events', label: 'Events & RSVP', icon: Calendar }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Management</h1>
          <p className="text-gray-600">Manage attendance, homework, fees, and school events</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
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
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Attendance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map(student => (
                <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-500">{student.grade} - {student.class}</p>
                    </div>
                  </div>
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    student.status === 'present' ? 'bg-green-100 text-green-800' :
                    student.status === 'absent' ? 'bg-red-100 text-red-800' :
                    student.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {student.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'homework' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Homework Assignments</h3>
            <div className="space-y-4">
              {students.map(student => (
                <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{student.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {student.homework.slice(0, 2).map(hw => (
                      <div key={hw.id} className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800">{hw.title}</h5>
                        <p className="text-sm text-gray-600 mb-2">{hw.subject}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            hw.status === 'submitted' ? 'bg-green-100 text-green-800' :
                            hw.status === 'overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {hw.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(hw.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Management</h3>
            <div className="space-y-4">
              {students.map(student => (
                <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{student.name}</h4>
                    <span className="text-sm text-gray-500">{student.grade} - {student.class}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {student.fees.slice(0, 3).map(fee => (
                      <div key={fee.id} className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 capitalize">{fee.type}</h5>
                        <p className="text-lg font-bold text-gray-900">${fee.amount}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            fee.status === 'paid' ? 'bg-green-100 text-green-800' :
                            fee.status === 'overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {fee.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(fee.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">School Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map(event => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'published' ? 'bg-green-100 text-green-800' :
                      event.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{event.participants.length} participants</span>
                    </div>
                  </div>
                  {event.requiresRsvp && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">RSVP Required</span>
                        <span className="text-indigo-600 font-medium">
                          {event.participants.filter(p => p.status === 'confirmed').length} confirmed
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};