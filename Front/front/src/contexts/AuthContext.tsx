'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '../services/auth';
import { User, LoginCredentials, SignupData, AuthError } from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: (callbackUrl?: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await AuthService.checkSession();
      setUser(user);
    } catch (error) {
      setError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const user = await AuthService.login(credentials);
      setUser(user);
    } catch (error) {
      setError(error as AuthError);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (callbackUrl?: string) => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.logout();
      setUser(null);
      if (callbackUrl) {
        window.location.href = callbackUrl;
      }
    } catch (error) {
      setError(error as AuthError);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      setLoading(true);
      setError(null);
      const user = await AuthService.signup(userData);
      setUser(user);
    } catch (error) {
      setError(error as AuthError);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, signup, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}