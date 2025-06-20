import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 5,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN','SUB_ADMIN'],
    default: 'USER',
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
  },
  district: {
    type: String,
    required: [true, 'District is required'],
    trim: true,
  },
  tehsil: {
    type: String,
    required: [true, 'Tehsil is required'],
    trim: true,
  },
   isDeleted: {
    type: Boolean,
    default: false, 
  },
  aadhaarFile: {
    type: String,
    required: [true, "Aadhaar file is required"],
  },
  panFile: {
    type: String,
    required: [true, "PAN file is required"],
  },
   status: {
  type: String,
  enum: ["pending", "approved", "reject"],
  default: "pending"
},
createdAt:{
  type:String
},
updatedAt:{
    type:String

}

});

const User = mongoose.model("User", userSchema);
export default User;
