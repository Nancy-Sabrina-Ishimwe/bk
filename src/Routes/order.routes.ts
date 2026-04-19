import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  checkoutOrder,
  getOrdersByUser,
  getOrders,
  getOrderById,
  getOrdersByOwner,
  getAllCustomer,
} from "../controllers/order.controller";

const router = Router();

// CREATE ORDER
router.post("/", authMiddleware, checkoutOrder);

// USER ORDERS
router.get("/me", authMiddleware, getOrdersByUser);

// SELLER ORDERS
router.get("/seller", authMiddleware, getOrdersByOwner);

// ADMIN
router.get("/customers", authMiddleware, getAllCustomer);
router.get("/", authMiddleware, getOrders);

// SINGLE ORDER
router.get("/:id", authMiddleware, getOrderById);

export default router;