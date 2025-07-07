
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/data/mockProjects';
import { Clock, User, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  showDetails?: boolean;
}

const ProjectCard = ({ project, showDetails = false }: ProjectCardProps) => {
  const navigate = useNavigate();

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

  const handleViewDetails = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={getDifficultyColor(project.difficulty)}>
            {project.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {project.domain}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>{project.estimatedTime}</span>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 4).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.techStack.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {showDetails && (
          <>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Prerequisites</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {project.prerequisites.slice(0, 3).map((prereq, index) => (
                  <li key={index} className="flex items-start">
                    <User className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Learning Outcomes</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {project.learningOutcomes.slice(0, 3).map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        
        <div className="pt-2">
          <Button className="w-full" onClick={handleViewDetails}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
