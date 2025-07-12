
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockProjects, Project } from '@/data/mockProjects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock,
  Star,
  ArrowRight,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Project ID from URL:', id);
        
        if (!id) {
          setError('Project ID is missing');
          setLoading(false);
          return;
        }

        // Simulate API call delay
        setTimeout(() => {
          const foundProject = mockProjects.find(p => p.id === id);
          console.log('Found project:', foundProject);
          
          if (foundProject) {
            setProject(foundProject);
          } else {
            setError(`Project with ID "${id}" not found`);
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project details');
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12 border-0 shadow-md">
            <CardContent>
              <div className="mb-4">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Project Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                {error || 'The project you are looking for does not exist or may have been removed.'}
              </p>
              <div className="space-x-3">
                <Button onClick={() => navigate(-1)} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                <Link to="/projects">
                  <Button>
                    Browse All Projects
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const projectSteps = [
    {
      title: "Project Setup & Planning",
      description: "Set up your development environment and plan the project structure",
      duration: "1-2 days",
      tasks: [
        "Initialize project repository",
        "Set up development environment",
        "Create project structure",
        "Plan features and requirements"
      ]
    },
    {
      title: "Core Development",
      description: "Build the main functionality and features",
      duration: "60% of project time",
      tasks: [
        "Implement core features",
        "Set up database/data management",
        "Create user interface components",
        "Add business logic"
      ]
    },
    {
      title: "Integration & Testing",
      description: "Integrate components and test functionality",
      duration: "20% of project time", 
      tasks: [
        "Integrate all components",
        "Perform unit testing",
        "User acceptance testing",
        "Bug fixes and optimization"
      ]
    },
    {
      title: "Deployment & Documentation",
      description: "Deploy the project and create documentation",
      duration: "15% of project time",
      tasks: [
        "Deploy to production environment",
        "Create user documentation",
        "Write technical documentation",
        "Final review and presentation"
      ]
    }
  ];

  const difficultyColor = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/projects" className="hover:text-blue-600 transition-colors">
              All Projects
            </Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {project.title}
            </span>
          </nav>
        </div>

        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Project Header */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-3">{project.title}</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  {project.description}
                </CardDescription>
                
                {/* Project Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.estimatedTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    Individual Project
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {project.domain}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-3">
                <Badge className={`${difficultyColor[project.difficulty]} text-sm px-3 py-1`}>
                  {project.difficulty}
                </Badge>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                  <span className="ml-2 text-sm text-gray-600">(4.2)</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  This project will guide you through building {project.title.toLowerCase()}. 
                  You'll gain hands-on experience with modern development practices and technologies.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By the end of this project, you'll have a complete understanding of how to 
                  implement the core features and deploy a production-ready application.
                </p>
              </CardContent>
            </Card>

            {/* Learning Outcomes */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Learning Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Project Steps */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Project Implementation Guide
                </CardTitle>
                <CardDescription>
                  Follow these steps to complete your project successfully
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projectSteps.map((step, index) => (
                    <div key={index} className="relative">
                      {index < projectSteps.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium mr-4 flex-shrink-0">
                          {index + 1}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mb-2">{step.description}</p>
                          <p className="text-sm text-blue-600 font-medium mb-3">
                            Duration: {step.duration}
                          </p>
                          
                          <ul className="space-y-1">
                            {step.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tags */}
            {project.tags.length > 0 && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Stats */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Project Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Difficulty</span>
                  <Badge className={difficultyColor[project.difficulty]}>
                    {project.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estimated Time</span>
                  <span className="text-sm font-medium">{project.estimatedTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Learning Outcomes</span>
                  <span className="text-sm font-medium">{project.learningOutcomes.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Technologies</span>
                  <span className="text-sm font-medium">{project.techStack.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                <BookOpen className="w-4 h-4 mr-2" />
                Start Project
              </Button>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Resources
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
