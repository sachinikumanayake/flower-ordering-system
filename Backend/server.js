import express from "express";
import cors from "cors";
import 'dotenv/config'; 
import { connectDB } from "./config/db.js";
import flowerRouter from "./routs/flowerRoute.js";
import userRouter from "./routs/userRoute.js";
import adminRouter from "./routs/adminRoute.js"; 
import cartRouter from "./routs/cartRoute.js";
import orderRouter from './routs/orderRoute.js';

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// Routes
app.use("/api/flower", flowerRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/admin", adminRouter); 
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});