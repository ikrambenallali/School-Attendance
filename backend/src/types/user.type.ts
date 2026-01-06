export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'TEACHER';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string; 
  updatedAt: string;
}
