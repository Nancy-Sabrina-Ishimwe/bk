// services/order.services.ts
import Cart, { ICart } from "../models/cart.model";
import Order, { IOrder } from "../models/order.model";
import Arts, { IArts } from "../models/arts.model";
import OrderPayment, { IOrderPayment } from "../models/orderPayment.model";
import mongoose, { Types } from "mongoose";
import User, { IUser } from "../models/user.models";

// Define the shape of the checkout parameters
interface CheckoutParams {
  cartId: string;
  shippingAddress: string;
  paymentMethod: string;
}

// Helper type for populated cart items (product populated)
interface PopulatedCartItem {
  product: IArts;
  quantity: number;
  price: number;
}

// Helper type for populated cart
interface PopulatedCart extends ICart {
  items: PopulatedCartItem[];
}

export const checkout = async (
  cartId: string,
  shippingAddress: string,
  paymentMethod: string
): Promise<IOrder> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = (await Cart.findById(cartId)
      .populate("items.product")
      .session(session)) as PopulatedCart | null;

    if (!cart) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Cart not found");
    }

    // Reduce available_Products for each product in the cart
    for (const item of cart.items) {
      const product = item.product;
      if (product.available_Products < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        throw new Error(`Not enough stock for ${product.name}`);
      }
      product.available_Products -= item.quantity;
      await product.save({ session });
    }

    const order = new Order({
      user: cart.user,
      items: cart.items,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
      shippingAddress: shippingAddress,
    });

    await order.save({ session });

    const payment = new OrderPayment({
      order: order._id,
      paymentMethod: paymentMethod,
      paymentStatus: "pending",
      amount: cart.totalPrice,
    });

    await payment.save({ session });

    // Update cart status to 'completed'
    cart.status = "completed";
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Get all orders for a specific user
export const getOrdersUserID = async (userId: string): Promise<IOrder[]> => {
  const orders = await Order.find({ user: userId })
    .populate("items.product")
    .populate("user");
  return orders;
};

// Get all orders (admin)
export const allOrder = async (): Promise<IOrder[]> => {
  const orders = await Order.find()
    .populate("items.product")
    .populate("user");
  return orders;
};

// Get a single order by ID
export const getOrder = async (orderId: string): Promise<IOrder> => {
  const order = await Order.findById(orderId)
    .populate("items.product")
    .populate("user");
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

// Get orders that contain products owned by a specific owner
export const getOrdersByOwner = async (ownerId: string): Promise<IOrder[]> => {
  // Find all products owned by the owner
  const products = await Arts.find({ owner: ownerId });
  // Get all product IDs owned by the owner
  const productIds = products.map((product) => product._id);
  // Find all orders that contain these products
  const orders = await Order.find({ "items.product": { $in: productIds } })
    .populate("items.product")
    .populate("user");
  if (!orders || orders.length === 0) {
    throw new Error("Orders not found");
  }
  return orders;
};

// Get unique users who bought products from a specific owner, plus the ordered products
export const getUsersByOwner = async (
  ownerId: string
): Promise<{ users: IUser[]; orderedProducts: IArts[] }> => {
  try {
    // Find all products owned by the owner
    const products = await Arts.find({ owner: ownerId });
    // Get all product IDs owned by the owner
    const productIds = products.map((product) => product._id);
    // Find all orders that contain these products
    const orders = await Order.find({ "items.product": { $in: productIds } }).populate("items.product");

    if (!orders || orders.length === 0) {
      throw new Error("Orders not found");
    }

    // Extract unique user IDs from orders
    const userIds = [...new Set(orders.map((order) => order.user.toString()))];

    // Populate user details
    const users = await User.find({ _id: { $in: userIds } });

    // Extract ordered products details
    const orderedProducts = orders.flatMap((order) =>
      order.items.map((item: any) => item.product)
    );

    return { users, orderedProducts };
  } catch (error) {
    console.error("Error retrieving users and products:", error);
    throw error;
  }
};