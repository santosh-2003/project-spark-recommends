
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { mockProjects, Project, getDomains, getDifficulties } from '@/data/mockProjects';
import { Plus, Edit, Trash2, Save, X, Shield, Users, BarChart3, Eye, Ban, CheckCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  interests: string[];
  skills: string[];
  loginCount: number;
  lastLogin: string;
  isActive: boolean;
  registeredDate: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false,
    interests: ['Web Development', 'AI/ML'],
    skills: ['JavaScript', 'React', 'Python'],
    loginCount: 25,
    lastLogin: '2024-01-12',
    isActive: true,
    registeredDate: '2023-12-01'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    isAdmin: false,
    interests: ['Mobile Development', 'UI/UX'],
    skills: ['React Native', 'Flutter', 'Figma'],
    loginCount: 15,
    lastLogin: '2024-01-10',
    isActive: true,
    registeredDate: '2023-11-15'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    isAdmin: false,
    interests: ['Data Science'],
    skills: ['Python', 'SQL', 'Pandas'],
    loginCount: 8,
    lastLogin: '2024-01-05',
    isActive: false,
    registeredDate: '2023-10-20'
  }
];

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    domain: '',
    techStack: [],
    difficulty: 'Beginner',
    tags: [],
    estimatedTime: '',
    prerequisites: [],
    learningOutcomes: []
  });
  
  const [newTech, setNewTech] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newPrereq, setNewPrereq] = useState('');
  const [newOutcome, setNewOutcome] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!user.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive",
      });
      navigate('/dashboard');
      return;
    }
  }, [user, navigate, toast]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      domain: '',
      techStack: [],
      difficulty: 'Beginner',
      tags: [],
      estimatedTime: '',
      prerequisites: [],
      learningOutcomes: []
    });
    setNewTech('');
    setNewTag('');
    setNewPrereq('');
    setNewOutcome('');
    setIsAddingProject(false);
    setEditingProject(null);
  };

  const addListItem = (type: 'techStack' | 'tags' | 'prerequisites' | 'learningOutcomes', value: string, setValue: (value: string) => void) => {
    if (value.trim() && !formData[type].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      setValue('');
    }
  };

  const removeListItem = (type: 'techStack' | 'tags' | 'prerequisites' | 'learningOutcomes', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.domain) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingProject) {
      setProjects(prev => prev.map(project => 
        project.id === editingProject 
          ? { ...formData, id: editingProject }
          : project
      ));
      toast({
        title: "Success",
        description: "Project updated successfully.",
      });
    } else {
      const newProject: Project = {
        ...formData,
        id: Date.now().toString()
      };
      setProjects(prev => [...prev, newProject]);
      toast({
        title: "Success",
        description: "Project added successfully.",
      });
    }
    
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      domain: project.domain,
      techStack: [...project.techStack],
      difficulty: project.difficulty,
      tags: [...project.tags],
      estimatedTime: project.estimatedTime,
      prerequisites: [...project.prerequisites],
      learningOutcomes: [...project.learningOutcomes]
    });
    setEditingProject(project.id);
    setIsAddingProject(true);
  };

  const handleDelete = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully.",
    });
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    ));
    const targetUser = users.find(u => u.id === userId);
    toast({
      title: "Success",
      description: `User ${targetUser?.isActive ? 'deactivated' : 'activated'} successfully.`,
    });
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast({
      title: "Success",
      description: "User deleted successfully.",
    });
  };

  if (!user || !user.isAdmin) {
    return null;
  }

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    totalProjects: projects.length,
    totalLogins: users.reduce((sum, u) => sum + u.loginCount, 0)
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-gray-600">
            Manage users, projects, and system analytics.
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Projects</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Logins</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalLogins}</p>
                    </div>
                    <Eye className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user activities and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">Last login: {user.lastLogin}</p>
                      </div>
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage all registered users ({users.length} total)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Interests</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead>Logins</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <p className="text-xs text-gray-500">Registered: {user.registeredDate}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {user.interests.slice(0, 2).map((interest, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                              {user.interests.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{user.interests.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {user.skills.slice(0, 2).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {user.skills.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{user.skills.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{user.loginCount}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <Badge variant={user.isActive ? "default" : "secondary"}>
                              {user.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleUserStatus(user.id)}
                                className={user.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
                              >
                                {user.isActive ? <Ban className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deleteUser(user.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            {/* Add/Edit Project Form */}
            {isAddingProject && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {editingProject ? 'Edit Project' : 'Add New Project'}
                      </CardTitle>
                      <CardDescription>
                        {editingProject ? 'Update project information' : 'Create a new project for the platform'}
                      </CardDescription>
                    </div>
                    <Button variant="outline" onClick={resetForm}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Project Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter project title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="estimatedTime">Estimated Time *</Label>
                        <Input
                          id="estimatedTime"
                          value={formData.estimatedTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: e.target.value }))}
                          placeholder="e.g., 4-6 weeks"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the project..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="domain">Domain *</Label>
                        <Select
                          value={formData.domain}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, domain: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select domain" />
                          </SelectTrigger>
                          <SelectContent>
                            {getDomains().map(domain => (
                              <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="difficulty">Difficulty *</Label>
                        <Select
                          value={formData.difficulty}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value as Project['difficulty'] }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            {getDifficulties().map(difficulty => (
                              <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <Label>Tech Stack</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={newTech}
                          onChange={(e) => setNewTech(e.target.value)}
                          placeholder="Add technology (e.g., React)"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addListItem('techStack', newTech, setNewTech);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addListItem('techStack', newTech, setNewTech)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.techStack.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {tech}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => removeListItem('techStack', index)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <Label>Tags</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add tag (e.g., full-stack)"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addListItem('tags', newTag, setNewTag);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addListItem('tags', newTag, setNewTag)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            {tag}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => removeListItem('tags', index)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Prerequisites */}
                    <div>
                      <Label>Prerequisites</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={newPrereq}
                          onChange={(e) => setNewPrereq(e.target.value)}
                          placeholder="Add prerequisite"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addListItem('prerequisites', newPrereq, setNewPrereq);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addListItem('prerequisites', newPrereq, setNewPrereq)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {formData.prerequisites.map((prereq, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm">{prereq}</span>
                            <X
                              className="w-4 h-4 cursor-pointer text-gray-500 hover:text-red-500"
                              onClick={() => removeListItem('prerequisites', index)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Learning Outcomes */}
                    <div>
                      <Label>Learning Outcomes</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={newOutcome}
                          onChange={(e) => setNewOutcome(e.target.value)}
                          placeholder="Add learning outcome"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addListItem('learningOutcomes', newOutcome, setNewOutcome);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addListItem('learningOutcomes', newOutcome, setNewOutcome)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {formData.learningOutcomes.map((outcome, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm">{outcome}</span>
                            <X
                              className="w-4 h-4 cursor-pointer text-gray-500 hover:text-red-500"
                              onClick={() => removeListItem('learningOutcomes', index)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <Save className="w-4 h-4 mr-2" />
                        {editingProject ? 'Update Project' : 'Add Project'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Projects Management */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Projects Management</CardTitle>
                    <CardDescription>
                      Manage all projects in the system ({projects.length} total)
                    </CardDescription>
                  </div>
                  {!isAddingProject && (
                    <Button onClick={() => setIsAddingProject(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Tech Stack</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">
                            <div className="max-w-xs">
                              <p className="truncate">{project.title}</p>
                              <p className="text-xs text-gray-500 truncate">{project.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{project.domain}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {project.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {project.techStack.slice(0, 2).map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {project.techStack.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{project.techStack.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{project.estimatedTime}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(project)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(project.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>User activity and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Logins per User</span>
                      <span className="font-bold">{Math.round(stats.totalLogins / stats.totalUsers)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active User Rate</span>
                      <span className="font-bold">{Math.round((stats.activeUsers / stats.totalUsers) * 100)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Projects per Domain</span>
                      <span className="font-bold">{Math.round(stats.totalProjects / getDomains().length)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Skills</CardTitle>
                  <CardDescription>Most popular skills among users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['JavaScript', 'React', 'Python', 'Node.js', 'SQL'].map((skill, index) => (
                      <div key={skill} className="flex justify-between items-center">
                        <span>{skill}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${100 - (index * 15)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{100 - (index * 15)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Domains</CardTitle>
                  <CardDescription>Most popular project domains</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getDomains().slice(0, 5).map((domain, index) => (
                      <div key={domain} className="flex justify-between items-center">
                        <span>{domain}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${90 - (index * 10)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{90 - (index * 10)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Overall system status and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>System Status</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Database Status</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Backup</span>
                      <span className="text-sm text-gray-600">2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
