import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Not Authorized: Token format invalid or missing" });
    }
    
    const token = authHeader.split(' ')[1];

    try { 
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        req.body.userId = token_decode.id; 
        req.user = token_decode; 
        
        next();
    } catch (error) { 
        console.error("JWT Error:", error.message);
        return res.status(403).json({ success: false, message: "Invalid or Expired Token" });
    } 
};

export default authMiddleware;