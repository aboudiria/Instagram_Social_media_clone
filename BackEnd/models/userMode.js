import { Timestamp } from 'mongodb';
import mongoose from 'mongoose';


const userSchema= mongoose.Schema({
    name:{
        type: String,
        required:true,

    },
    username:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minLength: 6,   
    },
    profilePic:{
        type : String,
        default:""
    },
    followers:{
        type:[string],
        default:[]
    },
    following:{
        type:[string],
        default:[]
    },
    bio:{
        type:string,
        default:''
    }
},
{Timestamp:true}
);
const User= mongoose.model('User',userSchema);

export default User;