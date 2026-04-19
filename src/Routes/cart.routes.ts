import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  addItem,
  completeCart,
  deleteCart,
  getCart,
  removeItem,
  updateItem,
} from "../controllers/cart.controller";

const router = Router();

router.get("/", authMiddleware, getCart);

router.post("/:productId", authMiddleware, addItem);

router.put("/:productId", authMiddleware, updateItem);

router.delete("/:productId", authMiddleware, removeItem);

router.delete("/clear", authMiddleware, deleteCart);

router.post("/checkout", authMiddleware, completeCart);

export default router;