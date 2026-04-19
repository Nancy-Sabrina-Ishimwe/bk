import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  names: string;
  email: string;
  subject?: string;
  message?: string;
}

const contactSchema = new Schema<IContact>(
  {
    names: { type: String, required: true },
    email: { type: String, required: true },
    subject: String,
    message: String,
  },
  { timestamps: true }
);

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;