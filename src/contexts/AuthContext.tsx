
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  interests?: string[];
  skills?: string[];
  academicBackground?: {
    branch?: string;
    semester?: string;
    university?: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('buildbuddy_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('buildbuddy_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('buildbuddy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('buildbuddy_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // TODO: connect to API
    setTimeout(() => {
      const newUser = {
        id: '1',
        email,
        name: email === 'admin@test.com' ? 'Admin User' : 'John Doe',
        isAdmin: email === 'admin@test.com',
        interests: ['Web Development', 'Mobile Development'],
        skills: ['JavaScript', 'React', 'Node.js'],
        academicBackground: {
          branch: 'Computer Science',
          semester: '6th',
          university: 'Tech University'
        }
      };
      setUser(newUser);
      setIsLoading(false);
    }, 1000);
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    // TODO: connect to API
    setTimeout(() => {
      const newUser = {
        id: '1',
        email,
        name,
        isAdmin: false,
        interests: [],
        skills: [],
        academicBackground: {}
      };
      setUser(newUser);
      setIsLoading(false);
    }, 1000);
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...profileData });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
