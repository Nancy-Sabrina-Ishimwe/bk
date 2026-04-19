import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/users.services';
import generateToken from '../utils/generateToken';
import {
  sendEmailAdminApproveArts,
  sendEmailApproveArts,
  sendWelcomeEmailToAdmin,
} from '../utils/emailTemplate';
import {
  validateCreateUser,
  validateUpdateUser,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
} from '../validations/users.validation';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';

// Helper to safely extract string id from req.params
const getStringId = (id: string | string[]): string => {
  if (Array.isArray(id)) {
    throw new AppError('Invalid user ID format', 400);
  }
  return id;
};

// ==================== Existing functions ====================

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.findAllUsers();
    res.status(200).json({
      status: '200',
      message: 'Accounts retrieved successfully',
      data: users,
    });
  }
);

export const getOneUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = getStringId(req.params.id);
    const user = await userService.findUserById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    res.status(200).json({
      status: '200',
      message: 'Account retrieved successfully',
      data: user,
    });
  }
);

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = validateCreateUser(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }
    const user = await userService.createUser(value, req.file);
    res.status(201).json({
      status: '201',
      message: 'Account created successfully',
      data: user,
    });
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = validateUpdateUser(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }
    const id = getStringId(req.params.id);
    await userService.updateUserById(id, value, req.file);
    res.status(200).json({
      status: '200',
      message: 'Account updated successfully',
    });
  }
);

export const approveStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = getStringId(req.params.id);
    const user = await userService.approveStatusChange(id);
    sendEmailApproveArts(user.email, user.fname, user.role, user.updatedAt);
    res.status(200).json({
      status: '200',
      message: `Account status changed to ${user.status}`,
      user,
    });
  }
);

export const approveAdminStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = getStringId(req.params.id);
    const user = await userService.approveAdminStatusChange(id);
    sendEmailAdminApproveArts(user.email, user.fname, user.updatedAt);
    res.status(200).json({
      status: '200',
      message: `Account status changed to ${user.status}`,
      user,
    });
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = getStringId(req.params.id);
    await userService.deleteUserById(id);
    res.status(200).json({
      status: '200',
      message: 'Account deleted successfully',
    });
  }
);

// ==================== New authentication functions ====================

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = validateLogin(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }
    const user = await userService.loginUser(value);
    const token = generateToken(user._id.toString()); // Convert ObjectId to string
    sendWelcomeEmailToAdmin(value.email, user.fname);
    res.status(200).json({
      status: '200',
      message: 'Logged in successfully',
      data: user,
      token,
    });
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = validateForgotPassword(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }
    await userService.forgotPasswordService(value.email);
    res.status(200).json({
      status: '200',
      message: 'We sent you a code to reset your password via email',
    });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = validateResetPassword(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }
    await userService.resetPasswordService(
      value.code,
      value.password,
      value.confirmPassword
    );
    res.status(200).json({
      status: '200',
      message: 'Password changed! You can now login with your new password',
    });
  }
);

// In users.controller.ts, update changePassword to:
export const changePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = validateChangePassword(req.body);
    if (error) throw new AppError(error.details[0].message, 400);
    const userId = (req as any).user.id;
    await userService.changePassword(userId, value);
    res.status(200).json({ status: '200', message: 'Password updated successfully' });
  }
);