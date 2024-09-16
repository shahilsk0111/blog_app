import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js"; 

dotenv.config();

app.use(express.json());


mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
         console.log("MongoDB connected successfully");
 
    })
    .catch((error)=>{
         console.log("Error connecting to MongoDB", error.message);
    });

const app = express();

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use((err , req , res , next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message ||"internal server error"
    res.status(statusCode).json({
        success: false,
        message: message,
        statusCode
    })
})

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
});