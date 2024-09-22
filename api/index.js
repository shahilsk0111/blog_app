import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js"; 
import postRoutes from "./routes/post.route.js";
import commentRoutes from './routes/comment.route.js';
import cookieParser from "cookie-parser";
import path from "path"

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser())


mongoose.connect(process.env.MONGODB_URL )
    .then(()=>{
         console.log("MongoDB connected successfully");
 
    })
    .catch((error)=>{
         console.log("Error connecting to MongoDB", error.message);
    });

const __dirname = path.resolve()



app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

app.use( express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client' , 'dist', 'index.html'));
});


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