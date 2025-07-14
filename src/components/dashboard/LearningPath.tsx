import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Play, ArrowRight, BookOpen, Code, Palette, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LearningPathItem {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  progress: number;
  skills: string[];
  category: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalProjects: number;
  completedProjects: number;
  estimatedHours: number;
  category: string;
  icon: any;
  color: string;
  projects: LearningPathItem[];
}

const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Frontend Developer Path',
    description: 'Master modern frontend development with React, TypeScript, and advanced CSS',
    totalProjects: 6,
    completedProjects: 3,
    estimatedHours: 120,
    category: 'Frontend',
    icon: Code,
    color: 'blue',
    projects: [
      {
        id: '1-1',
        title: 'Personal Portfolio Website',
        description: 'Build a responsive portfolio showcasing your projects and skills',
        estimatedHours: 15,
        difficulty: 'beginner',
        completed: true,
        progress: 100,
        skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
        category: 'Frontend'
      },
      {
        id: '1-2',
        title: 'Todo App with React',
        description: 'Create a feature-rich todo application using React hooks',
        estimatedHours: 20,
        difficulty: 'beginner',
        completed: true,
        progress: 100,
        skills: ['React', 'JavaScript', 'State Management'],
        category: 'Frontend'
      },
      {
        id: '1-3',
        title: 'E-commerce Product Page',
        description: 'Build an interactive product page with cart functionality',
        estimatedHours: 25,
        difficulty: 'intermediate',
        completed: true,
        progress: 100,
        skills: ['React', 'TypeScript', 'Context API'],
        category: 'Frontend'
      },
      {
        id: '1-4',
        title: 'Weather Dashboard',
        description: 'Create a weather app with API integration and charts',
        estimatedHours: 20,
        difficulty: 'intermediate',
        completed: false,
        progress: 60,
        skills: ['API Integration', 'Charts', 'React'],
        category: 'Frontend'
      },
      {
        id: '1-5',
        title: 'Social Media Dashboard',
        description: 'Build a complex dashboard with multiple data sources',
        estimatedHours: 30,
        difficulty: 'advanced',
        completed: false,
        progress: 0,
        skills: ['Advanced React', 'Performance Optimization', 'TypeScript'],
        category: 'Frontend'
      },
      {
        id: '1-6',
        title: 'Real-time Chat Application',
        description: 'Create a real-time messaging app with WebSocket integration',
        estimatedHours: 35,
        difficulty: 'advanced',
        completed: false,
        progress: 0,
        skills: ['WebSockets', 'Real-time Updates', 'Advanced State Management'],
        category: 'Frontend'
      }
    ]
  },
  {
    id: '2',
    title: 'Full Stack Developer Path',
    description: 'Become a full-stack developer with frontend, backend, and database skills',
    totalProjects: 5,
    completedProjects: 1,
    estimatedHours: 150,
    category: 'Full Stack',
    icon: Database,
    color: 'green',
    projects: [
      {
        id: '2-1',
        title: 'Blog Platform',
        description: 'Build a complete blogging platform with user authentication',
        estimatedHours: 40,
        difficulty: 'intermediate',
        completed: true,
        progress: 100,
        skills: ['Node.js', 'Express', 'MongoDB', 'Authentication'],
        category: 'Full Stack'
      },
      {
        id: '2-2',
        title: 'Task Management System',
        description: 'Create a collaborative task management application',
        estimatedHours: 35,
        difficulty: 'intermediate',
        completed: false,
        progress: 30,
        skills: ['REST APIs', 'Database Design', 'User Management'],
        category: 'Full Stack'
      },
      {
        id: '2-3',
        title: 'E-commerce Platform',
        description: 'Build a complete e-commerce solution with payment integration',
        estimatedHours: 45,
        difficulty: 'advanced',
        completed: false,
        progress: 0,
        skills: ['Payment Processing', 'Inventory Management', 'Order System'],
        category: 'Full Stack'
      },
      {
        id: '2-4',
        title: 'Social Network API',
        description: 'Develop a scalable social networking backend API',
        estimatedHours: 40,
        difficulty: 'advanced',
        completed: false,
        progress: 0,
        skills: ['GraphQL', 'Microservices', 'Caching'],
        category: 'Full Stack'
      },
      {
        id: '2-5',
        title: 'Real-time Analytics Dashboard',
        description: 'Create a real-time analytics platform with data visualization',
        estimatedHours: 50,
        difficulty: 'advanced',
        completed: false,
        progress: 0,
        skills: ['Real-time Data', 'Analytics', 'Data Visualization'],
        category: 'Full Stack'
      }
    ]
  },
  {
    id: '3',
    title: 'UI/UX Designer Path',
    description: 'Master design principles and create beautiful user interfaces',
    totalProjects: 4,
    completedProjects: 2,
    estimatedHours: 80,
    category: 'Design',
    icon: Palette,
    color: 'purple',
    projects: [
      {
        id: '3-1',
        title: 'Design System Creation',
        description: 'Build a comprehensive design system with components',
        estimatedHours: 25,
        difficulty: 'intermediate',
        completed: true,
        progress: 100,
        skills: ['Design Systems', 'Component Libraries', 'Figma'],
        category: 'Design'
      },
      {
        id: '3-2',
        title: 'Mobile App Prototype',
        description: 'Design and prototype a mobile application',
        estimatedHours: 20,
        difficulty: 'beginner',
        completed: true,
        progress: 100,
        skills: ['Mobile Design', 'Prototyping', 'User Research'],
        category: 'Design'
      },
      {
        id: '3-3',
        title: 'E-commerce Website Redesign',
        description: 'Redesign an existing e-commerce website for better UX',
        estimatedHours: 30,
        difficulty: 'intermediate',
        completed: false,
        progress: 40,
        skills: ['UX Research', 'Information Architecture', 'Usability Testing'],
        category: 'Design'
      },
      {
        id: '3-4',
        title: 'Brand Identity Design',
        description: 'Create a complete brand identity for a startup',
        estimatedHours: 25,
        difficulty: 'advanced',
        completed: false,
        progress: 0,
        skills: ['Brand Design', 'Logo Design', 'Brand Guidelines'],
        category: 'Design'
      }
    ]
  }
];

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800'
};

