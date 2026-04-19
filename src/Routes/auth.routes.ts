import { Router } from "express";
import {
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/users.controller";

const router = Router();

// AUTH ROUTES
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;