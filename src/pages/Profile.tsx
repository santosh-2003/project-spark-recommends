
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
import { useToast } from '@/hooks/use-toast';
import { X, Plus, Save, User } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  interests: string[];
  skills: string[];
  academicBackground: {
    branch: string;
    semester: string;
    university: string;
  };
  experienceLevel: string;
  preferredDomains: string[];
}

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    bio: '',
    interests: [],
    skills: [],
    academicBackground: {
      branch: '',
      semester: '',
      university: ''
    },
    experienceLevel: '',
    preferredDomains: []
  });
  
  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load existing profile data
    // TODO: connect to API
    setProfile(prev => ({
      ...prev,
      name: user.name,
      email: user.email,
      // Load saved profile data from localStorage or API
      ...JSON.parse(localStorage.getItem('userProfile') || '{}')
    }));
  }, [user, navigate]);

  const addItem = (type: 'interests' | 'skills' | 'preferredDomains', value: string, setValue: (value: string) => void) => {
    if (value.trim() && !profile[type].includes(value.trim())) {
      setProfile(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      setValue('');
    }
  };

  const removeItem = (type: 'interests' | 'skills' | 'preferredDomains', index: number) => {
    setProfile(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: connect to API
    setTimeout(() => {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }, 1000);
  };

  const branches = [
    'Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 
    'Civil', 'Electrical', 'Chemical', 'Aerospace', 'Biomedical', 'Other'
  ];

  const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const commonDomains = [
    'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning',
    'Artificial Intelligence', 'Blockchain', 'IoT', 'Cybersecurity', 'Game Development',
    'DevOps', 'Cloud Computing', 'UI/UX Design'
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">
            Complete your profile to get better project recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Academic Background */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Academic Background</CardTitle>
              <CardDescription>
                Your educational information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="university">University/College</Label>
                <Input
                  id="university"
                  value={profile.academicBackground.university}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    academicBackground: { ...prev.academicBackground, university: e.target.value }
                  }))}
                  placeholder="Enter your university name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="branch">Branch/Major</Label>
                  <Select
                    value={profile.academicBackground.branch}
                    onValueChange={(value) => setProfile(prev => ({
                      ...prev,
                      academicBackground: { ...prev.academicBackground, branch: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map(branch => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="semester">Current Semester</Label>
                  <Select
                    value={profile.academicBackground.semester}
                    onValueChange={(value) => setProfile(prev => ({
                      ...prev,
                      academicBackground: { ...prev.academicBackground, semester: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map(semester => (
                        <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Level */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Experience Level</CardTitle>
              <CardDescription>
                Your overall programming/project experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={profile.experienceLevel}
                onValueChange={(value) => setProfile(prev => ({ ...prev, experienceLevel: value }))}
              >
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Interests</CardTitle>
              <CardDescription>
                Add topics you're interested in learning about
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest (e.g., Machine Learning)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem('interests', newInterest, setNewInterest);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addItem('interests', newInterest, setNewInterest)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {interest}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeItem('interests', index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>
                Add programming languages and technologies you know
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., JavaScript, Python)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem('skills', newSkill, setNewSkill);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addItem('skills', newSkill, setNewSkill)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeItem('skills', index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preferred Domains */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Preferred Domains</CardTitle>
              <CardDescription>
                Select areas you'd like to work on projects in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={newDomain} onValueChange={setNewDomain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonDomains
                      .filter(domain => !profile.preferredDomains.includes(domain))
                      .map(domain => (
                        <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addItem('preferredDomains', newDomain, setNewDomain)}
                  disabled={!newDomain}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.preferredDomains.map((domain, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {domain}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeItem('preferredDomains', index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
