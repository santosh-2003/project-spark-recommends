
export interface Project {
  id: string;
  title: string;
  description: string;
  domain: string;
  techStack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  estimatedTime: string;
  prerequisites: string[];
  learningOutcomes: string[];
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Website with React & Node.js',
    description: 'Build a full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
    domain: 'Web Development',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    difficulty: 'Intermediate',
    tags: ['full-stack', 'e-commerce', 'payment-integration'],
    estimatedTime: '4-6 weeks',
    prerequisites: ['JavaScript', 'React basics', 'Node.js fundamentals'],
    learningOutcomes: ['Full-stack development', 'Payment integration', 'Database design', 'User authentication']
  },
  {
    id: '2',
    title: 'Machine Learning Chatbot',
    description: 'Create an intelligent chatbot using natural language processing and machine learning algorithms.',
    domain: 'Artificial Intelligence',
    techStack: ['Python', 'TensorFlow', 'NLTK', 'Flask', 'Docker'],
    difficulty: 'Advanced',
    tags: ['machine-learning', 'nlp', 'chatbot'],
    estimatedTime: '6-8 weeks',
    prerequisites: ['Python', 'Machine Learning basics', 'Statistics'],
    learningOutcomes: ['NLP techniques', 'Deep learning', 'Model deployment', 'API development']
  },
  {
    id: '3',
    title: 'Personal Finance Tracker Mobile App',
    description: 'Develop a cross-platform mobile app for tracking personal expenses and financial goals using React Native.',
    domain: 'Mobile Development',
    techStack: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
    difficulty: 'Intermediate',
    tags: ['mobile-app', 'finance', 'data-visualization'],
    estimatedTime: '3-5 weeks',
    prerequisites: ['React', 'JavaScript', 'Mobile development basics'],
    learningOutcomes: ['Mobile app development', 'State management', 'Data visualization', 'Firebase integration']
  },
  {
    id: '4',
    title: 'IoT Smart Home System',
    description: 'Build a smart home automation system using Arduino, sensors, and a web dashboard for remote control.',
    domain: 'Internet of Things',
    techStack: ['Arduino', 'Raspberry Pi', 'MQTT', 'React', 'WebSockets'],
    difficulty: 'Advanced',
    tags: ['iot', 'hardware', 'automation'],
    estimatedTime: '8-10 weeks',
    prerequisites: ['Electronics basics', 'C++', 'Networking fundamentals'],
    learningOutcomes: ['IoT architecture', 'Hardware programming', 'Real-time communication', 'System integration']
  },
  {
    id: '5',
    title: 'Data Visualization Dashboard',
    description: 'Create an interactive dashboard for data analysis and visualization using modern web technologies.',
    domain: 'Data Science',
    techStack: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'PostgreSQL'],
    difficulty: 'Beginner',
    tags: ['data-visualization', 'dashboard', 'analytics'],
    estimatedTime: '2-3 weeks',
    prerequisites: ['Python basics', 'Data analysis fundamentals'],
    learningOutcomes: ['Data visualization', 'Dashboard design', 'Database queries', 'Statistical analysis']
  },
  {
    id: '6',
    title: 'Blockchain Voting System',
    description: 'Develop a secure and transparent voting system using blockchain technology and smart contracts.',
    domain: 'Blockchain',
    techStack: ['Solidity', 'Ethereum', 'Web3.js', 'React', 'Truffle'],
    difficulty: 'Advanced',
    tags: ['blockchain', 'smart-contracts', 'voting'],
    estimatedTime: '6-8 weeks',
    prerequisites: ['Blockchain basics', 'JavaScript', 'Cryptography fundamentals'],
    learningOutcomes: ['Smart contract development', 'DApp creation', 'Security principles', 'Blockchain deployment']
  },
  {
    id: '7',
    title: 'Task Management PWA',
    description: 'Build a Progressive Web App for task management with offline capabilities and push notifications.',
    domain: 'Web Development',
    techStack: ['React', 'PWA', 'Service Workers', 'IndexedDB', 'Push API'],
    difficulty: 'Intermediate',
    tags: ['pwa', 'offline-first', 'task-management'],
    estimatedTime: '3-4 weeks',
    prerequisites: ['React', 'JavaScript ES6+', 'Web APIs'],
    learningOutcomes: ['PWA development', 'Offline functionality', 'Push notifications', 'Modern web APIs']
  },
  {
    id: '8',
    title: 'Computer Vision Image Classifier',
    description: 'Train a deep learning model to classify images using convolutional neural networks.',
    domain: 'Artificial Intelligence',
    techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Jupyter'],
    difficulty: 'Intermediate',
    tags: ['computer-vision', 'deep-learning', 'image-classification'],
    estimatedTime: '4-5 weeks',
    prerequisites: ['Python', 'Machine Learning basics', 'Linear Algebra'],
    learningOutcomes: ['CNN architecture', 'Image preprocessing', 'Model training', 'Transfer learning']
  }
];

export const getDomains = () => {
  return Array.from(new Set(mockProjects.map(project => project.domain)));
};

export const getTechStacks = () => {
  return Array.from(new Set(mockProjects.flatMap(project => project.techStack)));
};

export const getDifficulties = () => {
  return ['Beginner', 'Intermediate', 'Advanced'];
};

export const getTags = () => {
  return Array.from(new Set(mockProjects.flatMap(project => project.tags)));
};
