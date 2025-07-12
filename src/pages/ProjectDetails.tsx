
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockProjects } from '@/data/mockProjects';
import { Clock, User, CheckCircle, ArrowLeft, BookOpen, Target, Lightbulb } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the specific project by ID
  const project = mockProjects.find(p => p.id === id);
  
  console.log('Project ID from URL:', id);
  console.log('Found project:', project);
  
  if (!project) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12 border-0 shadow-md">
            <CardContent>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
              <p className="text-gray-600 mb-4">The project you're looking for doesn't exist or may have been removed.</p>
              <p className="text-sm text-gray-500 mb-4">Project ID: {id}</p>
              <Button onClick={() => navigate('/projects')}>
                Back to Projects
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate('/projects')}
          className="mb-6 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        {/* Project Header - Show specific project data */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <Badge className={getDifficultyColor(project.difficulty)}>
                {project.difficulty}
              </Badge>
              <Badge variant="outline">
                {project.domain}
              </Badge>
            </div>
            <CardTitle className="text-3xl mb-4">{project.title}</CardTitle>
            <CardDescription className="text-lg">
              {project.description}
            </CardDescription>
            <div className="flex items-center text-gray-600 mt-4">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">Estimated Time: {project.estimatedTime}</span>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* How to Complete This Project */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  How to Complete "{project.title}"
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Step-by-Step Approach for {project.title}:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Set up your development environment with {project.techStack.join(', ')}</li>
                    <li>Create the basic project structure following {project.domain} best practices</li>
                    <li>Implement core functionality as described: "{project.description}"</li>
                    <li>Add styling and responsive design elements</li>
                    <li>Test your {project.title} application thoroughly</li>
                    <li>Deploy and document your {project.title} project</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Recommended Resources for {project.title}:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {project.techStack.map((tech, index) => (
                      <li key={index}>Official {tech} documentation and tutorials</li>
                    ))}
                    <li>{project.domain} specific best practices and patterns</li>
                    <li>GitHub repositories with similar {project.title} projects for reference</li>
                    <li>Community forums and developer communities for {project.domain}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Time Investment Breakdown */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Time Investment Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Planning & Setup</span>
                    <span className="font-medium">20% of total time</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Core Development</span>
                    <span className="font-medium">50% of total time</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Testing & Debugging</span>
                    <span className="font-medium">20% of total time</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Documentation & Deployment</span>
                    <span className="font-medium">10% of total time</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Total Estimated Time:</strong> {project.estimatedTime}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    This includes learning time for new technologies and iterative development.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  What You'll Learn from {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start">
                      <User className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-600" />
                      <span className="text-sm">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Project Tags */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <Button className="w-full" size="lg">
                  Start {project.title}
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Save to your learning path
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
