import express from "express";
import { createRoom, getRooms, getMessages ,deleteChatRoom,getAllChatRooms,reactivateChatRoom, getAlldeledChatRooms,postMessage, createRoomWithFirstMessage} from "../controllers/chat.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/room", isAuthenticated, createRoom);
router.get("/rooms", isAuthenticated, getRooms);
router.get("/messages/:chatRoomId", isAuthenticated, getMessages);
router.post("/message",isAuthenticated, postMessage);
router.post("/room-with-offer", isAuthenticated, createRoomWithFirstMessage);

router.get("/all-rooms",isAuthenticated, getAllChatRooms);
router.patch('/delete/:chatRoomId', deleteChatRoom);

router.patch('/reactive-chat-room/:lfaId', isAuthenticated, reactivateChatRoom);
router.get('/get-deleted-rooms', isAuthenticated, getAlldeledChatRooms);

export default router;