import { Request, Response, NextFunction } from 'express';

export const validateTool = (req: Request, res: Response, next: NextFunction): void => {
  const { name, description, category, link } = req.body;

  // Check required fields
  if (!name || !description || !category || !link) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields: name, description, category, link',
    });
    return;
  }

  // Validate name
  if (typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({
      success: false,
      message: 'Name must be a string with at least 2 characters',
    });
    return;
  }

  // Validate description
  if (typeof description !== 'string' || description.trim().length < 10) {
    res.status(400).json({
      success: false,
      message: 'Description must be a string with at least 10 characters',
    });
    return;
  }

  // Validate category
  const validCategories = ['Image', 'Text', 'Audio', 'Video', 'Code', 'Productivity'];
  if (!validCategories.includes(category)) {
    res.status(400).json({
      success: false,
      message: `Category must be one of: ${validCategories.join(', ')}`,
    });
    return;
  }

  // Validate link (basic URL validation)
  const urlPattern = /^https?:\/\/.+/;
  if (!urlPattern.test(link)) {
    res.status(400).json({
      success: false,
      message: 'Link must be a valid URL starting with http:// or https://',
    });
    return;
  }

  next();
};

export const validatePrompt = (req: Request, res: Response, next: NextFunction): void => {
  const { title, prompt, tool, category, difficulty } = req.body;

  // Check required fields
  if (!title || !prompt || !tool || !category || !difficulty) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields: title, prompt, tool, category, difficulty',
    });
    return;
  }

  // Validate difficulty
  const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
  if (!validDifficulties.includes(difficulty)) {
    res.status(400).json({
      success: false,
      message: `Difficulty must be one of: ${validDifficulties.join(', ')}`,
    });
    return;
  }

  next();
};

export const validateNews = (req: Request, res: Response, next: NextFunction): void => {
  const { title, content, source, category } = req.body;

  // Check required fields
  if (!title || !content || !source || !category) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields: title, content, source, category',
    });
    return;
  }

  next();
};

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password } = req.body;

  // Check required fields
  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields: name, email, password',
    });
    return;
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Please provide a valid email address',
    });
    return;
  }

  // Validate password
  if (password.length < 6) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long',
    });
    return;
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields: email, password',
    });
    return;
  }

  next();
};