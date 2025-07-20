import express from 'express';
import Tool from '../models/Tool';
import { auth, adminAuth } from '../middleware/auth';
import { validateTool } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

// Fallback data for when database is not available
const fallbackTools = [
  {
    id: 1,
    name: 'DALL-E 3',
    description: 'Advanced AI image generator that creates stunning, photorealistic images from text descriptions.',
    category: 'Image',
    features: ['Generate high-quality images from text', 'Multiple art styles', 'Commercial usage rights'],
    link: 'https://openai.com/dall-e-3',
    logo: 'https://via.placeholder.com/200x200?text=DALL-E',
    rating: 5,
    tags: ['AI Art', 'Image Generation', 'Creative', 'OpenAI'],
    isFeatured: true,
    dateAdded: '2024-01-15'
  },
  {
    id: 2,
    name: 'ChatGPT',
    description: 'Revolutionary conversational AI for writing, coding, and creative tasks.',
    category: 'Text',
    features: ['Natural language conversation', 'Code generation', 'Writing assistance'],
    link: 'https://chat.openai.com',
    logo: 'https://via.placeholder.com/200x200?text=ChatGPT',
    rating: 5,
    tags: ['Conversational AI', 'Writing', 'Coding', 'Analysis'],
    isFeatured: true,
    dateAdded: '2024-01-10'
  }
];

// GET /api/tools - Get all tools with filtering and pagination
router.get('/', asyncHandler(async (req: express.Request, res: express.Response) => {
  try {
    const {
      category,
      featured,
      search,
      page = 1,
      limit = 20,
      sort = '-rating'
    } = req.query;

    // Build query
    const query: any = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    // Try to get tools from database
    let tools, total;
    try {
      tools = await Tool.find(query)
        .sort(sort as string)
        .limit(Number(limit) * 1)
        .skip((Number(page) - 1) * Number(limit))
        .exec();

      total = await Tool.countDocuments(query);
    } catch (dbError) {
      console.log('Database not available, using fallback data');
      // Filter fallback data based on query
      let filteredTools = fallbackTools;
      
      if (category && category !== 'All') {
        filteredTools = filteredTools.filter(tool => tool.category === category);
      }
      
      if (featured === 'true') {
        filteredTools = filteredTools.filter(tool => tool.isFeatured);
      }
      
      if (search) {
        const searchLower = (search as string).toLowerCase();
        filteredTools = filteredTools.filter(tool => 
          tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      tools = filteredTools;
      total = filteredTools.length;
    }

    res.json({
      success: true,
      data: tools,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error in tools route:', error);
    res.json({
      success: true,
      data: fallbackTools,
      pagination: {
        page: 1,
        limit: 20,
        total: fallbackTools.length,
        pages: 1
      },
      fallback: true
    });
  }
}));

// GET /api/tools/featured - Get featured tools
router.get('/featured', async (req, res) => {
  try {
    const tools = await Tool.find({ isFeatured: true })
      .sort('-rating')
      .limit(10);

    res.json({
      success: true,
      data: tools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured tools',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/tools/categories - Get all categories with counts
router.get('/categories', async (req, res) => {
  try {
    const categories = await Tool.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/tools/:id - Get single tool
router.get('/:id', async (req, res): Promise<void> => {
  try {
    const tool = await Tool.findById(req.params.id);
    
    if (!tool) {
      res.status(404).json({
        success: false,
        message: 'Tool not found',
      });
      return;
    }

    res.json({
      success: true,
      data: tool,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tool',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/tools - Create new tool (Admin only)
router.post('/', adminAuth, validateTool, async (req, res) => {
  try {
    const tool = new Tool(req.body);
    await tool.save();

    res.status(201).json({
      success: true,
      data: tool,
      message: 'Tool created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating tool',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// PUT /api/tools/:id - Update tool (Admin only)
router.put('/:id', adminAuth, validateTool, async (req, res): Promise<void> => {
  try {
    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tool) {
      res.status(404).json({
        success: false,
        message: 'Tool not found',
      });
      return;
    }

    res.json({
      success: true,
      data: tool,
      message: 'Tool updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating tool',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// DELETE /api/tools/:id - Delete tool (Admin only)
router.delete('/:id', adminAuth, async (req, res): Promise<void> => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);

    if (!tool) {
      res.status(404).json({
        success: false,
        message: 'Tool not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Tool deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting tool',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;