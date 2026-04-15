import express, { Router } from 'express';
import authMiddleware from "../middleware/authMiddleware";
import fileUpload from "../helper/multer";
import { 
  checkoutOrder, 
  getOrdersByUser, 
  getOrders, 
  getOrderById, 
  getOrdersByOwner, 
  getAllCustomer 
} from '../controllers/order.controller';

const orderRouter: Router = express.Router();

// Route for checkout
orderRouter.post('/:cartId', authMiddleware, fileUpload.single("files"), checkoutOrder);
orderRouter.get('/owner', authMiddleware, getOrdersByUser);
orderRouter.get('/artsOwner', authMiddleware, getOrdersByOwner);
orderRouter.get('/customer', authMiddleware, getAllCustomer);
orderRouter.get('/', authMiddleware, getOrders);
orderRouter.get('/:orderId:', authMiddleware, getOrderById); // Note: double colon? Might be a typo

export default orderRouter;