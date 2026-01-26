import Cart from "../models/cartModel.js";


const getCart = async (req, res) => {
    try {
        
        let cartData = await Cart.findOne({ userId: req.body.userId });
        
        let cartItems = {};
        if (cartData && cartData.items) {
            cartData.items.forEach((item) => {
                if (item.flowerId) {
                    cartItems[item.flowerId] = item.quantity;
                }
            });
        }
        
        res.json({ success: true, cartItems });
    } catch (error) {
        console.log("Get Cart Error:", error);
        res.json({ success: false, message: "Error fetching cart" });
    }
};

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body; 

        if (!itemId) {
            return res.json({ success: false, message: "Item ID is required" });
        }

        let cartData = await Cart.findOne({ userId: userId });

        if (!cartData) {
            cartData = new Cart({
                userId: userId,
                items: [{ flowerId: itemId, quantity: 1 }]
            });
        } else {
        
            const itemIndex = cartData.items.findIndex(item => 
                item.flowerId && item.flowerId.toString() === itemId.toString()
            );

            if (itemIndex > -1) {
                cartData.items[itemIndex].quantity += 1;
            } else {
                cartData.items.push({ flowerId: itemId, quantity: 1 });
            }
        }

        await cartData.save();
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log("Add To Cart Error:", error);
        res.json({ success: false, message: "Error adding to cart" });
    }
};


const removeFromCart = async (req, res) => {
    try {
        const { userId, flowerId } = req.body;
        
        let cartData = await Cart.findOne({ userId: userId });
        if (cartData) {
            const itemIndex = cartData.items.findIndex(item => 
                item.flowerId && item.flowerId.toString() === flowerId.toString()
            );

            if (itemIndex > -1) {
                if (cartData.items[itemIndex].quantity > 1) {
                    cartData.items[itemIndex].quantity -= 1;
                } else {
                    cartData.items.splice(itemIndex, 1);
                }
                await cartData.save();
            }
        }
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log("Remove From Cart Error:", error);
        res.json({ success: false, message: "Error removing from cart" });
    }
};

export { addToCart, removeFromCart, getCart };