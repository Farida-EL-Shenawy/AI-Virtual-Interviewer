'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  role: 'candidate' | 'company';
  name?: string;
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (userData: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // TODO: Implement actual session check
      const session = localStorage.getItem('user');
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual login API call
      const mockUser = {
        id: '1',
        email,
        role: 'candidate' as const,
        name: 'John Doe',
        profileImage: '/images/avatar.png'
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // TODO: Implement actual logout API call
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const signup = async (userData: any) => {
    try {
      // TODO: Implement actual signup API call
      const mockUser = {
        id: '1',
        email: userData.email,
        role: userData.role || 'candidate' as const,
        name: `${userData.firstName} ${userData.lastName}`,
        profileImage: '/images/avatar.png'
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
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