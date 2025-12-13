// middleware/adminAuth.js

import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    // Authorization Header එක Bearer token එකක් ලෙස පරීක්ෂා කිරීම
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized, Token not found" });
    }

    try { 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
        
        // Role පරීක්ෂාව
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Access Denied. Admin privileges required." });
        }
        
        req.user = decodedToken; 
        next();

    } catch (error) { 
        console.error("JWT Verification Error in adminAuth:", error.message);
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export default adminAuth;