import mongoose, { Model, Schema, Document, Types } from "mongoose";
import orderItemSchema, { IOrderItem } from "./orderItemModel";   

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalPrice: number;
  totalItems: number;
  status: "pending" | "completed" | "canceled";
  shippingAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;