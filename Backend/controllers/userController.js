import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"

//login
const loginUser = async (req,res) => {

}
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//regi
const regiUser = async (req,res) => {
 const{name,password,email} = req.body;
try {
    const exists = await userModel.findOne({email});
    if (exists) {
        return res.json({sucess:false,message:"User already exists"})
    }
if (!validator.isEmail(email)) {
    returnres.json({sucess:false,message:"Please enter valid email"})
    
}
if (password.length<8) {
    returnres.json({sucess:false,message:"Please enter strong password"})
    
}   
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt);
const newUser = new userModel({
    name:name,
    email:email,
    password:hashedPassword
})
const user = await newUser.save()

const token = createToken(user._id)
res.json({sucess:true,token})
} 

catch (error)
 {
    console.log(error)
    res.json({sucess:false,message:"Error"})
}}
export {loginUser,regiUser};