export interface Student {
  id: string;
  name: string;
  grade: string;
  class: string;
  parentId: string;
  avatar: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  attendance: AttendanceRecord[];
  homework: HomeworkAssignment[];
  fees: FeeRecord[];
  events: EventParticipation[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  checkInTime?: string;
  checkOutTime?: string;
  method: 'qr' | 'location' | 'manual';
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  notes?: string;
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  assignedDate: string;
  dueDate: string;
  status: 'assigned' | 'in-progress' | 'submitted' | 'graded' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  estimatedTime: number;
  attachments: string[];
  submission?: {
    submittedAt: string;
    files: string[];
    notes?: string;
  };
  grade?: {
    score: number;
    maxScore: number;
    feedback: string;
    gradedAt: string;
  };
}

export interface FeeRecord {
  id: string;
  studentId: string;
  type: 'tuition' | 'transport' | 'meals' | 'activities' | 'materials';
  amount: number;
  currency: string;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paidAmount?: number;
  paidDate?: string;
  paymentMethod?: string;
  reminders: ReminderRecord[];
}

export interface ReminderRecord {
  id: string;
  sentAt: string;
  type: 'email' | 'whatsapp' | 'sms';
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface EventParticipation {
  id: string;
  eventId: string;
  studentId: string;
  status: 'invited' | 'confirmed' | 'declined' | 'attended' | 'no-show';
  rsvpDate?: string;
  notes?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  type: 'academic' | 'sports' | 'cultural' | 'meeting' | 'trip';
  startDate: string;
  endDate: string;
  location: string;
  capacity?: number;
  requiresRsvp: boolean;
  targetAudience: ('students' | 'parents' | 'teachers')[];
  organizer: string;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  participants: EventParticipation[];
}