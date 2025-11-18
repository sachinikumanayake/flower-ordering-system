import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import flowerRouter from "./routs/flowerRoute.js";
import userRouter from "./routs/userRoute.js";
import'dotenv/config'
import cartRouter from "./routs/cartRoute.js";

// ✅ App config
const app = express();
const port =4000;


// ✅ Middleware
app.use(express.json());
app.use(cors()); // 💡 This must come AFTER app is defined

// ✅ DB connection
connectDB();

// ✅ Routes
app.use("/api/flower", flowerRouter);
app.use("/images", express.static( "uploads"));

app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});

// ✅ Server listener
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
