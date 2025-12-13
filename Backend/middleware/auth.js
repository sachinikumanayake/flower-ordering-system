// middleware/authMiddleware.js

import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.json({success:false,message:"Not Authorized: Token format invalid or missing"});
    }
    
    const token = authorizationHeader.split(' ')[1]; // Bearer ඉවත් කරන්න

    try { 
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        req.body.userId = token_decode.id; 
        req.user = token_decode; 
        
        next();
    } catch (error) { 
        console.error("JWT Verification Error in authMiddleware:", error.message);
        res.json({success:false,message:"Invalid Token"});
    } 
}

export default authMiddleware;