import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, Lock, Sparkles } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  unlocked: boolean;
  isNew?: boolean;
  prerequisites?: string[];
  description: string;
}

const mockSkills: Skill[] = [
  // Previously unlocked skills
  { id: '1', name: 'HTML5', category: 'Frontend', level: 'advanced', unlocked: true, description: 'Semantic markup and modern HTML features' },
  { id: '2', name: 'CSS3', category: 'Frontend', level: 'advanced', unlocked: true, description: 'Advanced styling and animations' },
  { id: '3', name: 'JavaScript', category: 'Frontend', level: 'intermediate', unlocked: true, description: 'Modern ES6+ features and DOM manipulation' },
  { id: '4', name: 'React', category: 'Frontend', level: 'intermediate', unlocked: true, description: 'Component-based UI development' },
  { id: '5', name: 'Git', category: 'DevOps', level: 'intermediate', unlocked: true, description: 'Version control and collaboration' },
  { id: '6', name: 'Node.js', category: 'Backend', level: 'beginner', unlocked: true, description: 'Server-side JavaScript runtime' },
  { id: '7', name: 'REST APIs', category: 'Backend', level: 'beginner', unlocked: true, description: 'RESTful web service design' },
  { id: '8', name: 'MongoDB', category: 'Database', level: 'beginner', unlocked: true, description: 'NoSQL database operations' },
  { id: '9', name: 'Responsive Design', category: 'Frontend', level: 'intermediate', unlocked: true, description: 'Mobile-first design principles' },
  
  // Newly unlocked skills
  { id: '10', name: 'TypeScript', category: 'Frontend', level: 'beginner', unlocked: true, isNew: true, prerequisites: ['3'], description: 'Type-safe JavaScript development' },
  { id: '11', name: 'Tailwind CSS', category: 'Frontend', level: 'beginner', unlocked: true, isNew: true, prerequisites: ['2'], description: 'Utility-first CSS framework' },
  { id: '12', name: 'React Hooks', category: 'Frontend', level: 'beginner', unlocked: true, isNew: true, prerequisites: ['4'], description: 'Modern React state management' },
  
  // Locked skills (future unlocks)
  { id: '13', name: 'Next.js', category: 'Frontend', level: 'beginner', unlocked: false, prerequisites: ['4', '10'], description: 'React production framework' },
  { id: '14', name: 'GraphQL', category: 'Backend', level: 'beginner', unlocked: false, prerequisites: ['7'], description: 'Query language for APIs' },
  { id: '15', name: 'Docker', category: 'DevOps', level: 'beginner', unlocked: false, prerequisites: ['6'], description: 'Application containerization' },
  { id: '16', name: 'PostgreSQL', category: 'Database', level: 'beginner', unlocked: false, prerequisites: ['8'], description: 'Relational database management' },
];

const categories = ['Frontend', 'Backend', 'Database', 'DevOps'];
const levelColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
  advanced: 'bg-purple-100 text-purple-800 border-purple-200'
};

interface SkillsTreeProps {
  onClose: () => void;
}

export default function SkillsTree({ onClose }: SkillsTreeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const newSkills = mockSkills.filter(skill => skill.isNew);
  const unlockedSkills = mockSkills.filter(skill => skill.unlocked);
  const lockedSkills = mockSkills.filter(skill => !skill.unlocked);
  
  const filteredSkills = selectedCategory 
    ? mockSkills.filter(skill => skill.category === selectedCategory)
    : mockSkills;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-600" />
            Skills Tree
          </h2>
          <p className="text-muted-foreground">Track your skill progression and unlock new abilities</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Back to Dashboard
        </Button>
      </div>

      {/* New Skills Alert */}
      {newSkills.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Sparkles className="w-5 h-5" />
              New Skills Unlocked!
            </CardTitle>
            <CardDescription className="text-yellow-700">
              Congratulations! You've unlocked {newSkills.length} new skill{newSkills.length > 1 ? 's' : ''}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {newSkills.map((skill) => (
                <Badge key={skill.id} className="bg-yellow-200 text-yellow-800 border-yellow-300">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {skill.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unlockedSkills.length}</div>
            <p className="text-xs text-muted-foreground">
              {newSkills.length} new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories Mastered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.filter(cat => 
                unlockedSkills.filter(skill => skill.category === cat).length >= 2
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">
              out of {categories.length} categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Unlock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lockedSkills.length}</div>
            <p className="text-xs text-muted-foreground">skills available</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <Card 
            key={skill.id} 
            className={`relative transition-all duration-200 ${
              skill.unlocked ? 'hover:shadow-md' : 'opacity-60'
            } ${skill.isNew ? 'ring-2 ring-yellow-400' : ''}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {skill.unlocked ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                  <CardTitle className="text-sm">{skill.name}</CardTitle>
                  {skill.isNew && (
                    <Sparkles className="w-4 h-4 text-yellow-600" />
                  )}
                </div>
                <Badge variant="outline" className={levelColors[skill.level]}>
                  {skill.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="secondary" className="text-xs">
                {skill.category}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {skill.description}
              </p>
              {skill.prerequisites && skill.prerequisites.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Prerequisites:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skill.prerequisites.map((prereqId) => {
                      const prereq = mockSkills.find(s => s.id === prereqId);
                      return prereq ? (
                        <Badge key={prereqId} variant="outline" className="text-xs">
                          {prereq.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}