import express, { Router } from "express";
import {
  addItem,
  completeCart,
  deleteCart,
  getCart,
  removeItem,
  updateItem,
} from "../controllers/cart.controller";
import authMiddleware from "../middleware/authMiddleware";
import fileUpload from "../helper/multer";

const cartRouter: Router = express.Router();

cartRouter.get("/", authMiddleware, getCart);
cartRouter.post(
  "/:productId/add",
  authMiddleware,
  fileUpload.single("files"),
  addItem,
);
cartRouter.put(
  "/:productId/update",
  authMiddleware,
  fileUpload.single("files"),
  updateItem,
);
cartRouter.delete("/:productId/remove", authMiddleware, removeItem);
cartRouter.delete("/complete", authMiddleware, completeCart);
cartRouter.delete("/:id", authMiddleware, deleteCart);

export default cartRouter;
