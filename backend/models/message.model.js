import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//   room: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom", required: true },
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   senderName: { type: String },
//   text: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const Message = mongoose.model("Message", messageSchema);
// export default Message;




const messageSchema = new mongoose.Schema({
  chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderName:{type:String, required:true},
  message: { type: String, required: true },
  readBy: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lastReadAt: { type: Date }
  }],

}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

 export default Message;
