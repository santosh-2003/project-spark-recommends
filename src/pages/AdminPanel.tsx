
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AdminStats } from '@/components/admin/AdminStats';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { PopularProjects } from '@/components/admin/PopularProjects';
import { UserManagement } from '@/components/admin/UserManagement';
import { ProjectManagement } from '@/components/admin/ProjectManagement';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { useAdminData } from '@/hooks/useAdminData';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { mockUsers, mockProjects, stats, searchTerm, setSearchTerm } = useAdminData();

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">BuildBuddy Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage users, projects, and system settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminStats stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivity users={mockUsers} />
              <PopularProjects projects={mockProjects} />
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement 
              users={mockUsers} 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectManagement projects={mockProjects} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
