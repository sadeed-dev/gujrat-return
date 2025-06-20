import mongoose from "mongoose";
import { LFA } from "./lfa.model.js";

const taskSubmissionSchema = new mongoose.Schema({
  lfaId: {
    type: String, 
    unique: true,
  },
    title: {
    type: String, 
    required:true
  },
  
  images: {
  type: [String], // Array of image URL strings
  required: true,
  },
    description: String,

  submittedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  

}, { timestamps: true });


const Task =  mongoose.model("Task", taskSubmissionSchema);

export  default Task