// orderItemSchema.ts
import mongoose, { Schema, Document, Types } from "mongoose";

// 1. Interface for an Order Item (sub‑document)
export interface IOrderItem {
  product: Types.ObjectId;    // reference to an "arts" document
  quantity: number;           // minimum 1
  price: number;              // price at time of order
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Schema definition (typed)
const orderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "arts",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default orderItemSchema;