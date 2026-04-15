import express, { Router } from "express";
import fileUpload from "../helper/multer";
import authMiddleware from "../middleware/authMiddleware";
import { 
    createMessage,
    getMessages,
    getOneMessage,
    deleteMessage
} from "../controllers/contacts.controllers";

const messageRoutes: Router = express.Router();

messageRoutes.get("/", getMessages);
messageRoutes.get("/:messageId", getOneMessage);
messageRoutes.post("/", fileUpload.single("names"), createMessage);
messageRoutes.delete("/:id", authMiddleware, deleteMessage);

export default messageRoutes;