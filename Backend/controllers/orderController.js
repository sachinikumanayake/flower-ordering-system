import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
    try {
        // Stripe session එකක් හදන කොටස වෙනුවට කෙලින්ම Database එකට දත්ත දැමීම
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            cardInfo: req.body.cardInfo, // Frontend එකෙන් එවන කාඩ්පත් විස්තර
            payment: true, // Stripe නැති නිසා කෙලින්ම true කරන්න
            status: "Order Placed"
        });

        await newOrder.save();

        // User ගේ cart එක හිස් කිරීම
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully (No Stripe)" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
}

export { placeOrder };