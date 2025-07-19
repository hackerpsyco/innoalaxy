import { AITool } from '@/types/AITool';

export const aiToolsData: AITool[] = [
  {
    id: 1,
    name: 'DALL-E 3',
    description: 'Advanced AI image generator that creates stunning, photorealistic images from text descriptions with incredible detail and creativity.',
    category: 'Image',
    features: [
      'Generate high-quality images from text',
      'Multiple art styles and formats',
      'Commercial usage rights',
      'High resolution outputs',
      'Advanced prompt understanding'
    ],
    link: 'https://openai.com/dall-e-3',
    logo: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 5,
    tags: ['AI Art', 'Image Generation', 'Creative', 'OpenAI'],
    isFeatured: true,
    dateAdded: '2024-01-15'
  },
  {
    id: 2,
    name: 'ChatGPT',
    description: 'Revolutionary conversational AI that can help with writing, coding, analysis, and creative tasks through natural language interaction.',
    category: 'Text',
    features: [
      'Natural language conversation',
      'Code generation and debugging',
      'Writing assistance',
      'Data analysis',
      'Creative brainstorming'
    ],
    link: 'https://chat.openai.com',
    logo: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 5,
    tags: ['Conversational AI', 'Writing', 'Coding', 'Analysis'],
    isFeatured: true,
    dateAdded: '2024-01-10'
  },
  {
    id: 3,
    name: 'Midjourney',
    description: 'Artistic AI image generator known for creating beautiful, surreal, and highly detailed artwork with unique aesthetic styles.',
    category: 'Image',
    features: [
      'Artistic image generation',
      'Unique aesthetic styles',
      'High-quality outputs',
      'Community gallery',
      'Style variations'
    ],
    link: 'https://midjourney.com',
    logo: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 5,
    tags: ['AI Art', 'Creative', 'Digital Art', 'Discord'],
    isFeatured: true,
    dateAdded: '2024-01-12'
  },
  {
    id: 4,
    name: 'GitHub Copilot',
    description: 'AI-powered code completion tool that helps developers write code faster with intelligent suggestions and auto-completion.',
    category: 'Code',
    features: [
      'Code auto-completion',
      'Multi-language support',
      'Context-aware suggestions',
      'IDE integration',
      'Code explanation'
    ],
    link: 'https://github.com/features/copilot',
    logo: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Code Assistant', 'Programming', 'GitHub', 'IDE'],
    isFeatured: false,
    dateAdded: '2024-01-08'
  },
  {
    id: 5,
    name: 'ElevenLabs',
    description: 'Advanced AI voice synthesis platform that creates realistic speech from text with natural intonation and emotion.',
    category: 'Audio',
    features: [
      'Realistic voice synthesis',
      'Voice cloning',
      'Multiple languages',
      'Emotion control',
      'API integration'
    ],
    link: 'https://elevenlabs.io',
    logo: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Voice AI', 'Text-to-Speech', 'Audio', 'Voice Cloning'],
    isFeatured: false,
    dateAdded: '2024-01-14'
  },
  {
    id: 6,
    name: 'Runway ML',
    description: 'Creative AI platform offering video editing, image generation, and multimedia content creation tools for creators.',
    category: 'Video',
    features: [
      'AI video editing',
      'Green screen removal',
      'Object tracking',
      'Style transfer',
      'Motion capture'
    ],
    link: 'https://runwayml.com',
    logo: 'https://images.pexels.com/photos/7688468/pexels-photo-7688468.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Video AI', 'Creative', 'Editing', 'Multimedia'],
    isFeatured: true,
    dateAdded: '2024-01-11'
  },
  {
    id: 7,
    name: 'Notion AI',
    description: 'Integrated AI writing assistant within Notion that helps with content creation, summarization, and productivity tasks.',
    category: 'Productivity',
    features: [
      'Writing assistance',
      'Content summarization',
      'Task automation',
      'Note organization',
      'Workflow optimization'
    ],
    link: 'https://notion.so/product/ai',
    logo: 'https://images.pexels.com/photos/7688354/pexels-photo-7688354.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Productivity', 'Writing', 'Organization', 'Workflow'],
    isFeatured: false,
    dateAdded: '2024-01-09'
  },
  {
    id: 8,
    name: 'Stable Diffusion',
    description: 'Open-source AI image generator that creates high-quality images from text prompts with customizable parameters.',
    category: 'Image',
    features: [
      'Open-source model',
      'High-quality image generation',
      'Customizable parameters',
      'Local deployment',
      'Community models'
    ],
    link: 'https://stability.ai/stable-diffusion',
    logo: 'https://images.pexels.com/photos/8386427/pexels-photo-8386427.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Open Source', 'Image Generation', 'AI Art', 'Customizable'],
    isFeatured: false,
    dateAdded: '2024-01-13'
  },
  {
    id: 9,
    name: 'Grammarly',
    description: 'AI-powered writing assistant that checks grammar, spelling, style, and tone to improve your writing quality.',
    category: 'Text',
    features: [
      'Grammar checking',
      'Style suggestions',
      'Tone analysis',
      'Plagiarism detection',
      'Writing insights'
    ],
    link: 'https://grammarly.com',
    logo: 'https://images.pexels.com/photos/7688344/pexels-photo-7688344.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Writing Assistant', 'Grammar', 'Editing', 'Productivity'],
    isFeatured: false,
    dateAdded: '2024-01-07'
  },
  {
    id: 10,
    name: 'Descript',
    description: 'All-in-one audio and video editing platform with AI-powered transcription, voice cloning, and editing features.',
    category: 'Audio',
    features: [
      'Audio transcription',
      'Voice cloning',
      'Overdub technology',
      'Multi-track editing',
      'Collaboration tools'
    ],
    link: 'https://descript.com',
    logo: 'https://images.pexels.com/photos/7688414/pexels-photo-7688414.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Audio Editing', 'Transcription', 'Voice AI', 'Collaboration'],
    isFeatured: false,
    dateAdded: '2024-01-06'
  },
  {
    id: 11,
    name: 'Jasper AI',
    description: 'AI content creation platform designed for marketers and businesses to generate high-quality marketing copy and content.',
    category: 'Text',
    features: [
      'Marketing copy generation',
      'Brand voice training',
      'Content templates',
      'SEO optimization',
      'Team collaboration'
    ],
    link: 'https://jasper.ai',
    logo: 'https://images.pexels.com/photos/7688319/pexels-photo-7688319.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Content Creation', 'Marketing', 'Copywriting', 'SEO'],
    isFeatured: false,
    dateAdded: '2024-01-05'
  },
  {
    id: 12,
    name: 'Figma AI',
    description: 'AI-enhanced design platform that streamlines the design process with intelligent suggestions and automated workflows.',
    category: 'Design',
    features: [
      'Design automation',
      'Smart suggestions',
      'Component generation',
      'Style consistency',
      'Collaborative design'
    ],
    link: 'https://figma.com',
    logo: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Design', 'UI/UX', 'Collaboration', 'Automation'],
    isFeatured: false,
    dateAdded: '2024-01-04'
  }
];