import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const errors = Object.values((error as any).errors).map((err: any) => err.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors,
    });
  }

  // Mongoose duplicate key error
  if ((error as any).code === 11000) {
    const field = Object.keys((error as any).keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Multer errors
  if (error.message.includes('File too large')) {
    return res.status(400).json({
      success: false,
      message: 'File size too large',
    });
  }

  if (error.message.includes('Only JSON and image files are allowed')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid file type. Only JSON and image files are allowed',
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
  });
};