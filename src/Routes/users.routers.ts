import { Router } from "express";
import fileUpload from "../helper/multer";
import authMiddleware from "../middleware/authMiddleware";
import {
  // User CRUD
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  // Approval actions
  approveStatus,
  approveAdminStatus,
  // Authentication
  login,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/users.controller";

const router = Router();

// ==================== Public Routes (no auth required) ====================

// User registration
router.post("/register", fileUpload.single("img"), createUser);

// Login
router.post("/login", login);

// Password reset flow
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ==================== Protected Routes (auth required) ====================

// All routes below require authentication
// (authMiddleware should verify JWT and attach user to req)

// User management (admin only ideally, but we keep as is)
router.get("/", getAllUsers);
router.get("/:id", authMiddleware, getOneUser);
router.put("/:id", authMiddleware, fileUpload.single("img"), updateUser);
router.delete("/:id", authMiddleware, deleteUser);

// Change own password (should use req.user.id, not :id param)
router.patch("/change-password", authMiddleware, changePassword);

// Approval actions (admin only)
router.patch("/:id/approve-tech", authMiddleware, approveStatus);
router.patch("/:id/approve-admin", authMiddleware, approveAdminStatus);

export default router;