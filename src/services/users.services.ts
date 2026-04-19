import { User, IUser, UserRole, UserStatus } from '../model/userModel';
import bcrypt from 'bcrypt';
import { uploadToCloud, CloudinaryResult } from '../helper/cloud';
import { sendResetEmail } from '../utils/emailTemplate';
import Code from '../model/resetcodeModel';
import { AppError } from '../utils/AppError';
import {
  CreateUserInput,
  UpdateUserInput,
  LoginInput,
  ChangePasswordInput,
} from '../validations/users.validation';
import { Types } from 'mongoose';

export const findAllUsers = async (): Promise<IUser[]> => {
  return await User.find().sort({ createdAt: -1 });
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid user ID', 400);
  }
  return await User.findById(id);
};

export const createUser = async (
  userData: CreateUserInput,
  file?: Express.Multer.File
): Promise<IUser> => {
  const existing = await User.findOne({ email: userData.email });
  if (existing) {
    throw new AppError('Email already exists', 400);
  }

  let cloudResult: CloudinaryResult | undefined;
  if (file) {
    cloudResult = await uploadToCloud(file);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const status =
    userData.role === UserRole.TECH ? UserStatus.PENDING : UserStatus.APPROVED;

  return await User.create({
    fname: userData.fname,
    lname: userData.lname,
    email: userData.email,
    password: hashedPassword,
    img: cloudResult?.secure_url,
    status,
    role: userData.role || UserRole.USER,
  });
};

export const updateUserById = async (
  id: string,
  userData: UpdateUserInput,
  file?: Express.Multer.File
): Promise<IUser | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid user ID', 400);
  }

  let cloudResult: CloudinaryResult | undefined;
  if (file) {
    cloudResult = await uploadToCloud(file);
  }

  const updateFields: Partial<IUser> = {
    fname: userData.fname,
    lname: userData.lname,
    email: userData.email,
    phone: userData.phone,
    identity: userData.identity,
    province: userData.province,
    district: userData.district,
    sector: userData.sector,
    street: userData.street,
    about: userData.about,
    history: userData.history ? [userData.history] : undefined,
    skills: userData.skills ? [userData.skills] : undefined,
    rating: userData.rating ? Number(userData.rating) : undefined,
  };

  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    updateFields.password = await bcrypt.hash(userData.password, salt);
  }

  if (cloudResult?.secure_url) {
    updateFields.img = cloudResult.secure_url;
  }

  return await User.findByIdAndUpdate(id, updateFields, { new: true });
};

export const approveStatusChange = async (id: string): Promise<IUser> => {
  const user = await findUserById(id);
  if (!user) throw new AppError('User not found', 404);

  let newStatus: UserStatus;
  if (user.status === UserStatus.PENDING) newStatus = UserStatus.APPROVED;
  else if (user.status === UserStatus.APPROVED) newStatus = UserStatus.CANCELED;
  else if (user.status === UserStatus.CANCELED) newStatus = UserStatus.PENDING;
  else throw new AppError('Invalid status transition', 400);

  user.status = newStatus;
  user.role = UserRole.TECH;
  await user.save();
  return user;
};

export const approveAdminStatusChange = async (id: string): Promise<IUser> => {
  const user = await findUserById(id);
  if (!user) throw new AppError('User not found', 404);

  let newStatus: UserStatus;
  if (user.status === UserStatus.PENDING) newStatus = UserStatus.APPROVED;
  else if (user.status === UserStatus.APPROVED) newStatus = UserStatus.CANCELED;
  else if (user.status === UserStatus.CANCELED) newStatus = UserStatus.PENDING;
  else throw new AppError('Invalid status transition', 400);

  user.status = newStatus;
  user.role = UserRole.ADMIN;
  user.isAdmin = true;
  await user.save();
  return user;
};

export const deleteUserById = async (id: string): Promise<IUser | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid user ID', 400);
  }
  return await User.findByIdAndDelete(id);
};

export const loginUser = async (loginData: LoginInput): Promise<IUser> => {
  const user = await User.findOne({ email: loginData.email });
  if (!user) throw new AppError('Invalid email or password', 401);

  const isMatch = await bcrypt.compare(loginData.password, user.password);
  if (!isMatch) throw new AppError('Invalid email or password', 401);

  return user;
};

export const forgotPasswordService = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError('User not found', 404);

  const resetCode = Math.floor(100000 + Math.random() * 900000);
  await Code.create({ code: resetCode.toString(), user: user._id });
  const link = 'https://gb-group-kingdom.onrender.com/api/v1/users/reset-password';
  sendResetEmail(user.email, user.fname, link, resetCode);
};

export const resetPasswordService = async (
  code: string,
  password: string,
  confirmPassword: string
): Promise<void> => {
  if (password !== confirmPassword) {
    throw new AppError('Passwords do not match', 400);
  }

  const resetCodeDoc = await Code.findOne({ code });
  if (!resetCodeDoc) throw new AppError('Invalid or expired code', 400);

  const user = await User.findById(resetCodeDoc.user);
  if (!user) throw new AppError('User not found', 404);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.findByIdAndUpdate(user._id, { password: hashedPassword });
  await Code.findByIdAndDelete(resetCodeDoc._id);
};

export const changePassword = async (
  userId: string,
  passData: ChangePasswordInput
): Promise<void> => {
  const { current_password, new_password, confirm_password } = passData;
  const user = await findUserById(userId);
  if (!user) throw new AppError('User not found', 404);

  const isMatch = await bcrypt.compare(current_password, user.password);
  if (!isMatch) throw new AppError('Current password is incorrect', 401);

  if (new_password !== confirm_password) {
    throw new AppError('New passwords do not match', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(new_password, salt);
  await User.findByIdAndUpdate(userId, { password: hashedPassword });
};