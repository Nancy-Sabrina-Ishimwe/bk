import mongoose, { Schema, Document, Model, Types } from "mongoose";

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
  status?: "pending" | "approved" | "rejected";
  role: "Admin" | "Tech" | "User";
  isAdmin?: boolean;
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
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },

    password: { type: String },
    phone: { type: String },
    identity: { type: String },

    province: String,
    district: String,
    sector: String,
    street: String,

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },

    role: {
      type: String,
      enum: ["Admin", "Tech", "User"],
      default: "User",
    },

    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;