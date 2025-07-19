import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Tool from '../models/Tool';
import News from '../models/News';
import Prompt from '../models/Prompt';
import { adminAuth } from '../middleware/auth';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
  },
  fileFilter: (req, file, cb) => {
    // Allow JSON files and images
    const allowedTypes = /json|jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only JSON and image files are allowed'));
    }
  }
});

// POST /api/upload/json - Upload and process JSON data files (Admin only)
router.post('/json', adminAuth, upload.single('jsonFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { dataType } = req.body; // 'tools', 'news', or 'prompts'

    if (!['tools', 'news', 'prompts'].includes(dataType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data type. Must be "tools", "news", or "prompts"',
      });
    }

    // Read and parse JSON file
    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    let results = {
      created: 0,
      updated: 0,
      errors: [] as string[],
    };

    // Process data based on type
    switch (dataType) {
      case 'tools':
        results = await processToolsData(jsonData);
        break;
      case 'news':
        results = await processNewsData(jsonData);
        break;
      case 'prompts':
        results = await processPromptsData(jsonData);
        break;
    }

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: `${dataType} data processed successfully`,
      data: results,
    });

  } catch (error) {
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(400).json({
      success: false,
      message: 'Error processing JSON file',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/upload/image - Upload image files (Admin only)
router.post('/image', adminAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image uploaded',
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: imageUrl,
      },
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error uploading image',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/upload/sample/:type - Get sample JSON structure
router.get('/sample/:type', adminAuth, (req, res) => {
  const { type } = req.params;

  const samples = {
    tools: [
      {
        name: "Sample AI Tool",
        description: "This is a sample AI tool description",
        category: "Text",
        features: ["Feature 1", "Feature 2", "Feature 3"],
        link: "https://example.com",
        logo: "https://example.com/logo.png",
        rating: 4.5,
        tags: ["AI", "Text", "Productivity"],
        isFeatured: false
      }
    ],
    news: [
      {
        title: "Sample AI News Title",
        summary: "This is a sample news summary",
        link: "https://example.com/news",
        date: "2024-01-20",
        source: "Sample Source",
        category: "Product Launch"
      }
    ],
    prompts: [
      {
        title: "Sample AI Prompt",
        content: "This is a sample prompt content for AI tools",
        tool: "ChatGPT",
        category: "Marketing",
        difficulty: "Beginner",
        tags: ["Marketing", "Content", "AI"],
        isDaily: false,
        usageCount: 0
      }
    ]
  };

  if (!samples[type as keyof typeof samples]) {
    return res.status(400).json({
      success: false,
      message: 'Invalid sample type. Must be "tools", "news", or "prompts"',
    });
  }

  res.json({
    success: true,
    data: samples[type as keyof typeof samples],
    message: `Sample ${type} JSON structure`,
  });
});

// Helper functions for processing different data types
async function processToolsData(data: any[]) {
  const results = { created: 0, updated: 0, errors: [] as string[] };

  for (const item of data) {
    try {
      const existingTool = await Tool.findOne({ name: item.name });
      
      if (existingTool) {
        await Tool.findByIdAndUpdate(existingTool._id, item);
        results.updated++;
      } else {
        await Tool.create(item);
        results.created++;
      }
    } catch (error) {
      results.errors.push(`Error processing tool "${item.name}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return results;
}

async function processNewsData(data: any[]) {
  const results = { created: 0, updated: 0, errors: [] as string[] };

  for (const item of data) {
    try {
      const existingNews = await News.findOne({ title: item.title });
      
      if (existingNews) {
        await News.findByIdAndUpdate(existingNews._id, item);
        results.updated++;
      } else {
        await News.create(item);
        results.created++;
      }
    } catch (error) {
      results.errors.push(`Error processing news "${item.title}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return results;
}

async function processPromptsData(data: any[]) {
  const results = { created: 0, updated: 0, errors: [] as string[] };

  for (const item of data) {
    try {
      const existingPrompt = await Prompt.findOne({ title: item.title });
      
      if (existingPrompt) {
        await Prompt.findByIdAndUpdate(existingPrompt._id, item);
        results.updated++;
      } else {
        await Prompt.create(item);
        results.created++;
      }
    } catch (error) {
      results.errors.push(`Error processing prompt "${item.title}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return results;
}

export default router;