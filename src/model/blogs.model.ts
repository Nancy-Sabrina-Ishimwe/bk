import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  category?: string;
  image?: string;
  creator?: Types.ObjectId;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: String,
    image: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;