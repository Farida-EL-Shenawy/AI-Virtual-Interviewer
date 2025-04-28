import { LoginCredentials, SignupData, User, AuthError } from '../types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw response;
      }

      return await response.json();
    } catch (error) {
      throw this.handleError(error as Error);
    }
  }

  static async signup(data: SignupData): Promise<User> {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw response;
      }

      return await response.json();
    } catch (error) {
      throw this.handleError(error as Error);
    }
  }

  static async logout(): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw response;
      }
    } catch (error) {
      throw this.handleError(error as Error);
    }
  }

  static async checkSession(): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/session`, {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          return null;
        }
        throw response;
      }

      return await response.json();
    } catch (error) {
      throw this.handleError(error as Error);
    }
  }

  private static handleError(error: Error | Response): AuthError {
    const timestamp = new Date().toISOString();

    if (error instanceof Response) {
      const statusCode = error.status;
      switch (statusCode) {
        case 401:
          return {
            message: 'Invalid credentials',
            code: 'AUTH_INVALID_CREDENTIALS',
            statusCode,
            timestamp
          };
        case 404:
          return {
            message: 'User not found',
            code: 'AUTH_USER_NOT_FOUND',
            statusCode,
            timestamp
          };
        case 409:
          return {
            message: 'Email already exists',
            code: 'AUTH_EMAIL_EXISTS',
            statusCode,
            timestamp
          };
        case 422:
          return {
            message: 'Invalid input data',
            code: 'AUTH_INVALID_INPUT',
            statusCode,
            timestamp,
            validationErrors: [{ field: 'unknown', message: 'Invalid input data' }]
          };
        default:
          return {
            message: 'An unexpected error occurred',
            code: 'AUTH_UNKNOWN_ERROR',
            statusCode,
            timestamp
          };
      }
    }

    if (error.message.includes('network')) {
      return {
        message: 'Network error occurred',
        code: 'AUTH_NETWORK_ERROR',
        timestamp
      };
    }

    return {
      message: error.message || 'An unexpected error occurred',
      code: 'AUTH_UNKNOWN_ERROR',
      timestamp
    };
  }
}