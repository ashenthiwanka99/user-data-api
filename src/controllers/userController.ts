import { Request, Response } from 'express';
import userService from '../services/userService';
import cacheService from '../services/cacheService';

export const getUser = async (req: Request, res: Response) => {
  const startTime = Date.now();
  
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({
        error: 'Invalid user ID',
        message: 'User ID must be a number'
      });
    }

    const user = await userService.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: `User with ID ${userId} does not exist`
      });
    }

    const responseTime = Date.now() - startTime;
    cacheService.addResponseTime(responseTime);

    res.json({
      data: user,
      cached: cacheService.get(`user:${userId}`) !== undefined,
      responseTime: responseTime
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch user'
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Name and email are required'
      });
    }

    const user = await userService.createUser(name, email);
    
    res.status(201).json({
      data: user,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create user'
    });
  }
};

export const clearCache = (req: Request, res: Response) => {
  cacheService.clear();
  res.json({
    message: 'Cache cleared successfully'
  });
};

export const getCacheStatus = (req: Request, res: Response) => {
  const stats = cacheService.getStats();
  res.json({
    cacheStats: stats,
    timestamp: new Date().toISOString()
  });
};