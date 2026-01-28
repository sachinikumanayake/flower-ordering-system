import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId, 
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            cardInfo: req.body.cardInfo, 
            payment: true, 
            status: "Order Placed"
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId }); 
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Fetch User Orders Error:", error);
        res.json({ success: false, message: "Error fetching orders" });
    }
}


const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
}


const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating status" });
    }
}
// Remove order function
const removeOrder = async (req, res) => {
    try {
        await orderModel.findByIdAndDelete(req.body.orderId);
        res.json({ success: true, message: "Order Removed Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Removing Order" });
    }
}

export { placeOrder,  userOrders, listOrders, updateStatus, removeOrder };

