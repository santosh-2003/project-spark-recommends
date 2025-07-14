import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, TrendingUp } from 'lucide-react';

const mockLearningData = [
  { project: 'E-commerce Dashboard', hours: 25, category: 'Web Development' },
  { project: 'Task Management App', hours: 18, category: 'Full Stack' },
  { project: 'Weather Widget', hours: 12, category: 'Frontend' },
  { project: 'Personal Portfolio', hours: 15, category: 'Design' },
  { project: 'Blog Platform', hours: 22, category: 'Full Stack' }
];

const categoryData = [
  { name: 'Web Development', hours: 25, color: '#3b82f6' },
  { name: 'Full Stack', hours: 40, color: '#10b981' },
  { name: 'Frontend', hours: 12, color: '#f59e0b' },
  { name: 'Design', hours: 15, color: '#ef4444' }
];

interface LearningHoursProps {
  onClose: () => void;
}

export default function LearningHours({ onClose }: LearningHoursProps) {
  const [viewType, setViewType] = useState<'project' | 'category'>('project');
  const totalHours = mockLearningData.reduce((sum, item) => sum + item.hours, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Learning Hours Analytics
          </h2>
          <p className="text-muted-foreground">Track your learning progress across different projects</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +8 hours this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average per Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalHours / mockLearningData.length)}h</div>
            <p className="text-xs text-muted-foreground">Across {mockLearningData.length} projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47h</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              12% increase
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Learning Time Distribution</CardTitle>
              <CardDescription>Hours spent on different projects and categories</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewType === 'project' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('project')}
              >
                By Project
              </Button>
              <Button
                variant={viewType === 'category' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('category')}
              >
                By Category
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewType === 'project' ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockLearningData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="project" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="hours"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <Badge variant="secondary">{category.hours}h</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}