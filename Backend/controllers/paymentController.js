import stripePackage from 'stripe';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);


const placeOrder = async (req, res) => {
    try {
        const frontend_url = process.env.FRONTEND_URL;

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });


        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "lkr", 
                unit_amount: item.price * 100, 
                product_data: {
                    name: item.name,
                },
            },
            quantity: item.quantity,
        }));

        
        line_items.push({
            price_data: {
                currency: "lkr",
                unit_amount: 500 * 100,
                product_data: {
                    name: "Delivery Charges"
                }
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, 
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,  
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating payment session" });
    }
}

// -------------------------------------------------------------
// Function to Verify Payment Status
// -------------------------------------------------------------
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment Successful. Order Placed" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed. Order Deleted" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error verifying payment" });
    }
}


export { placeOrder, verifyOrder };