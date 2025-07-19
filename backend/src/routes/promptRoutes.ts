import express from 'express';
import Prompt from '../models/Prompt';
import { adminAuth } from '../middleware/auth';
import { validatePrompt } from '../middleware/validation';

const router = express.Router();

// GET /api/prompts - Get all prompts with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      tool,
      category,
      difficulty,
      search,
      page = 1,
      limit = 20,
      sort = '-usageCount'
    } = req.query;

    // Build query
    const query: any = {};
    
    if (tool && tool !== 'All') {
      query.tool = tool;
    }
    
    if (category) {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (search) {
      query.$text = { $search: search as string };
    }

    // Execute query with pagination
    const prompts = await Prompt.find(query)
      .sort(sort as string)
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const total = await Prompt.countDocuments(query);

    res.json({
      success: true,
      data: prompts,
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
      message: 'Error fetching prompts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/prompts/daily - Get daily rotating prompts
router.get('/daily', async (req, res) => {
  try {
    // Get daily prompts (marked as daily) or random selection
    let dailyPrompts = await Prompt.find({ isDaily: true })
      .sort('-usageCount')
      .limit(10);

    // If no daily prompts, get random popular prompts
    if (dailyPrompts.length === 0) {
      dailyPrompts = await Prompt.aggregate([
        { $sample: { size: 10 } },
        { $sort: { usageCount: -1 } }
      ]);
    }

    res.json({
      success: true,
      data: dailyPrompts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching daily prompts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/prompts/popular - Get most popular prompts
router.get('/popular', async (req, res) => {
  try {
    const prompts = await Prompt.find()
      .sort('-usageCount')
      .limit(20);

    res.json({
      success: true,
      data: prompts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular prompts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/prompts/tools - Get available tools
router.get('/tools', async (req, res) => {
  try {
    const tools = await Prompt.distinct('tool');

    res.json({
      success: true,
      data: tools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tools',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/prompts/:id - Get single prompt
router.get('/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    
    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: 'Prompt not found',
      });
    }

    res.json({
      success: true,
      data: prompt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching prompt',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/prompts/:id/use - Track prompt usage
router.post('/:id/use', async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $inc: { usageCount: 1 } },
      { new: true }
    );

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: 'Prompt not found',
      });
    }

    res.json({
      success: true,
      data: prompt,
      message: 'Usage tracked successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error tracking usage',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/prompts - Create new prompt (Admin only)
router.post('/', adminAuth, validatePrompt, async (req, res) => {
  try {
    const prompt = new Prompt(req.body);
    await prompt.save();

    res.status(201).json({
      success: true,
      data: prompt,
      message: 'Prompt created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating prompt',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// PUT /api/prompts/:id - Update prompt (Admin only)
router.put('/:id', adminAuth, validatePrompt, async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: 'Prompt not found',
      });
    }

    res.json({
      success: true,
      data: prompt,
      message: 'Prompt updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating prompt',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// PUT /api/prompts/daily/rotate - Rotate daily prompts (Admin only)
router.put('/daily/rotate', adminAuth, async (req, res) => {
  try {
    // Clear current daily prompts
    await Prompt.updateMany({ isDaily: true }, { isDaily: false });

    // Select new daily prompts (random selection from popular ones)
    const newDailyPrompts = await Prompt.aggregate([
      { $match: { usageCount: { $gte: 10 } } }, // Only popular prompts
      { $sample: { size: 10 } }
    ]);

    // Mark selected prompts as daily
    const promptIds = newDailyPrompts.map(p => p._id);
    await Prompt.updateMany(
      { _id: { $in: promptIds } },
      { isDaily: true }
    );

    res.json({
      success: true,
      message: 'Daily prompts rotated successfully',
      data: newDailyPrompts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error rotating daily prompts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// DELETE /api/prompts/:id - Delete prompt (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndDelete(req.params.id);

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: 'Prompt not found',
      });
    }

    res.json({
      success: true,
      message: 'Prompt deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting prompt',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;