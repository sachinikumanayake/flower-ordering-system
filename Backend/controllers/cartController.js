import Cart from "../models/cartModel.js";

// Get user cart
const getCart = async (req, res) => {
    try {
        // authMiddleware eken userId eka req.body.userId widiyata hambawenawa
        let cartData = await Cart.findOne({ userId: req.body.userId });
        
        // Cart eka thiyenawanam eke items tika yawanawa, nathnam empty object ekak
        let cartItems = {};
        if (cartData) {
            cartData.items.forEach((item) => {
                cartItems[item.flowerId] = item.quantity;
            });
        }
        
        res.json({ success: true, cartItems });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching cart" });
    }
};

// Add to cart
const addToCart = async (req, res) => {
    try {
        let cartData = await Cart.findOne({ userId: req.body.userId });
        let items = cartData ? cartData.items : [];

        const itemIndex = items.findIndex(item => item.flowerId.toString() === req.body.flowerId);

        if (itemIndex > -1) {
            items[itemIndex].quantity += 1;
        } else {
            items.push({ flowerId: req.body.flowerId, quantity: 1 });
        }

        if (!cartData) {
            cartData = new Cart({ userId: req.body.userId, items });
        } else {
            cartData.items = items;
        }

        await cartData.save();
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding to cart" });
    }
};

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        let cartData = await Cart.findOne({ userId: req.body.userId });
        if (cartData) {
            cartData.items = cartData.items.filter(item => item.flowerId.toString() !== req.body.flowerId);
            await cartData.save();
        }
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing from cart" });
    }
};

export { addToCart, removeFromCart, getCart };