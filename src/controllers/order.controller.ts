// order.controller.ts
import { Request, Response } from "express";
import * as orderService from "../services/order.services";
import { sendEmailPersonBookedArts } from "../utils/emailTemplate";

// Extend Express Request type to include User (already defined in authMiddleware)
// If not globally available, you can redeclare:
interface AuthRequest extends Request {
  User?: {
    _id: string;
    email: string;
    name: string;
    role?: string;
    [key: string]: any;
  };
}

export const checkoutOrder = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { cartId } = req.params;
    const { email, name } = req.User || {};
    const { shippingAddress, paymentMethod } = req.body;

    if (!email || !name) {
      res.status(400).json({ message: "User information missing" });
      return;
    }

    const order = await orderService.checkout(
      cartId,
      shippingAddress,
      paymentMethod,
    );
    const orderDetails = {
      totalItems: order.totalItems,
      totalPrice: order.totalPrice,
    };
    sendEmailPersonBookedArts(email, name, orderDetails);

    res.status(200).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrder(orderId);
    res.status(200).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error: any) {
    console.error("Get order by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrdersByUser = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.User?._id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const orders = await orderService.getOrdersUserID(userId);
    res.status(200).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: any) {
    console.error("Get orders by user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await orderService.allOrder();
    res.status(200).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: any) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrdersByOwner = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const ownerId = req.User?._id;
    if (!ownerId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const orders = await orderService.getOrdersByOwner(ownerId);
    res.status(200).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: any) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCustomer = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const ownerId = req.User?._id;
    if (!ownerId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const customers = await orderService.getUsersByOwner(ownerId);
    res.status(200).json({
      message: "All Customers retrieved successfully",
      data: customers,
    });
  } catch (error: any) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
