import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar, CheckCircle } from 'lucide-react';

interface CompletedProject {
  id: string;
  title: string;
  description: string;
  completedDate: string;
  demoLink: string;
  technologies: string[];
  category: string;
}

const mockCompletedProjects: CompletedProject[] = [
  {
    id: '1',
    title: 'E-commerce Dashboard',
    description: 'A comprehensive admin dashboard for managing online store operations.',
    completedDate: '2024-01-15',
    demoLink: 'https://demo.example.com/ecommerce',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    category: 'Web Development'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    completedDate: '2024-01-08',
    demoLink: 'https://demo.example.com/taskapp',
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: 'Full Stack'
  },
  {
    id: '3',
    title: 'Weather Forecast Widget',
    description: 'A responsive weather widget with location-based forecasts.',
    completedDate: '2023-12-22',
    demoLink: 'https://demo.example.com/weather',
    technologies: ['JavaScript', 'CSS3', 'API Integration'],
    category: 'Frontend'
  },
  {
    id: '4',
    title: 'Personal Portfolio',
    description: 'A modern portfolio website showcasing projects and skills.',
    completedDate: '2023-12-10',
    demoLink: 'https://demo.example.com/portfolio',
    technologies: ['React', 'Framer Motion', 'CSS'],
    category: 'Design'
  },
  {
    id: '5',
    title: 'Blog Platform',
    description: 'A full-featured blogging platform with admin panel.',
    completedDate: '2023-11-28',
    demoLink: 'https://demo.example.com/blog',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
    category: 'Full Stack'
  }
];

interface CompletedProjectsProps {
  onClose: () => void;
}

export default function CompletedProjects({ onClose }: CompletedProjectsProps) {
  const [projects] = useState(mockCompletedProjects);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Completed Projects</h2>
          <p className="text-muted-foreground">Your successfully completed projects with demo links</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
                <Badge variant="secondary">{project.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Completed on {new Date(project.completedDate).toLocaleDateString()}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button asChild size="sm">
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Demo
                    </a>
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}