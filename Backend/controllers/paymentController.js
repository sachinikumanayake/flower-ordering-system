import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Stripe අවශ්‍ය නැති නිසා stripePackage සහ stripe initialize කොටස් ඉවත් කළා

const placeOrder = async (req, res) => {
    try {
        // 1. අලුත් Order එකක් නිර්මාණය කිරීම
        const newOrder = new orderModel({
            userId: req.body.userId, 
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true // Stripe නැති නිසා කෙලින්ම true ලෙස හෝ අවශ්‍ය නම් false ලෙස තැබිය හැක
        });
        
        // 2. Database එකේ Save කිරීම
        await newOrder.save();
        
        // 3. පරිශීලකයාගේ Cart එක හිස් කිරීම
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // 4. සාර්ථක පණිවිඩය සහ orderId එක යැවීම
        res.json({ success: true, message: "Order Placed Successfully", orderId: newOrder._id });

    } catch (error) {
        console.error("Order Error:", error);
        res.json({ success: false, message: "Error placing order" });
    }
}

// verifyOrder අවශ්‍ය වන්නේ Stripe වැනි payment gateway එකක් තිබේ නම් පමණි. 
// නමුත් ඔබගේ route වල තිබේ නම් මෙය තබා ගන්න.
const verifyOrder = async (req, res) => {
    res.json({ success: true, message: "Manual Verification Not Required" });
}

export { placeOrder, verifyOrder };