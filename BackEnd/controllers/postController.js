import User from '../models/userModel.js';
import Post from "../models/postModel.js";


const createPost= async(req,res)=>{
    try {
        const {postedBy,text,img} =req.body;
       

        if(!postedBy || !text) {
            return res.status(400).json({message:"postedBy and text field are required"});
        }
        const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}

        const newPost= new Post({
            postedBy ,
            text,
            img,
        });
        const post=await newPost.save();
        res.status(201).json({message:"post created succefully",post});
        
    } catch (error) {
        console.log("error in create post :",error.message);
        res.status(500).json({message:error.message});
        
    }
}

const getPost= async (req,res)=>{
    try {
         const post= await Post.findById(req.params._id);

         if(!post){
            return res.status(404).json({message:"post not found"});
         }

         res.status(200).json({post});

    } catch (error) {
        console.log("error in get post");
        res.status(500).json({message:error.message}) ;
        
    }
}

const deletePost=async(req,res)=>{
    try {
         const post= await Post.findById(req.params._id);

         if(!post){
            return res.status(404).json({message:"post not found"});
         }
         
         if(post.postedBy.toString()!==req.params._id){
            return res.status(401).json({message:"you are not authorized to delete this post"});

         }
            await Post.findByIdAndDelete(req.params._id);
            res.status(200).json({message:"post deleted succefully"});
    } catch (error) {
        res.status(500).json({message:error.message});

    }
}

export {createPost, getPost , deletePost};