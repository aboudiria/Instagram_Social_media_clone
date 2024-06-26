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

const likeUnlikePost=async(req,res)=>{
    try {
         const{id:postId}=req.params;
         const userId=req.user._id;
         const post = await Post.findById(postId);

         if(!post){
            return res.status(404).json({message:"post not found"});
         }
         const userLikedPost=post.likes.includes(userId);
         if(userLikedPost){
            //unlikePost
            await Post.updateOne({_id:postId},{$pull:{likes: userId}});
            res.status(200).json({message:"post Unliked successfuly"});

         }else{
            //likePost
             post.likes.push(userId);
             await post.save();
             res.status(200).json({message:"post liked successfuly"}); 


         }

    } catch (err) {
        return res.status(500).json({message:err.message});
        
    }
}

const replyToPost=async(req,res)=>{
    try {
         const {text}= req.body;
         const postId=req.params.id;
         const userId=req.user._id;
         const userProfilePic=req.user.profilePic;
         const username=req.user.username;

         if(!text){
            return res.status(400).json({message:"text field is required"});
         }
         const post = await Post.findById(postId);
         if(!post){
            return res.status(404).json({message:"post not found"});
         }
         const reply={userId,text,userProfilePic,username};

         post.replies.push(reply);
         await post.save();
         res.status(200).json({message:"reply created succefully"});

}catch(err){
    return res.status(500).json({message:err.message});
    console.log("error to reply to post:",err.message);
}
}

const getFeedPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const following = user.following;

		const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedPosts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserPosts = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });

		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};



export {createPost, getPost , deletePost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts};