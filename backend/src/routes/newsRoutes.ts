import express from 'express';
import News from '../models/News';
import { adminAuth } from '../middleware/auth';
import { validateNews } from '../middleware/validation';

const router = express.Router();

// GET /api/news - Get all news with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      category,
      source,
      search,
      page = 1,
      limit = 20,
      sort = '-date'
    } = req.query;

    // Build query
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (source) {
      query.source = source;
    }
    
    if (search) {
      query.$text = { $search: search as string };
    }

    // Execute query with pagination
    const news = await News.find(query)
      .sort(sort as string)
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const total = await News.countDocuments(query);

    res.json({
      success: true,
      data: news,
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
      message: 'Error fetching news',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/news/latest - Get latest news (last 7 days)
router.get('/latest', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const news = await News.find({
      date: { $gte: sevenDaysAgo }
    })
      .sort('-date')
      .limit(10);

    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching latest news',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/news/sources - Get all news sources
router.get('/sources', async (req, res) => {
  try {
    const sources = await News.distinct('source');

    res.json({
      success: true,
      data: sources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news sources',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/news/:id - Get single news article
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found',
      });
    }

    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news article',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/news - Create new news article (Admin only)
router.post('/', adminAuth, validateNews, async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();

    res.status(201).json({
      success: true,
      data: news,
      message: 'News article created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating news article',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// PUT /api/news/:id - Update news article (Admin only)
router.put('/:id', adminAuth, validateNews, async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found',
      });
    }

    res.json({
      success: true,
      data: news,
      message: 'News article updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating news article',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// DELETE /api/news/:id - Delete news article (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found',
      });
    }

    res.json({
      success: true,
      message: 'News article deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting news article',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;