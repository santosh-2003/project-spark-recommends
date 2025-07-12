
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '@/components/ProjectCard';
import { mockProjects, Project, getDomains, getDifficulties } from '@/data/mockProjects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Lock, Unlock } from 'lucide-react';

const AllProjects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Memoized filtered projects for better performance
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.tags.some(tag => tag.toLowerCase().includes(search)) ||
        project.techStack.some(tech => tech.toLowerCase().includes(search))
      );
    }

    // Domain filter
    if (selectedDomain !== 'all') {
      filtered = filtered.filter(project => project.domain === selectedDomain);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(project => project.difficulty === selectedDifficulty);
    }

    // Tech stack filter
    if (selectedTech !== 'all') {
      filtered = filtered.filter(project => 
        project.techStack.some(tech => tech.toLowerCase().includes(selectedTech.toLowerCase()))
      );
    }

    return filtered;
  }, [projects, searchTerm, selectedDomain, selectedDifficulty, selectedTech]);

  // Get unique tech stacks for filter
  const uniqueTechStacks = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.techStack.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Projects to display (limited for non-authenticated users)
  const displayProjects = useMemo(() => {
    if (!user) {
      return filteredProjects.slice(0, 4);
    }
    return filteredProjects;
  }, [user, filteredProjects]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDomain('all');
    setSelectedDifficulty('all');
    setSelectedTech('all');
  };

  const hasActiveFilters = searchTerm || selectedDomain !== 'all' || selectedDifficulty !== 'all' || selectedTech !== 'all';

  const handleViewMore = () => {
    if (!user) {
      setShowLoginPrompt(true);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  useEffect(() => {
    // Clear login prompt when user logs in
    if (user) {
      setShowLoginPrompt(false);
    }
  }, [user]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Projects
          </h1>
          <p className="text-gray-600">
            Discover and explore our curated collection of {projects.length} projects.
            {!user && " Sign in to access all projects and personalized recommendations."}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter Projects
            </CardTitle>
            <CardDescription>
              Find projects that match your interests and skill level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search projects by title, description, or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Domains" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Domains</SelectItem>
                    {getDomains().map(domain => (
                      <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    {getDifficulties().map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={selectedTech} onValueChange={setSelectedTech}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Technologies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Technologies</SelectItem>
                    {uniqueTechStacks.map(tech => (
                      <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters and Clear Button */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge variant="secondary">
                      Search: "{searchTerm}"
                    </Badge>
                  )}
                  {selectedDomain !== 'all' && (
                    <Badge variant="secondary">
                      Domain: {selectedDomain}
                    </Badge>
                  )}
                  {selectedDifficulty !== 'all' && (
                    <Badge variant="secondary">
                      Difficulty: {selectedDifficulty}
                    </Badge>
                  )}
                  {selectedTech !== 'all' && (
                    <Badge variant="secondary">
                      Tech: {selectedTech}
                    </Badge>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredProjects.length === 0 ? (
              'No projects found matching your criteria'
            ) : (
              <>
                Showing {displayProjects.length} of {filteredProjects.length} projects
                {!user && filteredProjects.length > 4 && (
                  <span className="text-blue-600 ml-1">(Sign in to see all)</span>
                )}
              </>
            )}
          </p>
          
          {!user && (
            <div className="flex items-center text-sm text-gray-500">
              <Lock className="w-4 h-4 mr-1" />
              Limited preview - Sign in for full access
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {displayProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Show More Button for Non-Authenticated Users */}
            {!user && filteredProjects.length > 4 && (
              <div className="text-center">
                <Card className="inline-block p-6 border-dashed border-2 border-gray-300">
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {filteredProjects.length - 4} More Projects Available
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Sign in to access all projects and get personalized recommendations
                    </p>
                    <Button onClick={handleLoginRedirect} className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Unlock className="w-4 h-4 mr-2" />
                      Sign In to View All
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Pagination for Authenticated Users (placeholder) */}
            {user && filteredProjects.length > 12 && (
              <div className="text-center">
                <Button variant="outline" className="mr-2">
                  Previous
                </Button>
                <span className="mx-4 text-gray-600">Page 1 of 1</span>
                <Button variant="outline">
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <Card className="text-center py-12 border-0 shadow-md">
            <CardContent>
              <div className="mb-4">
                <Filter className="w-12 h-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-4">
                {hasActiveFilters 
                  ? "Try adjusting your search criteria or clearing the filters."
                  : "There are no projects available at the moment."
                }
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Login Prompt Modal (Simple version) */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-md mx-4">
              <CardHeader>
                <CardTitle>Sign In Required</CardTitle>
                <CardDescription>
                  Please sign in to access all projects and features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Create an account or sign in to:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Access all {projects.length} projects</li>
                  <li>Get personalized recommendations</li>
                  <li>Track your progress</li>
                  <li>Save favorite projects</li>
                </ul>
                <div className="flex space-x-3">
                  <Button onClick={handleLoginRedirect} className="flex-1">
                    Sign In
                  </Button>
                  <Button variant="outline" onClick={() => setShowLoginPrompt(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
