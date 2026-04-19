// // cart.controller.ts
// import { Request, Response } from "express";
// import * as cartService from "../services/cart.services";

// // Extend Express Request to include User (from authMiddleware)
// interface AuthRequest extends Request {
//   User?: {
//     _id: string;
//     email?: string;
//     name?: string;
//     [key: string]: any;
//   };
// }

// export const addItem = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const { quantity } = req.body;
//     const { productId } = req.params;
//     const userId = req.User?._id;

//     if (!userId) {
//       res.status(401).json({ error: "Unauthorized" });
//       return;
//     }

//     const cart = await cartService.addItemToCart(userId, productId, quantity);
//     res.status(200).json(cart);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const removeItem = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const { productId } = req.params;
//     const userId = req.User?._id;

//     if (!userId) {
//       res.status(401).json({ error: "Unauthorized" });
//       return;
//     }

//     const cart = await cartService.removeItemFromCart(userId, productId);
//     res.status(200).json(cart);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const updateItem = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const { quantity } = req.body;
//     const { productId } = req.params;
//     const userId = req.User?._id;

//     if (!userId) {
//       res.status(401).json({ error: "Unauthorized" });
//       return;
//     }

//     const cart = await cartService.updateItemQuantity(userId, productId, quantity);
//     res.status(200).json(cart);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const userId = req.User?._id;

//     if (!userId) {
//       res.status(401).json({ error: "Unauthorized" });
//       return;
//     }

//     const cart = await cartService.getCart(userId);
//     res.status(200).json(cart);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const completeCart = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const userId = req.User?._id;

//     if (!userId) {
//       res.status(401).json({ error: "Unauthorized" });
//       return;
//     }

//     const cart = await cartService.completeCart(userId);
//     res.status(200).json(cart);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deleteCart = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const cart = await cartService.deleteCart(id);
//     res.status(200).json(cart);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };