export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

export interface UserResponse {
  jwt: string;
  user: AuthUser;
}

export interface RegistrationCredentials {
  email: string;
  username: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}