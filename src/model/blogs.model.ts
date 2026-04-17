import mongoose, { Model, Schema, Document } from 'mongoose'

// Define the interface for the Post document
export interface IPost extends Document {
  title: string
  description: string
  category?: string
  image?: string
  creator?: mongoose.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}

// Define the schema with types
const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
)

// Create or retrieve the model with proper typing
const Posts: Model<IPost> = mongoose.models.posts || mongoose.model<IPost>('posts', postSchema)

export default Posts