export enum UserRole {
  ACTOR = 'ACTOR',
  CASTING_DIRECTOR = 'CASTING_DIRECTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  bio?: string;
  skills?: string[];
  location?: string;
  profileCompletion: number;
}

export interface Audition {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  gender: 'Male' | 'Female' | 'Any';
  ageRange: string;
  isPaid: boolean;
  isVerified: boolean;
  postedAt: string;
  deadline: string;
  /** ISO-ish datetime for filtering (e.g. from post form YYYY-MM-DD). */
  deadlineIso?: string;
  description: string;
  matchScore?: number;
  applicantsCount: number;
  viewsCount: number;
  script?: string;
}

export interface Application {
  id: string;
  auditionId: string;
  actorId: string;
  status: 'Applied' | 'Shortlisted' | 'Rejected' | 'Selected';
  appliedAt: string;
  videoUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  isRead: boolean;
  createdAt: string;
}
