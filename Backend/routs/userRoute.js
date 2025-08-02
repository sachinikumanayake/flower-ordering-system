import express from "express"
import { loginUser,regiUser } from "../controllers/userController.js"
const userRouter = express.Router()
userRouter.post("/register",regiUser)
userRouter.post("/login",loginUser)
export default userRouter;