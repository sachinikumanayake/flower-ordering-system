import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing User Order from Frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId, // Decoded from authMiddleware
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            cardInfo: req.body.cardInfo, 
            payment: true, 
            status: "Order Placed"
        });

        await newOrder.save();

        // Clearing User Cart Data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
}

// Fetching User Orders for Frontend "My Orders" page
const userOrders = async (req, res) => {
    try {
        // Find all orders belonging to the specific userId
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
}

// Keep verifyOrder if you are using it for other purposes
const verifyOrder = async (req, res) => {
    // Your verify logic here
}

export { placeOrder, userOrders, verifyOrder };