import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res , next) =>{
    const {username , email , password} = res.body;

    if( !username || !email || !password || username==="" || email==="" || password==="" ){
       next(errorHandler(400 , "All fields are required"))
    }

    const hashedPassword = bcryptjs.hashSync(password , 10)

    const newUser = new User({
        username,
        email,
        password : hashedPassword
    })

    try {
        await newUser.save()
        res.json ("signup successfull")
        
    } catch (error) {
      next(error)
    }

}

export const signin = async (req, res , next) =>{
    const {email , password} = req.body;

    if(!email ||!password || email==="" || password==="" ){
        next(errorHandler(400 , "All fields are required"))
    }

    try {
       const validUser = await User.findOne({email})

       if(!validUser){
           return next(errorHandler(401 , "Invalid credentials"))
       }
       const validPassword = bcryptjs.compareSync(password , validUser.password)
       if(!validPassword){
           return next(errorHandler(401 , "Invalid credentials"))
       }

       const token = jwt.sign(
        { id : validUser._id} , process.env.JWT_SECRET
       )
       
       res.status(200).cookie('access_token', token , {
        httpOnly : true
       }).json(validUser)

    } catch (error) {
       next(error) 
    }
}