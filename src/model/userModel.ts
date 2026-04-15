// userModel.ts
import mongoose, { Model, Schema, Document } from "mongoose";


export interface IUser extends Document {
  fname: string;
  lname: string;
  about?: string;
  history: string[];
  skills: string[];
  rating?: number;
  email: string;
  img?: string;
  password?: string;
  phone?: string;
  identity?: string;
  province?: string;
  district?: string;
  sector?: string;
  street?: string;
  status?: string;          // default "pending"
  role?: "Admin" | "Tech" | "User"; // enum
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Create the schema with proper TypeScript types
const userSchema = new Schema<IUser>(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    history: [
      {
        type: String,
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    identity: {
      type: String,
    },
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    sector: {
      type: String,
    },
    street: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    role: {
      type: String,
      enum: ["Admin", "Tech", "User"],
      default: "User",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 3. Create and export the model (prevents overwriting during hot reloads)
const User: Model<IUser> =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;