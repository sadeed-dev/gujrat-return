import mongoose from "mongoose";

const lfaSchema = new mongoose.Schema({
  lfaId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Number is required"],

},
  // dateOfBirth: {
  //   type: Date,
  //   required: [true, "DOB is required"],
  // },
  aadhaarFile: {
    type: String,
    required: [true, "Aadhaar file is required"],
  },
  panFile: {
    type: String,
    required: [true, "PAN file is required"],
  },



  bankAccountNumber: {
    type: String,
    required: [true, "Bank Acoount number is required"],
    trim: true,
  },

    ifscCode: {
    type: String,
    required: [true, "IFSC code is required"],
    trim: true,
  },
  state:{
     type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },
    tehsil: {
    type: String,
    required: true,
  },


  interestedWork: [
    {
      type: String,
      enum: ["Recovery", "Startup", "Property", "Security"],
    },
  ],
 status: {
  type: String,
  enum: ["pending", "approved", "reject"],
  default: "pending"
},
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  
assignment: {
  assignedBy: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
  },
  assignedTo: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
  },
  assignedAt: Date,
},
remark: {
  type: String,
},
 isDeleted: {
    type: Boolean,
    default: false, 
  },


}, { timestamps: true });


export  const LFA =  mongoose.model("LFA", lfaSchema);
