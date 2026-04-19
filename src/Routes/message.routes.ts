import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  createMessage,
  getMessages,
  getOneMessage,
  deleteMessage,
} from "../controllers/contacts.controllers";

const router = Router();

router.get("/", authMiddleware, getMessages);

router.get("/:id", authMiddleware, getOneMessage);

router.post("/", createMessage);

router.delete("/:id", authMiddleware, deleteMessage);

export default router;