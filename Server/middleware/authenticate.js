import jwt from "jsonwebtoken";

export const authenticate = async (req,res,next) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        
        if(!token){
            return res.status(400).json({msg: "No token provided"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();        

    }catch(error){
        res.status(500).json({msg: "Invalid token"})
    }
} 