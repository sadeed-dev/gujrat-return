



import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/auth/AuthContext";
import { useDiscloseChatRoom, useGetAllRooms, useGetChats } from "../../../../hook/use-lfachat.hook";
import { useGetAllUsers } from "../../../../hook/use-user.hook";
import socket from "../../../../socket/socket";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import AdminLayout from "../../../../components/AdminLayout";
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ConfirmDialog from "../dialog-box/ConfirmDialog";
const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: rooms = [] } = useGetAllRooms();
  const room = rooms.find((r) => r._id === roomId);


const { mutate: discloseChatRoom, isPending: loadingDisclose } = useDiscloseChatRoom();

  const { data: allUsers } = useGetAllUsers();
  const { data: initialChats = [] } = useGetChats(room?.lfaId);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);


  
const handleDisclose = () => {
  discloseChatRoom(
    { id: room._id },
    {
      onSuccess: () => {
        setDiscloseDialog(false);
        navigate('/admin/lfas?tab=chat');
        // Optionally show another toast or run any other logic here
      },
    }
  );
};


    const [discloseDialog, setDiscloseDialog] = useState(false);

  const chatRoomId = room?.lfaId;

  const participantNames = allUsers?.data
    ?.filter((u) => room?.participants?.includes(u._id))
    ?.map((u) => u.name);

useEffect(() => {
  if (!room || !initialChats) return;

  socket.emit("joinRoom", { chatRoomId });

  setMessages(initialChats); // Set only once when room and chats are ready

  const handleNewMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  socket.on("newMessage", handleNewMessage);

  return () => {
    socket.off("newMessage", handleNewMessage);
  };
  // Only depend on `room?._id` and `initialChats?.length` to avoid unnecessary triggers
}, [room?._id, initialChats?.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      chatRoomId,
      senderId: user?.id || user?._id,
      senderName: user?.name,
      message: newMessage,
    });

    setNewMessage("");
  };

  if (!room) {
    return (
   <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Room not found.
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/admin/lfas")}>
          Back
        </Button>
      </Box>
   
    );
  }

  return (
          <AdminLayout>

    <Box sx={{ p: 3 }}>
<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
  <Button
    onClick={() => navigate("/admin/lfas?tab=chat")}
    variant="outlined"
  >
    Back to Rooms
  </Button>

  <Tooltip title="Offer Disclosed">
    <span>
     {
user?.role === "ADMIN" && (
  <>

   <Button
        onClick={() => setDiscloseDialog(true)} // ⬅️ This now opens the confirmation dialog
        variant="outlined"
        color="error"
        disabled={loadingDisclose}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <DeleteOutlineIcon />
        Offer Disclose
      </Button>
  </>
)
     }
    </span>
  </Tooltip>
</Box>



      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            {room?.name}
          </Typography>

          <Box display="flex" gap={1} mb={2} flexWrap="wrap">
            {participantNames?.map((p, i) => (
              <Chip key={i} label={p} color="primary" variant="outlined" />
            ))}
          </Box>

          <Box
            sx={{
              minHeight: 300,
              maxHeight: 400,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              mb: 2,
              pr: 1,
            }}
          >
            {messages?.map((msg, idx) => {
              const isMe = msg.senderId === user.id || msg.sender === user.id;
              const isOffer = idx === 0 || msg.message?.startsWith("Offer Letter");

              let structuredOffer = null;
              if (isOffer) {
                const lines = msg.message.split("\n").filter((line) => line.trim() !== "");
                structuredOffer = lines.map((line, i) => {
                  const [label, ...rest] = line.split(":");
                  const trimmedLabel = label.trim();
                  const value = rest.join(":").trim();
                  return (
                    <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                      {trimmedLabel && value ? (
                        <>
                          <strong>{trimmedLabel}:</strong> {value}
                        </>
                      ) : (
                        trimmedLabel || value
                      )}
                    </Typography>
                  );
                });
              }

              return (
                <Box
                  key={msg._id}
                  display="flex"
                  justifyContent={isMe ? "flex-end" : "flex-start"}
                >
                  <Box
                    display="flex"
                    flexDirection={isMe ? "row-reverse" : "row"}
                    alignItems="flex-start"
                  >
                    <Avatar sx={{ width: 32, height: 32, mx: 1 }}>
                      {msg?.senderName?.[0] || "?"}
                    </Avatar>
                    <Box
                      sx={{
                        bgcolor: isOffer ? "#fef9c3" : isMe ? "#dcfce7" : "#f3f4f6",
                        border: isOffer ? "2px solid #fde047" : undefined,
                        color: "#222",
                        borderRadius: 3,
                        px: 2,
                        py: 1,
                        maxWidth: "70%",
                        boxShadow: 2,
                        wordBreak: "break-word",
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {msg.senderName}
                      </Typography>
                      {isOffer ? (
                        <Box>{structuredOffer}</Box>
                      ) : (
                        <Typography variant="body2" sx={{ whiteSpace: "pre-line", mb: 0.5 }}>
                          {msg.message || "(No message)"}
                        </Typography>
                      )}
                      <Typography variant="caption" color="text.secondary">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleTimeString()
                          : "Just now"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
            <div ref={messagesEndRef} />
          </Box>

          <form onSubmit={handleSendMessage} style={{ display: "flex", gap: 8 }}>
            <TextField
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              size="small"
              sx={{ flex: 1 }}
            />
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#16a34a" }}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>




    
        {/* Disclose Confirmation Dialog */}
      <ConfirmDialog
  open={discloseDialog}
  title="Disclose Offer"
  content="Are you sure you want to disclose this lfa offer? "
  onCancel={() => setDiscloseDialog(false)}
  onConfirm={handleDisclose}
  confirmLabel={loadingDisclose ? "Disclosing..." : "Disclose Offer"}
  cancelLabel="Cancel"
  themeColor="#dc2626" // red to match destructive action
/>
        
    </AdminLayout>
  );
};

export default ChatRoom;