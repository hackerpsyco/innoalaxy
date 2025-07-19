import { AIPrompt } from '@/types/AIPrompt';

export const aiPromptsData: AIPrompt[] = [
  {
    id: 1,
    title: 'Ultimate Content Strategy Generator',
    content: 'Act as a content marketing strategist. Create a comprehensive 30-day content calendar for [INDUSTRY/NICHE]. Include post types, optimal posting times, hashtag strategies, and engagement tactics. Focus on driving [SPECIFIC GOAL] while maintaining authentic brand voice.',
    tool: 'ChatGPT',
    category: 'Marketing',
    difficulty: 'Intermediate',
    tags: ['Content Strategy', 'Marketing', 'Social Media'],
    dateAdded: '2024-01-20',
    isDaily: true,
    usageCount: 1247
  },
  {
    id: 2,
    title: 'Photorealistic Product Showcase',
    content: 'Create a stunning product photography scene: [PRODUCT] elegantly displayed on a minimalist marble surface, soft natural lighting from the left, subtle shadows, professional studio quality, shot with 85mm lens, shallow depth of field, commercial photography style --ar 16:9 --v 6',
    tool: 'Midjourney',
    category: 'Design',
    difficulty: 'Beginner',
    tags: ['Product Photography', 'Commercial', 'Studio'],
    dateAdded: '2024-01-20',
    isDaily: true,
    usageCount: 892
  },
  {
    id: 3,
    title: 'Advanced Code Architecture Review',
    content: 'Analyze this codebase and provide a comprehensive architecture review. Identify potential bottlenecks, security vulnerabilities, scalability issues, and suggest modern design patterns. Include refactoring recommendations with before/after examples and performance impact estimates.',
    tool: 'Claude',
    category: 'Development',
    difficulty: 'Advanced',
    tags: ['Code Review', 'Architecture', 'Performance'],
    dateAdded: '2024-01-19',
    isDaily: true,
    usageCount: 634
  },
  {
    id: 4,
    title: 'Viral Social Media Hook Creator',
    content: 'Generate 10 scroll-stopping hooks for [TOPIC/INDUSTRY] that will make people stop scrolling and engage. Use psychological triggers like curiosity gaps, controversy, personal stories, and surprising statistics. Format for [PLATFORM] with optimal character counts.',
    tool: 'ChatGPT',
    category: 'Social Media',
    difficulty: 'Beginner',
    tags: ['Social Media', 'Engagement', 'Viral Content'],
    dateAdded: '2024-01-19',
    isDaily: true,
    usageCount: 1156
  },
  {
    id: 5,
    title: 'Fantasy Character Portrait Master',
    content: 'Epic fantasy character portrait: [CHARACTER DESCRIPTION], intricate armor details, mystical glowing eyes, dramatic lighting, painted by Greg Rutkowski and Alphonse Mucha, highly detailed, digital painting, artstation trending, concept art, sharp focus, illustration --ar 2:3 --v 6',
    tool: 'Midjourney',
    category: 'Art',
    difficulty: 'Intermediate',
    tags: ['Fantasy', 'Character Design', 'Digital Art'],
    dateAdded: '2024-01-18',
    isDaily: false,
    usageCount: 743
  },
  {
    id: 6,
    title: 'Data Analysis Automation Script',
    content: 'Create a Python script that automatically analyzes [DATA TYPE] and generates insights. Include data cleaning, statistical analysis, trend identification, and automated report generation with visualizations. Make it modular and reusable for different datasets.',
    tool: 'Claude',
    category: 'Data Science',
    difficulty: 'Advanced',
    tags: ['Python', 'Data Analysis', 'Automation'],
    dateAdded: '2024-01-18',
    isDaily: false,
    usageCount: 521
  },
  {
    id: 7,
    title: 'Email Sequence Conversion Optimizer',
    content: 'Design a 7-email welcome sequence for [BUSINESS TYPE] that converts subscribers into customers. Include subject lines, preview text, personalization strategies, and clear CTAs. Focus on building trust, providing value, and addressing common objections.',
    tool: 'ChatGPT',
    category: 'Email Marketing',
    difficulty: 'Intermediate',
    tags: ['Email Marketing', 'Conversion', 'Automation'],
    dateAdded: '2024-01-17',
    isDaily: false,
    usageCount: 967
  },
  {
    id: 8,
    title: 'Minimalist Logo Design Concept',
    content: 'Modern minimalist logo design for [COMPANY/BRAND]: clean geometric shapes, negative space utilization, monochromatic color scheme, scalable vector style, professional typography, memorable symbol, works in black and white, corporate identity --ar 1:1 --v 6',
    tool: 'Midjourney',
    category: 'Branding',
    difficulty: 'Beginner',
    tags: ['Logo Design', 'Minimalist', 'Branding'],
    dateAdded: '2024-01-17',
    isDaily: false,
    usageCount: 678
  },
  {
    id: 9,
    title: 'Advanced API Documentation Generator',
    content: 'Create comprehensive API documentation for [API NAME]. Include endpoint descriptions, request/response examples, authentication methods, error handling, rate limiting, and interactive examples. Make it developer-friendly with clear code samples in multiple languages.',
    tool: 'Claude',
    category: 'Documentation',
    difficulty: 'Advanced',
    tags: ['API', 'Documentation', 'Development'],
    dateAdded: '2024-01-16',
    isDaily: false,
    usageCount: 445
  },
  {
    id: 10,
    title: 'Persuasive Sales Page Copy',
    content: 'Write a high-converting sales page for [PRODUCT/SERVICE]. Include attention-grabbing headline, problem identification, solution presentation, social proof, objection handling, urgency creation, and compelling call-to-action. Use psychological triggers and persuasion principles.',
    tool: 'ChatGPT',
    category: 'Copywriting',
    difficulty: 'Intermediate',
    tags: ['Sales Copy', 'Conversion', 'Persuasion'],
    dateAdded: '2024-01-16',
    isDaily: false,
    usageCount: 834
  }
];