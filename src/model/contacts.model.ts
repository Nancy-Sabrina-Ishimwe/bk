import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define a TypeScript interface
export interface IContact extends Document {
  names: string;
  email: string;
  subject?: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create the schema with types
const contactSchema: Schema<IContact> = new Schema(
  {
    names: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create the model with proper typing
const Contact: Model<IContact> =
  mongoose.models.contactus || mongoose.model<IContact>("contactus", contactSchema);

export default Contact;