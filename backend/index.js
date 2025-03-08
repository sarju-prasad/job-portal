import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";

dotenv.config({});
const app=express();
const PORT=process.env.PORT || 7000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptrion={
    origin:'http//localhost:5173',
    credentials:true
}
app.use(cors(corsOptrion));



app.listen(PORT,(err)=>{
    if(err){
        console.log(`Server is not started at Port No. : ${PORT}`);
    }
    else{
        connectDB();
        console.log(`Server is running at Port No. : ${PORT}`)
    }
})