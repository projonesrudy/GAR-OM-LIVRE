
export type UserType = 'PROFESSIONAL' | 'ESTABLISHMENT';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  avatar?: string;
  bio?: string;
  rating?: number;
  availability?: boolean;
  // Professional specific
  experienceYears?: number;
  skills?: string[];
  cpf?: string;
  location?: string;
  // Establishment specific
  cnpj?: string;
  address?: string;
  capacity?: number;
}

export interface Job {
  id: string;
  establishmentId: string;
  establishmentName: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  duration: string;
  pay: number;
  status: 'OPEN' | 'FILLED' | 'COMPLETED';
  applicants?: string[]; // user IDs
}

export type AppScreen = 'HOME' | 'LOGIN' | 'SIGNUP' | 'DASHBOARD';
