import express from "express";
import Cart from "../models/cartModel.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();


router.post("/add",authMiddleware, async (req, res) => {
  try {
    const { userId, flowerId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
    
      cart = new Cart({
        userId,
        items: [{ flowerId, quantity }]
      });
    } else {
      
      const itemIndex = cart.items.findIndex(item => item.flowerId.toString() === flowerId);

      if (itemIndex > -1) {
        
        cart.items[itemIndex].quantity += quantity;
      } else {
        
        cart.items.push({ flowerId, quantity });
      }
    }

    await cart.save();
    res.json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.flowerId");
    res.json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.post("/remove", async (req, res) => {
  try {
    const { userId, flowerId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(item => item.flowerId.toString() !== flowerId);

    await cart.save();
    res.json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
