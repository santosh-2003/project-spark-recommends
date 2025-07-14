import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, BookOpen, Newspaper, MessageCircle, Video, Github, Twitter } from 'lucide-react';

interface CommunityLink {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'documentation' | 'news' | 'community' | 'learning' | 'social';
  icon: any;
  isNew?: boolean;
  memberCount?: string;
}

const mockCommunityLinks: CommunityLink[] = [
  // Documentation
  {
    id: '1',
    title: 'React Documentation',
    description: 'Official React documentation with latest updates and best practices',
    url: 'https://react.dev',
    category: 'documentation',
    icon: BookOpen
  },
  {
    id: '2',
    title: 'TypeScript Handbook',
    description: 'Comprehensive guide to TypeScript features and usage',
    url: 'https://www.typescriptlang.org/docs/',
    category: 'documentation',
    icon: BookOpen
  },
  {
    id: '3',
    title: 'Tailwind CSS Docs',
    description: 'Utility-first CSS framework documentation and examples',
    url: 'https://tailwindcss.com/docs',
    category: 'documentation',
    icon: BookOpen
  },

  // News & Updates
  {
    id: '4',
    title: 'JavaScript Weekly',
    description: 'Weekly newsletter with the latest JavaScript news and articles',
    url: 'https://javascriptweekly.com/',
    category: 'news',
    icon: Newspaper,
    isNew: true
  },
  {
    id: '5',
    title: 'React Status',
    description: 'Weekly roundup of React news, articles, and releases',
    url: 'https://react.statuscode.com/',
    category: 'news',
    icon: Newspaper
  },
  {
    id: '6',
    title: 'Frontend Focus',
    description: 'Weekly newsletter for front-end developers',
    url: 'https://frontendfoc.us/',
    category: 'news',
    icon: Newspaper
  },

  // Community Forums
  {
    id: '7',
    title: 'Stack Overflow',
    description: 'Q&A platform for developers to get help and share knowledge',
    url: 'https://stackoverflow.com/',
    category: 'community',
    icon: MessageCircle,
    memberCount: '21M+'
  },
  {
    id: '8',
    title: 'Dev.to Community',
    description: 'Community of developers sharing articles and discussions',
    url: 'https://dev.to/',
    category: 'community',
    icon: Users,
    memberCount: '900K+'
  },
  {
    id: '9',
    title: 'Reddit - WebDev',
    description: 'Web development community on Reddit',
    url: 'https://www.reddit.com/r/webdev/',
    category: 'community',
    icon: MessageCircle,
    memberCount: '1M+'
  },
  {
    id: '10',
    title: 'Discord - React',
    description: 'Real-time chat community for React developers',
    url: 'https://discord.gg/react',
    category: 'community',
    icon: MessageCircle,
    memberCount: '180K+',
    isNew: true
  },

  // Learning Platforms
  {
    id: '11',
    title: 'freeCodeCamp',
    description: 'Free coding bootcamp with interactive lessons',
    url: 'https://www.freecodecamp.org/',
    category: 'learning',
    icon: Video,
    memberCount: '400K+'
  },
  {
    id: '12',
    title: 'MDN Web Docs',
    description: 'Comprehensive web development documentation',
    url: 'https://developer.mozilla.org/',
    category: 'learning',
    icon: BookOpen
  },
  {
    id: '13',
    title: 'JavaScript.info',
    description: 'Modern JavaScript tutorial from basics to advanced',
    url: 'https://javascript.info/',
    category: 'learning',
    icon: BookOpen
  },

  // Social & Code Sharing
  {
    id: '14',
    title: 'GitHub Explore',
    description: 'Discover trending repositories and developers',
    url: 'https://github.com/explore',
    category: 'social',
    icon: Github
  },
  {
    id: '15',
    title: 'CodePen',
    description: 'Social development environment for front-end designers and developers',
    url: 'https://codepen.io/',
    category: 'social',
    icon: Users,
    memberCount: '330K+'
  },
  {
    id: '16',
    title: 'Twitter Dev Community',
    description: 'Follow developers and stay updated with tech trends',
    url: 'https://twitter.com/i/lists/1234567890',
    category: 'social',
    icon: Twitter
  }
];

const categoryInfo = {
  documentation: {
    title: 'Documentation',
    description: 'Official docs and reference materials',
    color: 'blue'
  },
  news: {
    title: 'News & Updates',
    description: 'Stay current with the latest in tech',
    color: 'green'
  },
  community: {
    title: 'Community Forums',
    description: 'Connect with other developers',
    color: 'purple'
  },
  learning: {
    title: 'Learning Resources',
    description: 'Tutorials and educational content',
    color: 'orange'
  },
  social: {
    title: 'Social & Code Sharing',
    description: 'Share code and connect socially',
    color: 'pink'
  }
};

interface CommunityLinksProps {
  onClose: () => void;
}

export default function CommunityLinks({ onClose }: CommunityLinksProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Object.keys(categoryInfo);
  const filteredLinks = selectedCategory 
    ? mockCommunityLinks.filter(link => link.category === selectedCategory)
    : mockCommunityLinks;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Community & Resources
          </h2>
          <p className="text-muted-foreground">Stay connected and up-to-date with the developer community</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Back to Dashboard
        </Button>
      </div>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Browse by Category</CardTitle>
          <CardDescription>Filter resources by type to find what you need</CardDescription>
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
                {categoryInfo[category as keyof typeof categoryInfo].title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Links Grid */}
      <div className="space-y-8">
        {categories
          .filter(category => !selectedCategory || category === selectedCategory)
          .map((category) => {
            const links = mockCommunityLinks.filter(link => link.category === category);
            const info = categoryInfo[category as keyof typeof categoryInfo];
            
            return (
              <div key={category} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {info.title}
                    <Badge variant="secondary" className="text-xs">
                      {links.length} resources
                    </Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {links.map((link) => (
                    <Card key={link.id} className="hover:shadow-md transition-shadow group cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            <link.icon className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <div>
                              <CardTitle className="text-base flex items-center gap-2">
                                {link.title}
                                {link.isNew && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    New
                                  </Badge>
                                )}
                              </CardTitle>
                              <CardDescription className="text-sm mt-1">
                                {link.description}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          {link.memberCount && (
                            <div className="text-sm text-muted-foreground">
                              {link.memberCount} members
                            </div>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            asChild
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Visit
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Quick Actions */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Quick Connect</CardTitle>
          <CardDescription className="text-blue-700">
            Join our community channels for instant help and networking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm">
              <a href="https://discord.gg/example" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Discord
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/example" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Follow on GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-4 h-4 mr-2" />
                Follow on Twitter
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}