import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

// Authentication middleware
export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await User.findById(decoded.userId).select('-password') as IUser;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Token is not valid.',
      });
      return;
    }

    req.user = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid.',
    });
  }
};

// Admin authentication middleware
export const adminAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // First run regular auth
    await auth(req, res, () => {});

    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Access denied. Admin rights required.',
      });
      return;
    }

    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin rights required.',
    });
  }
};

// Optional authentication middleware (for routes that work with or without auth)
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      const user = await User.findById(decoded.userId);
      
      if (user && user.isActive) {
        req.user = decoded;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};