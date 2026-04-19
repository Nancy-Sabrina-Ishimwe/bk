import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IProduct extends Document {
  owner: Types.ObjectId;
  name: string;
  description: string;
  image: string;
  category?: string;
  available_Products: number;
  price: number;
}

const productSchema = new Schema<IProduct>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },

    category: String,

    available_Products: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;