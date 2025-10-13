export type User = {
  id: string;
  name: string;
  email?: string;
  type?: 'student' | 'user';
};

export type Therapist = {
  id: string;
  name: string;
  specialization: string;
  price: number;
  rating?: number;
  bio?: string;
  languages?: string[];
  availability?: string[]; // ISO datetimes / slots
};

export type Message = {
  id: string;
  text: string;
  fromUser: boolean;
  createdAt?: string;
};

export type Exercise = {
  id: string;
  title: string;
  type: 'breathing' | 'journaling' | 'meditation';
  durationMinutes?: number;
  description?: string;
};
