import { useState } from 'react';
import { mockProjects } from '@/data/mockProjects';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  projectsCompleted: number;
}

export const useAdminData = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', lastLogin: '2024-01-15', projectsCompleted: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Student', status: 'Active', lastLogin: '2024-01-14', projectsCompleted: 3 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', status: 'Inactive', lastLogin: '2024-01-10', projectsCompleted: 8 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Student', status: 'Active', lastLogin: '2024-01-15', projectsCompleted: 2 },
  ];

  const stats = {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.status === 'Active').length,
    totalProjects: mockProjects.length,
    completedProjects: mockUsers.reduce((sum, user) => sum + user.projectsCompleted, 0)
  };

  return {
    mockUsers,
    mockProjects,
    stats,
    searchTerm,
    setSearchTerm
  };
};