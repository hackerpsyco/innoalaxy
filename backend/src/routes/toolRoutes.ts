import express from 'express';
import Tool from '../models/Tool';
import { auth, adminAuth } from '../middleware/auth';
import { validateTool } from '../middleware/validation';

const router = express.Router();

// GET /api/tools - Get all tools with filtering and pagination
router.get('/', async (req, res) => {
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
      query.$text = { $search: search as string };
    }

    // Execute query with pagination
    const tools = await Tool.find(query)
      .sort(sort as string)
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const total = await Tool.countDocuments(query);

    res.json({
      success: true,
      data: tools,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tools',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

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
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Tool not found',
      });
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
router.put('/:id', adminAuth, validateTool, async (req, res) => {
  try {
    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Tool not found',
      });
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
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);

    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Tool not found',
      });
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