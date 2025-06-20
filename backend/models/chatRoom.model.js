// import mongoose from "mongoose";


// const chatRoomSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   lfa: { type: Object }, // Store LFA object if needed
//   createdAt: { type: Date, default: Date.now },
// });

// const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
// export default ChatRoom;


import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
  lfaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LFA', // Assuming your LFA model is named 'Lfa'
    required: true,
  },
   name: { type: String, required: true },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
    createdByName: {
    type:String,
    required: true,
  },
 
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
 

}, { timestamps: true });

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
export default ChatRoom;