interface LearningPathProps {
  onClose: () => void;
}

export default function LearningPath({ onClose }: LearningPathProps) {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const navigate = useNavigate();

  const handleProjectClick = (project: LearningPathItem) => {
    // Navigate to project details or start project
    navigate('/projects');
  };

  if (selectedPath) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPath(null)}
              className="mb-2 p-0 h-auto font-normal"
            >
              ← Back to Learning Paths
            </Button>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <selectedPath.icon className={`w-6 h-6 text-${selectedPath.color}-600`} />
              {selectedPath.title}
            </h2>
            <p className="text-muted-foreground">{selectedPath.description}</p>
          </div>
          <Button variant="outline" onClick={onClose}>
            Back to Dashboard
          </Button>
        </div>

        {/* Path Progress */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Progress Overview</CardTitle>
                <CardDescription>
                  {selectedPath.completedProjects} of {selectedPath.totalProjects} projects completed
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                ~{selectedPath.estimatedHours} hours total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={(selectedPath.completedProjects / selectedPath.totalProjects) * 100} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {Math.round((selectedPath.completedProjects / selectedPath.totalProjects) * 100)}% complete
            </p>
          </CardContent>
        </Card>

        {/* Projects List */}
        <div className="space-y-4">
          {selectedPath.projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`transition-all cursor-pointer hover:shadow-md ${
                project.completed ? 'border-green-200 bg-green-50' : 
                project.progress > 0 ? 'border-blue-200 bg-blue-50' : ''
              }`}
              onClick={() => handleProjectClick(project)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      project.completed ? 'bg-green-600 text-white' :
                      project.progress > 0 ? 'bg-blue-600 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {project.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={difficultyColors[project.difficulty]}>
                      {project.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {project.estimatedHours}h
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.progress > 0 && project.progress < 100 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-muted-foreground">
                      {project.completed ? 'Completed' :
                       project.progress > 0 ? 'In Progress' : 'Not Started'}
                    </div>
                    <Button size="sm" variant="ghost">
                      {project.completed ? 'View Details' :
                       project.progress > 0 ? 'Continue' : 'Start Project'}
                      <ArrowRight className="w-4 h-4 ml-1" />
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Learning Paths
          </h2>
          <p className="text-muted-foreground">Choose a structured learning path based on your interests</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6">
        {mockLearningPaths.map((path) => (
          <Card key={path.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedPath(path)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <path.icon className={`w-8 h-8 text-${path.color}-600 mt-1`} />
                  <div>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    <CardDescription className="mt-1">{path.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">{path.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{path.totalProjects}</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">~{path.estimatedHours}h</div>
                    <div className="text-sm text-muted-foreground">Total Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{Math.round((path.completedProjects / path.totalProjects) * 100)}%</div>
                    <div className="text-sm text-muted-foreground">Complete</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{path.completedProjects}/{path.totalProjects} projects</span>
                  </div>
                  <Progress value={(path.completedProjects / path.totalProjects) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {path.completedProjects === 0 ? 'Not started' :
                     path.completedProjects === path.totalProjects ? 'Completed' :
                     `${path.completedProjects} projects completed`}
                  </div>
                  <Button size="sm">
                    {path.completedProjects === 0 ? (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Start Path
                      </>
                    ) : (
                      <>
                        View Progress
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
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