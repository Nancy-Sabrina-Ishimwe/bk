// resetCodeModel.ts
import mongoose, { Model, Schema, Document, Types } from "mongoose";

// 1. Define interface for the ResetCode document
export interface IResetCode extends Document {
  code: string;                // 6-digit code
  user: Types.ObjectId;        // reference to User model
  expireAt: Date;              // with TTL index (expires after 15 minutes)
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Create the schema
const resetCodeSchema = new Schema<IResetCode>(
  {
    code: {
      type: String,
      required: true,
      length: 6,      /
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Usually a reset code must belong to a user
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "15m" }, // TTL index: document auto-removed after 15 minutes
    },
  },
  {
    timestamps: true,
  }
);


const Code: Model<IResetCode> =
  mongoose.models.resetCode || mongoose.model<IResetCode>("resetCode", resetCodeSchema);

export default Code;