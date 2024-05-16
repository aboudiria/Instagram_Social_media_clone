import express from'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app= express();

app.use(express.json());// To parse json data in the req.body
app.use(express.urlencoded({extended:true}));//to parse form data in the req.body
app.use(cookieParser());// allow us to get cookies from request and set cookies inside response

//Routes
app.use('/api/users',userRoutes);

app.listen(process.env.PORT,()=>{
    console.log("server is runing on port 3000");
}) 