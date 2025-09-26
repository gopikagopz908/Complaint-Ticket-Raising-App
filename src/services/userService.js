import User from "../models/userModel.js"
import CustomError from "../utils/customError.js"
import bcrypt from "bcryptjs"

export const registerService=async(data)=>{

    const{name,password,email}=data

    const userExists=await User.findOne({email})

    if(userExists){
        throw new CustomError("user already exists",400)
    }

    const hashedpwd=await bcrypt.hash(password,8)

    const newUser=new User({
        name,
        email,
        password:hashedpwd
    })

    const savedUser=await newUser.save()
    return savedUser
}


export const loginService=async(data)=>{

    const{email,password}=data

    const user=await User.findOne({email})

    if(!user){
        throw new CustomError("pls create an account",400)
    }
         const match = await bcrypt.compare(password, user.password);

        if(!match) {

            throw new CustomError("invalid password/email")
            
        }
    return user;
        
    
    }


    