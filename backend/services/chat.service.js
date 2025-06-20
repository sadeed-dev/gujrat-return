import ChatRoom from "../models/chatRoom.model.js";
import Message from "../models/message.model.js";
import {  sendNotificationToUser} from '../sockets/index.js';
import Notification from "../models/notifications.model.js";
import {sendMail} from '../utils/mail.utils.js'
import  User  from '../models/user.model.js'

export const createChatRoom = async ({ name, participants, lfa }) => {
  return await ChatRoom.create({ name, participants, lfa });
};

export const getChatRooms = async (userId) => {
 if (role === 'ADMIN') {
    return await ChatRoom.find().sort({ createdAt: -1 });
  } else {
    return await ChatRoom.find({ participants: userId, isDeleted: { $ne: true } }).sort({ createdAt: -1 });
  }};

// export const getRoomMessages = async (chatRoomId) => {
//   const a =  await Message.find({ room: chatRoomId }).sort({ timestamp: 1 });
//   return a
// };

export const saveMessage = async ({ room, sender, senderName, text }) => {
  return await Message.create({ room, sender, senderName, text });
};





export const createChatRoomWithFirstMessage = async ({
  name,
  participants,
  lfaId,
  offerLetter,
  senderName,
  adminId,
  createdByName
}) => {
  // ✅ 1. Create the chat room
  const chatRoom = await ChatRoom.create({
    name,
    participants,
    lfaId,
    createdBy: adminId,
    createdByName,
  });

  // ✅ 2. Save the first message (ensure correct chatRoomId)
  await Message.create({
    chatRoomId: lfaId, // This should be chatRoom._id, not lfaId
    senderId: adminId,
    senderName,
    message: offerLetter,
    timestamp: new Date(),
  });

  // ✅ 3. Fetch participant user details once
  const users = await User.find({ _id: { $in: participants } }).select('email name _id');

      const lfaIdMatch = chatRoom.name.match(/\((LFA\d+)\)/);
const extractedLfaId = lfaIdMatch ? lfaIdMatch[1] : 'Unknown';
  // ✅ 4. Prepare bulk notifications
  const notifications = users.map(user => ({
    title: "New Chat Room Created",
    message: `You have been added to a new chat room for LFA request ${extractedLfaId}`,
    type: "info",
    redirectionURL: `admin/lfas/chatRoom/${chatRoom._id}`,
    recipients: [user._id],
  }));

  // ✅ 5. Insert all notifications in one go
  const createdNotifications = await Notification.insertMany(notifications);

  // ✅ 6. Handle real-time delivery + email sending in parallel
  await Promise.all(users.map(async (user, index) => {
    const notification = createdNotifications[index];

    const payload = {
      _id: notification._id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      time: notification.createdAt,
      redirectionURL: notification.redirectionURL,
      isRead: notification.isRead,
    };

    // 🔔 Real-time delivery
    const wasDelivered = sendNotificationToUser(user._id.toString(), payload);
    if (!wasDelivered) {
      console.log(`📭 Notification saved but not delivered (user offline): ${user._id}`);
    }



    // 📧 Email delivery
await sendMail({
  to: user.email,
  subject: 'You have been added to a new Chat Room ',
  template: 'chat-room-invite.ejs',
  data: {
    name: user.name || 'there',
    lfaId: extractedLfaId,
  },
});

  }));

  return chatRoom;
};


export const getRoomMessages = async (chatRoomId) => {
  return await Message.find({  chatRoomId }).sort({ timestamp: 1 });
};





export const handleGetAllChatRooms = async (userId, role) => {
  if (role === 'ADMIN') {
    // ✅ Admin sees all chat rooms
    return await ChatRoom.find().sort({ createdAt: -1 });
  } else {
    // ✅ Other users see only their chat rooms
    return await ChatRoom.find({ participants: userId, isDeleted: { $ne: true } }).sort({ createdAt: -1 });
  }
};



export const handleDeleteChatRoom = async (chatRoomId) => {
  const chatRoom = await ChatRoom.findByIdAndUpdate(
    chatRoomId,
    { isDeleted: true },
    { new: true }
  );

  if (!chatRoom) {
    throw new Error("Chat room not found");
  }

  return chatRoom;
};



export const handleGetAlldeledChatRooms = async (userId, role) => {
  if (role === 'ADMIN') {
    // ✅ Admin sees all deleted chat rooms
    return await ChatRoom.find({ isDeleted: true }).sort({ createdAt: -1 });
  } else {
    // ✅ Other users see only their deleted chat rooms
    return await ChatRoom.find({ participants: userId, isDeleted: true }).sort({ createdAt: -1 });
  }
};


export const handleReactivateChatRoom = async (userId,lfaId) => {
  const chatRoom = await ChatRoom.findOneAndUpdate(
    { lfaId },
    { isDeleted: false },
    { new: true }
  );

  if (!chatRoom) {
    throw new Error("Chat room not found for the given LFA ID");
  }

  return chatRoom;
};
