import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  projectsCompleted: number;
}

interface RecentActivityProps {
  users: User[];
}

export const RecentActivity = ({ users }: RecentActivityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent User Activity</CardTitle>
        <CardDescription>Latest user logins and registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.slice(0, 3).map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">Last login: {user.lastLogin}</p>
              </div>
              <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                {user.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};