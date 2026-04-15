import express, { Router } from "express";
import fileUpload from "../helper/multer";
import authMiddleware from "../middleware/authMiddleware";
import { 
    createPost,
    getPosts,
    getOnePost,
    getPostsByCategory,
    updatePost,
    deletePost,
    getPostByTitle
} from "../controllers/blogs.controllers";

const postRoutes: Router = express.Router();

postRoutes.get("/", getPosts);
postRoutes.get("/:postId", getOnePost);
postRoutes.post("/", fileUpload.single("image"), authMiddleware, createPost);
postRoutes.put("/:id", fileUpload.single("image"), authMiddleware, updatePost);
postRoutes.delete("/:id", authMiddleware, deletePost);
postRoutes.get("/category/:category", getPostsByCategory);
postRoutes.get("/title/:title", getPostByTitle);

export default postRoutes;