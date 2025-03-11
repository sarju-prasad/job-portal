import { User } from "../models/users.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { skipMiddlewareFunction } from "mongoose";


export const register=async(req,res)=>{
    try {
        const {fullName,email,password,role,phoneNumber}=req.body;
        if(!fullName || !email || !password || !role || !phoneNumber){
           return res.status(400).json({
            message:"Something is missing",
            success:false
           })
        }
        const user= await User.findOne({email});
        if(user){
           return res.status(400).json({
                meassage:"User already exits for this email.",
                success:false
            })
        }
        const hashPassword=await bcrypt.hash(password,10);
        await User.create({
            fullName,
            email,
            password:hashPassword,
            role,
            phoneNumber
        })
        return res.status(201).json({
            message:"User account created successfully",
            success:true
        })
    } catch (error) {
        console.log("Error in user register",error)
    }
}

export const login=async()=>{
    try {
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing!",
                success:false
            })
        }
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User does not exit for this email.",
                success:false
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:'Incorrect password',
                success:false
            })
        }
        //Check the role is correct or not
        if(role!== user.role){
            return res.status(400).json({
                message:"Account doesn't current user role.",
                success:false
            })
        }
        const tokenData={
            userId:user._id
        }
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        user=({
            email:user.email,
            password:user.passsword,
            fullName:user.fullName,
            role:user.role,
            phoneNumber:user.phoneNumber,
            profile:user.profile
        })
        return res.status(200).cookie("token",token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:"User login successfully",
            user,
            success:true
        })


    } catch (error) {
        console.log("Error in user login",error)
    }
}

export const logout=async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"User logout successfully",
            success:true
        })
    }catch(error){
        console.log("Error in logout: ",error);
    }
    
}

export const updateProfile=async(req,res)=>{
    try {
        const {fullName,email,bio,phoneNumber,skills}=req.body;
        if(!fullName || !email || !bio || !phoneNumber || !skills){
            return res.status(400).json({
                message:"Account doesn't update",
                success:false
            })
        }
        const skillsArray=skills.spilt(',');
        const userId=req.id;
        let user =await User.findById(userId);
        user.fullName=fullName;
        user.email=email;
        user.phoneNumber=phoneNumber;
        user.profile.bio=bio;
        user.profile.skills=skillsArray;

        await user.save();
        user=({
            email:user.email,
            password:user.passsword,
            fullName:user.fullName,
            role:user.role,
            phoneNumber:user.phoneNumber,
            profile:user.profile
        })

        return res.status(200).json({
            message:"User profile updated successfully",
            success:true
        })
    } catch (error) {
        console.log(`Error in profile update: ${error}`)
    }
}