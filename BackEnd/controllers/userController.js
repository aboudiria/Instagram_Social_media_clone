
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

const followAndunfollowUser= async(req,res)=>{
    try {
        const {id}=req.params;
        const userToModify= await User.findById(id);
        const currentUser= await User.findById(req.user._id);
        
        if(id===req.user._id.toString()) return res.status(400).json({message : "you cannot follow and unfollow your self"});

        if (!userToModify || !currentUser) return res.status(400).json({message : "user not found"});

         const isFollowing= currentUser.following.includes(id);

         if(isFollowing) {
            //unfollow user
            //Modify current user following,modify followers from user to modify

            await User.findByIdAndUpdate(req.user._id, {$pull :{following: id}})
            await User.findByIdAndUpdate(id , {$pull : {followers :req.user._id}});
         }else{
            //follow user
            //modify current user following ,modify followers from user to modify

            
            await User.findByIdAndUpdate(req.user._id, {$push :{following: id}});
            await User.findByIdAndUpdate(id , {$push : {followers :req.user._id}});
         }
         res.status(200).json({ message: isFollowing ? "User unfollowed successfully" : "User followed successfully" });
    } catch (err) {
        res.status(500).json({message:err.message});
        console.log("error in followUnfollow :",err.message);
        
    }
}

const updateUser=async(req,res)=>{
    const {name,email,password,username,profilePic, bio}=req.body;
    const userId= req.user._id;

    try {
           let user= await User.findById(userId);
           if(!user) return res.status(400).json({message :"user not found"});
           if (req.params.id !==userId.toString()) return res.status(401).json({message:"you cannot update other"});
           if(password){
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            user.password=hashedPassword;


           }
           user.username= username ||user.username;
           user.name=name || user.name;
           user.email=email || user.email;
           user.profilePic= profilePic || user.profilePic;
           user.bio= bio|| user.bio;
           
           user =await user.save();

           res.status(200).json({message :"update user successfully" , user:user })

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log('error in update user : ',error.message);
        
    }
}

const getUserProfile= async(req,res)=>{
    const {username}=req.params;
    try {
        const user = await User.findOne({username}).select("-password").select("-updatedAt");
        if(!user) return res.status(400).json({message:"user not found"});

        res.status(200).json(user);

        
        
    } catch (error) {
        res.status(500).json({message:error.message});
        console.log("error in get user profile",error.message);        
    }
}

export { signupUser, loginUser, logoutUser, followAndunfollowUser, updateUser, getUserProfile}; 