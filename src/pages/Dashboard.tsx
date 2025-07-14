
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/data/mockProjects';
import { getRecommendedProjects } from '@/utils/recommendationEngine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BookOpen, Clock, Star, Users, MapPin } from 'lucide-react';
import CompletedProjects from '@/components/dashboard/CompletedProjects';
import LearningHours from '@/components/dashboard/LearningHours';
import SkillsTree from '@/components/dashboard/SkillsTree';
import StreakChart from '@/components/dashboard/StreakChart';
import LearningPath from '@/components/dashboard/LearningPath';
import CommunityLinks from '@/components/dashboard/CommunityLinks';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'dashboard' | 'projects' | 'hours' | 'skills' | 'streak' | 'learning-path' | 'community'>('dashboard');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Simulate API call for personalized recommendations
    setTimeout(() => {
      const recommendations = getRecommendedProjects(user, 6);
      setRecommendedProjects(recommendations);
      setIsLoading(false);
    }, 1000);
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: 'Projects Completed',
      value: '5',
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      change: '+2 this month',
      action: () => setActiveView('projects')
    },
    {
      title: 'Hours Learning',
      value: '42',
      icon: <Clock className="w-5 h-5 text-green-600" />,
      change: '+8 this week',
      action: () => setActiveView('hours')
    },
    {
      title: 'Skills Gained',
      value: '12',
      icon: <Star className="w-5 h-5 text-purple-600" />,
      change: '+3 new skills',
      action: () => setActiveView('skills')
    },
    {
      title: 'Streak',
      value: '7 days',
      icon: <TrendingUp className="w-5 h-5 text-orange-600" />,
      change: 'Keep it up!',
      action: () => setActiveView('streak')
    }
  ];

  // Render different views based on activeView
  if (activeView === 'projects') {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompletedProjects onClose={() => setActiveView('dashboard')} />
        </div>
      </div>
    );
  }

  if (activeView === 'hours') {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LearningHours onClose={() => setActiveView('dashboard')} />
        </div>
      </div>
    );
  }

  if (activeView === 'skills') {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkillsTree onClose={() => setActiveView('dashboard')} />
        </div>
      </div>
    );
  }

  if (activeView === 'streak') {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StreakChart onClose={() => setActiveView('dashboard')} />
        </div>
      </div>
    );
  }

  if (activeView === 'learning-path') {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LearningPath onClose={() => setActiveView('dashboard')} />
        </div>
      </div>
    );
  }

  if (activeView === 'community') {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommunityLinks onClose={() => setActiveView('dashboard')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here are your personalized project recommendations based on your interests and skills.
          </p>
          {user.interests && user.interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-sm text-gray-500">Your interests:</span>
              {user.interests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {user.interests.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{user.interests.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Show message if user hasn't completed profile */}
        {(!user.interests || user.interests.length === 0) && (
          <Card className="mb-8 border-l-4 border-l-blue-500 border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Complete your profile for better recommendations</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Add your interests and skills to get personalized project recommendations.
                  </p>
                </div>
                <Button onClick={() => navigate('/profile')}>
                  Complete Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={stat.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with these common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/profile')}
                className="flex items-center"
              >
                Update Profile
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/projects')}
                className="flex items-center"
              >
                Browse All Projects
              </Button>
              <Button 
                variant="outline"
                onClick={() => setActiveView('learning-path')}
                className="flex items-center"
              >
                <MapPin className="w-4 h-4 mr-2" />
                View Learning Path
              </Button>
              <Button 
                variant="outline"
                onClick={() => setActiveView('community')}
                className="flex items-center"
              >
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user.interests && user.interests.length > 0 ? 'Recommended for You' : 'Popular Projects'}
              </h2>
              <p className="text-gray-600">
                {user.interests && user.interests.length > 0 ? 
                  'Projects tailored to your skills and interests' : 
                  'Complete your profile to get personalized recommendations'
                }
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/projects')}>
              View All Projects
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="h-80 animate-pulse border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : recommendedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 border-0 shadow-md">
              <CardContent>
                <div className="mb-4">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No recommendations yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete your profile to get personalized project recommendations.
                </p>
                <Button onClick={() => navigate('/profile')}>
                  Complete Profile
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
