import express, { Router } from "express";
import fileUpload from "../helper/multer";
import { 
  createUser, 
  deleteUser, 
  getAllUsers, 
  getOneUser, 
  login, 
  updateUser, 
  forgotPassword, 
  resetPassword, 
  approveStatus, 
  approveAdminStatus 
} from "../controllers/users.controller";

const userRoute: Router = express.Router();

userRoute.get("/", getAllUsers);
userRoute.get("/:id", getOneUser);
userRoute.post("/", fileUpload.single("img"), createUser);
userRoute.put("/:id", fileUpload.single("img"), updateUser);
userRoute.delete("/:id", deleteUser);
userRoute.post("/auth", fileUpload.single("files"), login);
userRoute.post("/:id/tech", fileUpload.single("files"), approveStatus);
userRoute.post("/:id/admin", fileUpload.single("files"), approveAdminStatus);
userRoute.post("/forgot-password", fileUpload.single("files"), forgotPassword);
userRoute.post("/reset-password", fileUpload.single("files"), resetPassword);

export default userRoute;