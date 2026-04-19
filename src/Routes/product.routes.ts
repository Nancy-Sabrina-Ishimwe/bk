import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import fileUpload from "../helper/multer";
import {
  createArts,
  deleteArts,
  getAllArts,
  getArtsByCategory,
  getArtsById,
  getArtsByLoggedUser,
  getArtsByOwner,
  getArtsByTitle,
  updateArts,
} from "../controllers/products.controllers";

const router = Router();

// CREATE PRODUCT (seller only ideally)
router.post(
  "/",
  authMiddleware,
  fileUpload.single("image"),
  createArts
);

// GET ALL PRODUCTS
router.get("/", getAllArts);

// FILTERS
router.get("/category/:category", getArtsByCategory);
router.get("/search/:name", getArtsByTitle);

// USER PRODUCTS
router.get("/me", authMiddleware, getArtsByLoggedUser);
router.get("/seller/:id", getArtsByOwner);

// SINGLE PRODUCT
router.get("/:id", getArtsById);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  fileUpload.single("image"),
  updateArts
);

// DELETE
router.delete("/:id", authMiddleware, deleteArts);

export default router;