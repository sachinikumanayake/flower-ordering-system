import express from "express";
import authMiddleware from "../middleware/auth.js"; 
import { placeOrder, verifyOrder, userOrders } from "../controllers/paymentController.js";

const orderRouter = express.Router();

// Route to place an order
orderRouter.post("/place", authMiddleware, placeOrder); 

// Route to fetch all orders for a specific user
orderRouter.post("/userorders", authMiddleware, userOrders);

// Route to verify order (if needed)
orderRouter.post("/verify", verifyOrder);

export default orderRouter;