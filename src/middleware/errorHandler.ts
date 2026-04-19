import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode.toString(),
      message: err.message,
    });
  }

  console.error('Unhandled error:', err);
  return res.status(500).json({
    status: '500',
    message: 'Internal server error',
  });
};