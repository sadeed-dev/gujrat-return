import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetAllRooms } from "../../../../hook/use-lfachat.hook";

const ChatRoomsPage = () => {
  const { data: rooms = [] } = useGetAllRooms();
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ backgroundColor: "#f9fafb", minHeight: "100vh", p: 0 }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
        p={2}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight={500}
          sx={{ color: "#16a34a" }}
        >
          Chat Rooms
        </Typography>
      </Box>

      {rooms.length === 0 ? (
        <Card sx={{ textAlign: "center", py: 6, mx: 2 }}>
          <CardContent>
            <Typography
              variant="h5"
              sx={{ color: "#1f2937", fontWeight: 600, mb: 1 }}
            >
              No Chat Rooms Yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Send offers to users to create chat rooms for discussions.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2} sx={{ p: 2 }}>
          {rooms.map((room) => (
            <Grid item xs={12} md={6} lg={4} key={room.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.2s",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#1f2937" }}
                    >
                      {room.name.split(" - ")[0]}
                    </Typography>
                    {room.name.match(/\(([^)]+)\)/) && (
                      <Chip
                        label={room.name.match(/\(([^)]+)\)/)[1]}
                        variant="outlined"
                        size="small"
                        sx={{
                          backgroundColor: "#f9dedc",
                          borderColor: "#b3261e",
                          color: "#BF360C",
                        }}
                      />
                    )}
                  </Stack>

                  <Typography sx={{ mt: 1 }}>
                    Offered By: {room.createdByName}{" "}
                    <Box
                      component="span"
                      sx={{
                        backgroundColor: "#e0f2fe",
                        color: "#0284c7",
                        fontSize: "0.75rem",
                        px: 1,
                        py: 0.5,
                        borderRadius: "9999px",
                      }}
                    >
                      Admin
                    </Box>
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate(`/admin/lfas/chatroom/${room._id}`)}
                    sx={{
                      mt: 2,
                      backgroundColor: "#3b82f6",
                      "&:hover": { backgroundColor: "#2563eb" },
                    }}
                  >
                    Enter Room
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ChatRoomsPage;











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
import { useGetAllRooms, useGetChats } from "../../../../hook/use-lfachat.hook";
import { useGetAllUsers } from "../../../../hook/use-user.hook";
import socket from "../../../../socket/socket";

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: rooms = [] } = useGetAllRooms();
  const room = rooms.find((r) => r._id === roomId);

  const { data: allUsers } = useGetAllUsers();
  const { data: initialChats = [] } = useGetChats(room?.lfaId);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const chatRoomId = room?.lfaId;

  const participantNames = allUsers?.data
    ?.filter((u) => room?.participants?.includes(u._id))
    ?.map((u) => u.name);

  useEffect(() => {
    if (!room) return;

    socket.emit("joinRoom", { chatRoomId });
    if (initialChats) setMessages(initialChats);

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [chatRoomId, initialChats, room]);

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
    <Box sx={{ p: 3 }}>
      <Button onClick={() => navigate("/admin/lfas")} sx={{ mb: 2 }} variant="outlined">
        Back to Rooms
      </Button>

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
                          : new Date().toLocaleTimeString()}
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
  );
};

export default ChatRoom;