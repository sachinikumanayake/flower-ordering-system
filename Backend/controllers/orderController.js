
const OrderModel = require('../models/orderModel');
const jwt = require('jsonwebtoken'); 

const placeOrder = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized, token not found" });
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
        const userId = decodedToken.id;

    // 2. ඇණවුම් දත්ත සකස් කිරීම
        const newOrder = new OrderModel({
            userId: userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

       

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Placing Order" });
    }
}

module.exports = { placeOrder };