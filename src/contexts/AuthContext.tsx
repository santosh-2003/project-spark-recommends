
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
    try {
      const savedUser = localStorage.getItem('buildbuddy_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Validate user object structure
        if (parsedUser && parsedUser.id && parsedUser.email && parsedUser.name) {
          setUser(parsedUser);
        } else {
          // Invalid user data, clear storage
          localStorage.removeItem('buildbuddy_user');
        }
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('buildbuddy_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('buildbuddy_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('buildbuddy_user');
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with proper error handling
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate some login validation
          if (email.includes('@') && password.length >= 6) {
            resolve(true);
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });

      const newUser: User = {
        id: email === 'admin@test.com' ? 'admin-1' : Date.now().toString(),
        email,
        name: email === 'admin@test.com' ? 'Admin User' : email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        isAdmin: email === 'admin@test.com',
        interests: email === 'admin@test.com' ? ['System Administration'] : ['Web Development', 'Mobile Development'],
        skills: email === 'admin@test.com' ? ['Management', 'Analytics'] : ['JavaScript', 'React', 'Node.js'],
        academicBackground: {
          branch: 'Computer Science',
          semester: '6th',
          university: 'Tech University'
        }
      };
      
      setUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name: name.trim(),
        isAdmin: false,
        interests: [],
        skills: [],
        academicBackground: {}
      };
      
      setUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      // Ensure required fields are not overwritten with empty values
      if (!updatedUser.name || !updatedUser.email) {
        throw new Error('Name and email are required');
      }
      setUser(updatedUser);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('buildbuddy_user');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
