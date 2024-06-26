import express from'express';

import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from './routes/postRoutes.js';

dotenv.config();
connectDB();

const app= express();

app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());

//Log incoming request bodies (for debugging)
app.use((req, res, next) => {
    console.log('Incoming Request Body:', req.body);
    next();
});

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON:', err.message);
        return res.status(400).json({ message: 'Invalid JSON payload' });
    }
    next();
});

//Routes
app.use('/api/users' ,userRoutes);
app.use('/api/posts' ,postRoutes);
 
app.listen(process.env.PORT,()=>{
    console.log("server is runing on port 3000");
}) 