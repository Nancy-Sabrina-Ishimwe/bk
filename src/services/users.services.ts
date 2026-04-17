// services/users.services.ts
import User, { IUser } from "../model/userModel";
import bcrypt from "bcrypt";
import { uploadToCloud, CloudinaryResult } from "../helper/cloud";
import { sendResetEmail } from "../utils/emailTemplate";
import Code, { IResetCode } from "../model/resetcodeModel";
import { Types } from "mongoose";

// Types for function parameters
interface CreateUserData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role?: "Admin" | "Tech" | "User";
  // other optional fields can be added
}

interface UpdateUserData {
  fname?: string;
  lname?: string;
  email?: string;
  phone?: string;
  identity?: string;
  province?: string;
  district?: string;
  sector?: string;
  street?: string;
  password?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

// Service to find all users
export const findAllUsers = async (): Promise<IUser[]> => {
  return await User.find().sort({ createdAt: -1 });
};

// Service to find a single user by id
export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).sort({ createdAt: -1 });
};

// Service to create a new user
export const createUser = async (
  userData: CreateUserData,
  file?: Express.Multer.File
): Promise<IUser> => {
  const existing = await User.findOne({ email: userData.email });
  if (existing) {
    throw new Error("Email already exists");
  }

  let result: CloudinaryResult | undefined;
  if (file) result = await uploadToCloud(file);

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(userData.password, salt);

  const status = userData.role === "Tech" ? "pending" : "approved";

  return await User.create({
    fname: userData.fname,
    lname: userData.lname,
    email: userData.email,
    password: hashedPass,
    img: result?.secure_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    status: status,
    role: userData.role || "User",
  });
};

// Service to update an existing user
export const updateUserById = async (
  id: string,
  userData: UpdateUserData,
  file?: Express.Multer.File
): Promise<IUser | null> => {
  let result: CloudinaryResult | undefined;
  if (file) result = await uploadToCloud(file);

  const updateFields: any = {
    fname: userData.fname,
    lname: userData.lname,
    email: userData.email,
    phone: userData.phone,
    identity: userData.identity,
    province: userData.province,
    district: userData.district,
    sector: userData.sector,
    street: userData.street,
  };

  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(userData.password, salt);
    updateFields.password = hashedPass;
  }

  if (result?.secure_url) {
    updateFields.img = result.secure_url;
  }

  return await User.findByIdAndUpdate(id, updateFields, { new: true });
};

// Approve status change (for Tech role)
export const approveStatusChange = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  let newStatus: string;
  const newRole = "Tech";

  if (user.status === "pending") {
    newStatus = "approved";
  } else if (user.status === "approved") {
    newStatus = "canceled";
  } else if (user.status === "canceled") {
    newStatus = "pending";
  } else {
    throw new Error("Invalid status");
  }

  user.status = newStatus;
  user.role = newRole;
  await user.save();

  return user;
};

// Cancel request to become Tech
export const cancelTechRequest = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  let newStatus: string;
  const newRole = "User";

  if (user.status === "pending") {
    newStatus = "canceled";
  } else if (user.status === "approved") {
    newStatus = "pending";
  } else if (user.status === "canceled") {
    newStatus = "pending";
  } else {
    throw new Error("Invalid status");
  }

  user.status = newStatus;
  user.role = newRole;
  await user.save();

  return user;
};

// Approve admin status change
export const approveAdminStatusChange = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  let newStatus: string;
  const newRole = "Admin";
  const isAdmin = true;

  if (user.status === "pending") {
    newStatus = "approved";
  } else if (user.status === "approved") {
    newStatus = "canceled";
  } else if (user.status === "canceled") {
    newStatus = "pending";
  } else {
    throw new Error("Invalid status");
  }

  user.status = newStatus;
  user.role = newRole;
  user.isAdmin = isAdmin;
  await user.save();

  return user;
};

// Service to delete a user by id
export const deleteUserById = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

// Service to login a user
export const loginUser = async (userData: LoginData): Promise<IUser> => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};

// Service for forgot password
export const forgotPasswordService = async (userEmail: string): Promise<void> => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new Error("User not found");
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000);
  await Code.create({
    code: resetCode.toString(),
    user: user._id,
  });
  const link = `https://gb-group-kingdom.onrender.com/api/v1/users/reset-password`;
  sendResetEmail(user.email, user.fname, link, resetCode);
};

// Service to reset password
export const resetPasswordService = async (
  resetCode: string,
  password: string,
  confirmPassword: string
): Promise<void> => {
  const code = await Code.findOne({ code: resetCode });
  if (!code) {
    throw new Error("Invalid Code");
  }
  const userId = code.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (password !== confirmPassword) {
    throw new Error("Two passwords do not match");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  await User.findByIdAndUpdate(userId, { password: hashedPass });
  await Code.findByIdAndDelete(code._id);
};

// Service to change user password
export const changePassword = async (
  id: string,
  passData: ChangePasswordData
): Promise<void> => {
  const { current_password, new_password, confirm_password } = passData;
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  const passwordMatch = await bcrypt.compare(current_password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid Password");
  }
  if (new_password !== confirm_password) {
    throw new Error("Two Passwords do not match");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(new_password, salt);
  await User.findByIdAndUpdate(id, { password: hashedPassword });
};