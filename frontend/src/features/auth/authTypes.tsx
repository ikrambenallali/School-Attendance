export interface AuthState {
  user: {
    id: string;
    name: string;
    role: 'teacher' | 'admin';
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
