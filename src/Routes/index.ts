import express from "express";
// import docrouter from "../docs/Docs";
import userRoute from "./users.routers";
// import artRoutes from "./product.routes";
// import cartRouter from "./cart.routes";
// import orderRouter from "./order.routes";
// import postRoutes from "./blogs.routes";
// import messageRoutes from "./contacts.routes";


const router = express.Router();

// Route

// router.use("/docs", docrouter);
router.use("/users", userRoute);
// router.use("/products", artRoutes);
// router.use("/cart", cartRouter);
// router.use("/checkout", orderRouter);
// router.use("/posts", postRoutes);
// router.use("/messages", messageRoutes);


export default router;
