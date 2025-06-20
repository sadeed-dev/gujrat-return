import { createChatRoom, getChatRooms,handleDeleteChatRoom,handleReactivateChatRoom, handleGetAllChatRooms,handleGetAlldeledChatRooms, getRoomMessages, saveMessage,createChatRoomWithFirstMessage } from "../services/chat.service.js";

export const createRoom = async (req, res) => {
  try {
    const { name, participants, lfa } = req.body;
    const room = await createChatRoom({ name, participants, lfa });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await getChatRooms(req.user._id);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await getRoomMessages(req.params.chatRoomId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const postMessage = async (req, res) => {
  try {
    console.log("📩 Incoming request body:", req.body); // <-- ADD THIS

    const { room, sender, senderName, text } = req.body;

    const message = await saveMessage({ room, sender, senderName, text });
    res.status(201).json(message);
  } catch (err) {
    console.error("❌ Error saving message:", err); // <-- ADD THIS TOO
    res.status(500).json({ error: err.message });
  }
};



export const createRoomWithFirstMessage = async (req, res) => {
  try {
    const {  participants, lfaId,offerLetter,name , createdByName} = req.body;
    const adminId = req.user._id;
        const senderName = req.user.name;

    const room = await createChatRoomWithFirstMessage({
      participants,
      lfaId,
      offerLetter,
      adminId,
      name,
      senderName,
      createdByName
    });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllChatRooms = async (req, res) => {
  try {
    const rooms = await handleGetAllChatRooms(req.user._id, req.user.role)

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const deleteChatRoom = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const chatRoom = await handleDeleteChatRoom(chatRoomId);
    res.json({ message: "Offer disclosed (chat room soft deleted)", chatRoom });
  } catch (err) {
    const status = err.message === "Chat room not found" ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
};

export const getAlldeledChatRooms = async (req, res) => {
  try {
    const rooms = await handleGetAlldeledChatRooms(req.user._id, req.user.role,);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const reactivateChatRoom = async (req, res) => {
  try {
    const rooms = await handleReactivateChatRoom(req.user._id, req.params.lfaId, );
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};