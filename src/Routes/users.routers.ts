import { Router } from "express";
import fileUpload from "../helper/multer";
import authMiddleware from "../middleware/authMiddleware";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
  approveStatus,
  approveAdminStatus,
} from "../controllers/users.controller";

const router = Router();

// USERS
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getOneUser);

router.post("/", fileUpload.single("img"), createUser);

router.put("/:id", authMiddleware, fileUpload.single("img"), updateUser);

router.delete("/:id", authMiddleware, deleteUser);

// APPROVAL (admin / tech)
router.patch("/:id/approve-tech", authMiddleware, approveStatus);
router.patch("/:id/approve-admin", authMiddleware, approveAdminStatus);

export default router;