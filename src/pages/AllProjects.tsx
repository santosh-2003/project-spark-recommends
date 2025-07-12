import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProjectCard from '@/components/ProjectCard';
import { mockProjects, getDomains, getTechStacks, getDifficulties } from '@/data/mockProjects';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Filter, X, Lock } from 'lucide-react';

const AllProjects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTechStack, setSelectedTechStack] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const projectsPerPage = 9;
  const domains = getDomains();
  const techStacks = getTechStacks();
  const difficulties = getDifficulties();

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDomain = selectedDomain === 'all' || project.domain === selectedDomain;
      const matchesDifficulty = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;
      const matchesTechStack = selectedTechStack === 'all' || project.techStack.includes(selectedTechStack);
      
      return matchesSearch && matchesDomain && matchesDifficulty && matchesTechStack;
    });
  }, [searchTerm, selectedDomain, selectedDifficulty, selectedTechStack]);

  // Limit projects for non-authenticated users
  const displayProjects = user ? filteredProjects : filteredProjects.slice(0, 4);
  const totalPages = Math.ceil(displayProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = displayProjects.slice(startIndex, startIndex + projectsPerPage);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDomain('all');
    setSelectedDifficulty('all');
    setSelectedTechStack('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || selectedDomain !== 'all' || selectedDifficulty !== 'all' || selectedTechStack !== 'all';

  const handleLoginPrompt = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Projects</h1>
          <p className="text-gray-600">
            Discover {user ? mockProjects.length : '4 free'} projects across various domains and difficulty levels.
            {!user && (
              <span className="text-blue-600 font-medium ml-1">
                Login to see all {mockProjects.length} projects!
              </span>
            )}
          </p>
        </div>

        {/* Free user limitation notice */}
        {!user && (
          <Card className="mb-8 border-l-4 border-l-blue-500 border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Lock className="w-5 h-5 mr-3 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Limited Access</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      You can view 4 projects for free. Login to access all {mockProjects.length} projects and get personalized recommendations.
                    </p>
                  </div>
                </div>
                <Button onClick={handleLoginPrompt}>
                  Login Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
                <CardDescription>
                  Find projects that match your preferences
                </CardDescription>
              </div>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Domain Filter */}
              <div>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Domains" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Domains</SelectItem>
                    {domains.map(domain => (
                      <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Difficulty Filter */}
              <div>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Tech Stack Filter */}
            <div className="mt-4">
              <Select value={selectedTechStack} onValueChange={setSelectedTechStack}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="All Technologies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Technologies</SelectItem>
                  {techStacks.map(tech => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">
              Showing {paginatedProjects.length} of {displayProjects.length} projects
              {!user && ` (${mockProjects.length - 4} more available after login)`}
            </p>
            {hasActiveFilters && (
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
                    Level: {selectedDifficulty}
                  </Badge>
                )}
                {selectedTechStack !== 'all' && (
                  <Badge variant="secondary">
                    Tech: {selectedTechStack}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {paginatedProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} showDetails />
              ))}
            </div>
            
            {/* Show more button for non-authenticated users */}
            {!user && filteredProjects.length > 4 && (
              <div className="text-center mb-8">
                <Card className="inline-block border-0 shadow-md">
                  <CardContent className="p-6">
                    <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {filteredProjects.length - 4} More Projects Available
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Login to access all projects and get personalized recommendations based on your interests.
                    </p>
                    <Button onClick={handleLoginPrompt} size="lg">
                      Login to See More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        ) : (
          <Card className="text-center py-12 border-0 shadow-md">
            <CardContent>
              <div className="mb-4">
                <Search className="w-12 h-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms to find more projects.
              </p>
              <Button onClick={clearFilters}>
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination - only show if user is authenticated */}
        {user && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2">...</span>;
                }
                return null;
              })}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
