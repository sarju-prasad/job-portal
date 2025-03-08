import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    titel:{
        type:String,
        required:true
    },
    descriptions:{
        type:String,
        required:true,
    },
    positions:{
        type:Number,
        required:true
    },
    requirments:[{
        type:String,
        required:true
    }],
    salary:{
        type:Number,
        required:true
    },
    locations:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true,
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Application"
    }]
})

export const Job=mongoose.model("Job", jobSchema);