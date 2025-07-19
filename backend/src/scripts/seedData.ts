import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tool from '../models/Tool';
import { connectDB } from '../config/database';

// Load environment variables
dotenv.config();

const sampleTools = [
  {
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
  },
  {
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
  },
  {
    name: 'Midjourney',
    description: 'Artistic AI image generator known for creating beautiful, surreal, and highly detailed artwork with unique aesthetic styles.',
    category: 'Image',
    features: [
      'Artistic image generation',
      'Unique aesthetic styles',
      'High-quality outputs',
      'Discord integration',
      'Community gallery'
    ],
    link: 'https://midjourney.com',
    logo: 'https://images.pexels.com/photos/8386421/pexels-photo-8386421.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 5,
    tags: ['AI Art', 'Artistic', 'Creative', 'Discord'],
    isFeatured: true,
  },
  {
    name: 'GitHub Copilot',
    description: 'AI-powered code completion tool that suggests code and entire functions in real-time as you type.',
    category: 'Code',
    features: [
      'Real-time code suggestions',
      'Multi-language support',
      'Context-aware completions',
      'IDE integration',
      'Code explanation'
    ],
    link: 'https://github.com/features/copilot',
    logo: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Coding', 'Productivity', 'IDE', 'GitHub'],
    isFeatured: true,
  },
  {
    name: 'Stable Diffusion',
    description: 'Open-source AI image generation model that creates detailed images from text descriptions.',
    category: 'Image',
    features: [
      'Open-source model',
      'Local installation option',
      'High-quality images',
      'Customizable parameters',
      'Free to use'
    ],
    link: 'https://stability.ai/stable-diffusion',
    logo: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
    rating: 4,
    tags: ['Open Source', 'Image Generation', 'AI Art', 'Free'],
    isFeatured: false,
  }
];

export const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    // Clear existing tools
    await Tool.deleteMany({});
    console.log('Cleared existing tools');

    // Insert sample tools
    const insertedTools = await Tool.insertMany(sampleTools);
    console.log(`Inserted ${insertedTools.length} sample tools`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase();
}