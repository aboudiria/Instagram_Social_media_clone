
import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";


//signupUser function
const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        // Check if a user with the provided email or username already exists
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ message: "User already exists. Please use another email or username." });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = new User({
            
            name,
            email,
            username,
            password: hashedPassword
        });
  
        
        await newUser.save();
        
        if(newUser){
        generateTokenAndSetCookie(newUser._id,res);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email
        })};

    } catch (err) {
       
        console.error("Error in signupUser:", err.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};

//loginUser function
const loginUser =async(req,res)=>{
    try{
        const {username, password}=req.body;
        const user= await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect) return res.status(400).json({message:"email or password is invalid"});

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
        })

    }catch(err){
        res.status(500).json({message:err.message});
        console.log("error in loginUser :",err.message);
    }
}

const logoutUser= (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:1});
        res.status(200).json({message:"user logout successufully"})
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("error in logout:", err.message);
        
    }
}

export { signupUser, loginUser, logoutUser }; 