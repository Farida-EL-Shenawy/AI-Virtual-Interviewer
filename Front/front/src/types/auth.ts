export type Role = 'candidate' | 'company';

export interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
  profileImage?: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  cv?: File;  // Optional for company users
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type AuthErrorCode = 
  | 'AUTH_INVALID_CREDENTIALS'
  | 'AUTH_USER_NOT_FOUND'
  | 'AUTH_EMAIL_EXISTS'
  | 'AUTH_INVALID_TOKEN'
  | 'AUTH_EXPIRED_TOKEN'
  | 'AUTH_NETWORK_ERROR'
  | 'AUTH_INVALID_INPUT'
  | 'AUTH_UNKNOWN_ERROR';

export interface AuthValidationError {
  field: string;
  message: string;
}

export interface AuthError {
  message: string;
  code: AuthErrorCode;
  validationErrors?: AuthValidationError[];
  statusCode?: number;
  timestamp?: string;
}