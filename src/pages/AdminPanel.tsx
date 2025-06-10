
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
import { useToast } from '@/hooks/use-toast';
import { mockProjects, Project, getDomains, getDifficulties } from '@/data/mockProjects';
import { Plus, Edit, Trash2, Save, X, Shield } from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
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
      // Update existing project
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
      // Add new project
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

  if (!user || !user.isAdmin) {
    return null;
  }

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
            Manage projects and system content.
          </p>
        </div>

        {/* Add/Edit Project Form */}
        {isAddingProject && (
          <Card className="mb-8 border-0 shadow-lg">
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
      </div>
    </div>
  );
};

export default AdminPanel;
