import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js"; 
import validator from "validator"; 

const createToken = (id) => {
    return jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET);
};

const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.json({ success: false, message: "Admin account not found." });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials (Wrong Password)." });
        }

        const token = createToken(admin._id);

        res.json({ success: true, token, role: 'admin' }); 

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error during admin login process." });
    }
};


const adminRegister = async (req, res) => {
    const { email, password } = req.body;

    try {
        const exists = await Admin.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Admin account already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            email,
            password: hashedPassword,
        });

        const admin = await newAdmin.save(); 

        const token = createToken(admin._id);

        res.json({ success: true, token, role: 'admin', message: "Admin Registered Successfully!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating admin account." });
    }
};


export { adminLogin, adminRegister };