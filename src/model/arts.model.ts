import mongoose, { Model, Schema, Document } from 'mongoose'

// Define the interface for the Art document
export interface IArt extends Document {
  owner: mongoose.Types.ObjectId
  name: string
  description: string
  image: string
  category?: string
  available_Products: number
  price: number
  createdAt?: Date
  updatedAt?: Date
}

// Define the schema with types
const artsSchema = new Schema<IArt>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    available_Products: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // optional, but recommended to track creation/updates
  }
)

// Create or retrieve the model with proper typing
const Arts: Model<IArt> = mongoose.models.arts || mongoose.model<IArt>('arts', artsSchema)

export default Arts