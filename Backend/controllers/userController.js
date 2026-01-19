
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id, role) => {  
    return jwt.sign({ id, role }, process.env.JWT_SECRET);
};

const regiUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            role: "user" // Default role
        });

        // 5. Saving to DB
        const user = await newUser.save();

        // 6. Creating token and returning success
        const token = createToken(user._id, user.role);
        res.json({ success: true, token, role: user.role });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Registration error" });
    }
};

// 2. User Login Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const userRole = user.role; 
        const token = createToken(user._id, userRole); 
        res.json({ success: true, token, role: userRole }); 
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Login error" });
    }
};

const adminLoginController = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Admin credentials error" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Admin credentials error" });
        }
        
        if (user.role !== "admin") {
            return res.json({ success: false, message: "Access Denied: Not an Admin" });
        }

        const adminRole = user.role;
        const token = createToken(user._id, adminRole);
        
        res.json({ success: true, token, role: adminRole });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Admin login process error" });
    }
};


export { loginUser, regiUser, adminLoginController };