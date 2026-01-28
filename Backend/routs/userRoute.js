import express from "express"
import { loginUser, regiUser } from "../controllers/userController.js" 

const userRouter = express.Router()

userRouter.post("/register",regiUser)
userRouter.post("/login",loginUser)



userRouter.get("/test", (req, res) => {
    res.send("User route works!");
  });
  
export default userRouter;