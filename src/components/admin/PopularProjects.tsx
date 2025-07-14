import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/data/mockProjects';

interface PopularProjectsProps {
  projects: Project[];
}

export const PopularProjects = ({ projects }: PopularProjectsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Projects</CardTitle>
        <CardDescription>Most accessed projects this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-gray-500">{project.domain}</p>
              </div>
              <Badge variant="outline">{project.difficulty}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};