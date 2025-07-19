import { Request, Response, NextFunction } from 'express';

// Tool validation
export const validateTool = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, category, link, logo, rating } = req.body;

  const errors: string[] = [];

  if (!name || name.trim().length === 0) {
    errors.push('Tool name is required');
  }

  if (!description || description.trim().length === 0) {
    errors.push('Tool description is required');
  }

  if (!category || !['Image', 'Text', 'Audio', 'Video', 'Code', 'Productivity', 'Design', 'Analytics'].includes(category)) {
    errors.push('Valid category is required');
  }

  if (!link || !/^https?:\/\/.+/.test(link)) {
    errors.push('Valid tool link is required');
  }

  if (!logo || logo.trim().length === 0) {
    errors.push('Logo URL is required');
  }

  if (!rating || rating < 1 || rating > 5) {
    errors.push('Rating must be between 1 and 5');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

// News validation
export const validateNews = (req: Request, res: Response, next: NextFunction) => {
  const { title, summary, link, date, source, category } = req.body;

  const errors: string[] = [];

  if (!title || title.trim().length === 0) {
    errors.push('News title is required');
  }

  if (!summary || summary.trim().length === 0) {
    errors.push('News summary is required');
  }

  if (!link || !/^https?:\/\/.+/.test(link)) {
    errors.push('Valid news link is required');
  }

  if (!date || isNaN(Date.parse(date))) {
    errors.push('Valid date is required');
  }

  if (!source || source.trim().length === 0) {
    errors.push('News source is required');
  }

  if (!category || !['Product Launch', 'Research', 'Open Source', 'Video AI', 'AI Safety', 'Productivity', 'Hardware'].includes(category)) {
    errors.push('Valid category is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

// Prompt validation
export const validatePrompt = (req: Request, res: Response, next: NextFunction) => {
  const { title, content, tool, category, difficulty } = req.body;

  const errors: string[] = [];

  if (!title || title.trim().length === 0) {
    errors.push('Prompt title is required');
  }

  if (!content || content.trim().length === 0) {
    errors.push('Prompt content is required');
  }

  if (!tool || !['ChatGPT', 'Midjourney', 'Claude', 'DALL-E', 'Stable Diffusion', 'Other'].includes(tool)) {
    errors.push('Valid tool is required');
  }

  if (!category || !['Marketing', 'Design', 'Development', 'Social Media', 'Art', 'Data Science', 'Email Marketing', 'Copywriting', 'Documentation', 'Branding'].includes(category)) {
    errors.push('Valid category is required');
  }

  if (!difficulty || !['Beginner', 'Intermediate', 'Advanced'].includes(difficulty)) {
    errors.push('Valid difficulty level is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

// User validation
export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const errors: string[] = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

// Login validation
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const errors: string[] = [];

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  }

  if (!password || password.trim().length === 0) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};