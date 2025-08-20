import { Student, AttendanceRecord, HomeworkAssignment, FeeRecord, SchoolEvent } from '../types/school';

const mockStudents: Student[] = [
  {
    id: 's1',
    name: 'Emma Johnson',
    grade: '5th Grade',
    class: '5A',
    parentId: '1',
    avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'present',
    attendance: [],
    homework: [],
    fees: [],
    events: []
  }
];

const mockEvents: SchoolEvent[] = [
  {
    id: 'e1',
    title: 'Parent-Teacher Conference',
    description: 'Quarterly meeting to discuss student progress',
    type: 'meeting',
    startDate: '2025-01-15T09:00:00Z',
    endDate: '2025-01-15T17:00:00Z',
    location: 'School Main Hall',
    capacity: 200,
    requiresRsvp: true,
    targetAudience: ['parents', 'teachers'],
    organizer: 'Academic Department',
    status: 'published',
    participants: []
  }
];

export const schoolService = {
  async getStudents(): Promise<Student[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStudents;
  },

  async getStudent(id: string): Promise<Student | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockStudents.find(student => student.id === id) || null;
  },

  async markAttendance(studentId: string, record: Omit<AttendanceRecord, 'id'>): Promise<AttendanceRecord> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newRecord: AttendanceRecord = {
      ...record,
      id: `att${Date.now()}`
    };
    
    const student = mockStudents.find(s => s.id === studentId);
    if (student) {
      student.attendance.push(newRecord);
      student.status = record.status;
    }
    
    return newRecord;
  },

  async createHomework(assignment: Omit<HomeworkAssignment, 'id'>): Promise<HomeworkAssignment> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newAssignment: HomeworkAssignment = {
      ...assignment,
      id: `hw${Date.now()}`
    };
    
    // Add to all students in the class (simplified)
    mockStudents.forEach(student => {
      student.homework.push(newAssignment);
    });
    
    return newAssignment;
  },

  async updateHomework(id: string, updates: Partial<HomeworkAssignment>): Promise<HomeworkAssignment> {
    await new Promise(resolve => setTimeout(resolve, 400));
    for (const student of mockStudents) {
      const hwIndex = student.homework.findIndex(hw => hw.id === id);
      if (hwIndex !== -1) {
        student.homework[hwIndex] = { ...student.homework[hwIndex], ...updates };
        return student.homework[hwIndex];
      }
    }
    throw new Error('Homework not found');
  },

  async getSchoolEvents(): Promise<SchoolEvent[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockEvents;
  },

  async createEvent(event: Omit<SchoolEvent, 'id' | 'participants'>): Promise<SchoolEvent> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newEvent: SchoolEvent = {
      ...event,
      id: `e${Date.now()}`,
      participants: []
    };
    
    mockEvents.push(newEvent);
    return newEvent;
  },

  async rsvpEvent(eventId: string, studentId: string, status: 'confirmed' | 'declined'): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const event = mockEvents.find(e => e.id === eventId);
    if (event) {
      const existingRsvp = event.participants.find(p => p.studentId === studentId);
      if (existingRsvp) {
        existingRsvp.status = status;
        existingRsvp.rsvpDate = new Date().toISOString();
      } else {
        event.participants.push({
          id: `rsvp${Date.now()}`,
          eventId,
          studentId,
          status,
          rsvpDate: new Date().toISOString()
        });
      }
    }
  }
};