
import { Project, mockProjects } from '@/data/mockProjects';

interface User {
  interests?: string[];
  skills?: string[];
  academicBackground?: {
    branch?: string;
    semester?: string;
    university?: string;
  };
}

export const getRecommendedProjects = (user: User | null, limit: number = 6): Project[] => {
  if (!user || !user.interests || user.interests.length === 0) {
    // Return random projects if no user interests
    const shuffled = [...mockProjects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }

  const scoredProjects = mockProjects.map(project => {
    let score = 0;
    
    // Score based on domain matching user interests
    if (user.interests?.includes(project.domain)) {
      score += 50; // High weight for domain match
    }
    
    // Score based on tech stack matching user skills
    if (user.skills) {
      const matchingSkills = project.techStack.filter(tech => 
        user.skills?.some(skill => 
          skill.toLowerCase().includes(tech.toLowerCase()) ||
          tech.toLowerCase().includes(skill.toLowerCase())
        )
      );
      score += matchingSkills.length * 20; // 20 points per matching skill
    }
    
    // Score based on tags matching interests
    if (user.interests) {
      const matchingTags = project.tags.filter(tag =>
        user.interests?.some(interest =>
          interest.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(interest.toLowerCase())
        )
      );
      score += matchingTags.length * 15; // 15 points per matching tag
    }
    
    // Adjust score based on academic background
    if (user.academicBackground?.branch === 'Computer Science') {
      if (project.domain === 'Web Development' || project.domain === 'Artificial Intelligence') {
        score += 10;
      }
    }
    
    // Boost beginner projects for new users with fewer skills
    if (user.skills && user.skills.length < 3 && project.difficulty === 'Beginner') {
      score += 15;
    }
    
    // Boost advanced projects for experienced users
    if (user.skills && user.skills.length > 5 && project.difficulty === 'Advanced') {
      score += 10;
    }
    
    return { project, score };
  });
  
  // Sort by score (descending) and return top projects
  const sortedProjects = scoredProjects
    .sort((a, b) => b.score - a.score)
    .map(item => item.project);
    
  return sortedProjects.slice(0, limit);
};

export const getProjectRecommendationReason = (project: Project, user: User | null): string => {
  if (!user) return 'Popular project';
  
  const reasons = [];
  
  if (user.interests?.includes(project.domain)) {
    reasons.push(`matches your interest in ${project.domain}`);
  }
  
  if (user.skills) {
    const matchingSkills = project.techStack.filter(tech => 
      user.skills?.some(skill => 
        skill.toLowerCase().includes(tech.toLowerCase()) ||
        tech.toLowerCase().includes(skill.toLowerCase())
      )
    );
    if (matchingSkills.length > 0) {
      reasons.push(`uses ${matchingSkills.slice(0, 2).join(', ')} which you know`);
    }
  }
  
  if (reasons.length === 0) {
    return 'Recommended for you';
  }
  
  return `Recommended because it ${reasons.slice(0, 2).join(' and ')}`;
};
