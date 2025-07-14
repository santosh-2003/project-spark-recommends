import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export const AdminSettings = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure BuildBuddy system preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" defaultValue="BuildBuddy" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea id="siteDescription" defaultValue="Discover personalized project recommendations based on your skills, interests, and academic background." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxFreeProjects">Max Free Projects</Label>
            <Input id="maxFreeProjects" type="number" defaultValue="4" />
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Permissions</CardTitle>
          <CardDescription>Configure default user permissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="defaultRole">Default User Role</Label>
            <Select defaultValue="student">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Registration Settings</Label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Allow user registration</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span className="text-sm">Require email verification</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span className="text-sm">Auto-approve new users</span>
              </label>
            </div>
          </div>
          <Button>Update Permissions</Button>
        </CardContent>
      </Card>
    </div>
  );
};