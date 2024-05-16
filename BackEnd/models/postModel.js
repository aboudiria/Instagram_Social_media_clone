import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const postSchema= mongoose.Schema({
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,

    },
    text:{
        type:string,
        maxLength:500
    },
    img:{
        type:string,
    },
    likes:{
        type : Number,
        default:0,
    }
    replies:[
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true,

            },
            text:{
                type:string,
                required:true
            },
            userProfilePic:{
                type:string,
            },
            username:{
                type:string,
            }
        }
    ]
},
{Timestamp:true}
);
const Post= mongoose.model("Post",postSchema);

export default Post;