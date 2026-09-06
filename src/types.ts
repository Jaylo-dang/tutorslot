export type Subject =
  | 'Statistics'
  | 'Python'
  | 'Machine Learning'
  | 'Finance Analytics'
  | 'Strategy';

export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface TutorSlot {
  id: string;
  tutorName: string;
  subject: Subject;
  day: DayOfWeek;
  startTime: string;
  durationMinutes: number;
  location: string; // "Online - Zoom"
  seatsLeft: number;
  isBooked?: boolean;
  bookingReference?: string;
}

export interface BookedSession {
  slotId: string;
  bookingReference: string;
  tutorName: string;
  subject: Subject;
  day: DayOfWeek;
  startTime: string;
  durationMinutes: number;
  location: string;
}
