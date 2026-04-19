import mongoose, { Schema, Document, Model, Types } from "mongoose";
import orderItemSchema, { IOrderItem } from "./orderItemModel";

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalPrice: number;
  totalItems: number;
  status: "pending" | "completed" | "canceled";
  shippingAddress: string;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],

    totalPrice: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },

    shippingAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;