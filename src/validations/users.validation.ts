// validations/users.validation.ts
import Joi from "joi";

// Interfaces for validation input (optional but helpful)
export interface CreateUserInput {
  fname: string;
  lname: string;
  email: string;
  password: string;
  img?: string;
  role?: string;
  status?: string;
  about?: string;
  history?: string;
  identity?: string;
  skills?: string;
  rating?: string;
}

export interface UpdateUserInput {
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  img?: string;
  role?: string;
  status?: string;
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

export interface LoginUserInput {
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

// Validation schema for creating a new user
const createUserSchema = Joi.object<CreateUserInput>({
  fname: Joi.string().min(3).max(30).required(),
  lname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3).max(50),
  img: Joi.string().optional(),
  role: Joi.string().optional(),
  status: Joi.string().optional(),
  about: Joi.string().optional(),
  history: Joi.string().optional(),
  identity: Joi.string().optional(),
  skills: Joi.string().optional(),
  rating: Joi.string().optional(),
});

// Validation schema for updating a user
const updateUserSchema = Joi.object<UpdateUserInput>({
  fname: Joi.string().min(3).max(30).optional(),
  lname: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(3).max(50).optional(),
  img: Joi.string().optional(),
  role: Joi.string().optional(),
  status: Joi.string().optional(),
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

// Validation schema for user login
const loginUserSchema = Joi.object<LoginUserInput>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validation schema for forgot password
const forgotPasswordSchema = Joi.object<ForgotPasswordInput>({
  email: Joi.string().email().required(),
});

// Validation schema for reset password
const resetPasswordSchema = Joi.object<ResetPasswordInput>({
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  code: Joi.string().required(),
});

// Function to validate user creation
export const validateCreateUser = (userData: CreateUserInput) => {
  return createUserSchema.validate(userData);
};

// Function to validate user update
export const validateUpdateUser = (userData: UpdateUserInput) => {
  return updateUserSchema.validate(userData);
};

// Function to validate user login
export const validateLoginUser = (userData: LoginUserInput) => {
  return loginUserSchema.validate(userData);
};

// Function to validate forgot password (expects an object with email)
export const validateForgotPassword = (data: ForgotPasswordInput) => {
  return forgotPasswordSchema.validate(data);
};

// Function to validate reset password
export const validateResetPassword = (userData: ResetPasswordInput) => {
  return resetPasswordSchema.validate(userData);
};