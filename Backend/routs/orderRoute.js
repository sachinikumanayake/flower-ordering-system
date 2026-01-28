import express from "express";
import authMiddleware from "../middleware/auth.js"; 
import { placeOrder, verifyOrder } from "../controllers/paymentController.js";
import { userOrders, listOrders, updateStatus,removeOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder); 
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.post("/remove", removeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

orderRouter.post("/verify", verifyOrder);

export default orderRouter;