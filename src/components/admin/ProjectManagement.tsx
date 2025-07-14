import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Project } from '@/data/mockProjects';

interface ProjectManagementProps {
  projects: Project[];
}

export const ProjectManagement = ({ projects }: ProjectManagementProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Project Management</CardTitle>
            <CardDescription>Manage available projects and their details</CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{project.difficulty}</Badge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{project.domain}</span>
                  <span className="text-gray-500">{project.estimatedTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};