import Joi from 'joi';

export interface CreateUserInput {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserInput {
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  phone?: string;
  province?: string;
  district?: string;
  sector?: string;
  street?: string;
  about?: string;
  history?: string;
  identity?: string;
  skills?: string;
  rating?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
  confirmPassword: string;
  code: string;
}

export interface ChangePasswordInput {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

const createUserSchema = Joi.object<CreateUserInput>({
  fname: Joi.string().min(3).max(30).required(),
  lname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(50).required(),
  role: Joi.string().valid('Admin', 'Tech', 'User').optional(),
});

const updateUserSchema = Joi.object<UpdateUserInput>({
  fname: Joi.string().min(3).max(30).optional(),
  lname: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(3).max(50).optional(),
  phone: Joi.string().optional(),
  province: Joi.string().optional(),
  district: Joi.string().optional(),
  sector: Joi.string().optional(),
  street: Joi.string().optional(),
  about: Joi.string().optional(),
  history: Joi.string().optional(),
  identity: Joi.string().optional(),
  skills: Joi.string().optional(),
  rating: Joi.string().optional(),
});

const loginSchema = Joi.object<LoginInput>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object<ForgotPasswordInput>({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object<ResetPasswordInput>({
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  code: Joi.string().required(),
});

const changePasswordSchema = Joi.object<ChangePasswordInput>({
  current_password: Joi.string().required(),
  new_password: Joi.string().min(3).max(50).required(),
  confirm_password: Joi.string().required(),
});

export const validateCreateUser = (data: CreateUserInput) =>
  createUserSchema.validate(data);
export const validateUpdateUser = (data: UpdateUserInput) =>
  updateUserSchema.validate(data);
export const validateLogin = (data: LoginInput) => loginSchema.validate(data);
export const validateForgotPassword = (data: ForgotPasswordInput) =>
  forgotPasswordSchema.validate(data);
export const validateResetPassword = (data: ResetPasswordInput) =>
  resetPasswordSchema.validate(data);
export const validateChangePassword = (data: ChangePasswordInput) =>
  changePasswordSchema.validate(data);