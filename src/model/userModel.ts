import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'Admin',
  TECH = 'Tech',
  USER = 'User',
}

export enum UserStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  CANCELED = 'canceled',
  REJECTED = 'rejected',
}

export interface IUser extends Document {
  fname: string;
  lname: string;
  about?: string;
  history: string[];
  skills: string[];
  rating?: number;
  email: string;
  img: string;
  password: string;
  phone?: string;
  identity?: string;
  province?: string;
  district?: string;
  sector?: string;
  street?: string;
  status: UserStatus;
  role: UserRole;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    about: { type: String },
    history: [{ type: String }],
    skills: [{ type: String }],
    rating: { type: Number },
    email: { type: String, required: true, unique: true },
    img: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    password: { type: String, required: true },
    phone: { type: String },
    identity: { type: String },
    province: String,
    district: String,
    sector: String,
    street: String,
    status: {
      type: String,
      default: UserStatus.PENDING,
      enum: Object.values(UserStatus),
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);