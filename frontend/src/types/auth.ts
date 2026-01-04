export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  role: "ADMIN" | "TEACHER";
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
