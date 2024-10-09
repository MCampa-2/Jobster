import User from "../Schema/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const register = async (req,res) =>{
    try{
        const {email,password,name} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({name: name, email: email, password: hashedPassword});
        await newUser.save();
        
       return res.status(201).json({msg: "Success registering"})
        
    }catch(error){
        res.status(500).json({msg: error});
    }

}

export const login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({msg: "Invalid email or password"});
        }
        const matchedUser = await bcrypt.compare(password, existingUser.password)
        if(!matchedUser){
           return res.status(400).json("User does not exist")
        }
        const token = jwt.sign({userId: existingUser._id}, process.env.SECRET_KEY,{expiresIn: "30d"});
        
        console.log(existingUser.name)
       return res.status(200).json({msg: "User logged in",token, user:{name: existingUser.name}});
        
    }catch(error){
        res.status(500).json({msg: error});
    }
}