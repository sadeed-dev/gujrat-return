import Message from "../models/message.model.js";
import Location from "../models/location.model.js";
import { reverseGeocode } from "../utils/reverse.geocode.js";

export const setupChatSocket = (io) => {
  io.on("connection", (socket) => {
    // Join room
    socket.on("joinRoom", ({ chatRoomId }) => {
      socket.join(chatRoomId);
    });

 // Handle sending message
socket.on("sendMessage", async ({ chatRoomId, senderId,senderName, message }) => {
  try {
    const msg = await Message.create({
      chatRoomId,
      senderId,
     senderName,
      message,
    });

    io.to(chatRoomId).emit("newMessage", {
      _id: msg._id,
      chatRoomId,
      senderId,
      message,
      senderName,
      timestamp: msg.createdAt,
    });
  } catch (error) {
    console.error("Error sending message:", error);

    // Optionally, send error back to client
    socket.emit("errorMessage", {
      message: "Failed to send message",
      details: error.message,
    });
  }
});


  // ====== Location Events ======
//  socket.on("updateLocation", async ({ userId, name, lat, lng, state, district, tehsil }) => {
//       try {
//         const updatedLocation = await Location.findOneAndUpdate(
//           { userId },
//           { lat, lng, name, state, district, tehsil, updatedAt: new Date() },
//           { upsert: true, new: true }
//         );

//         io.emit("locationUpdate", {
//           userId,
//           name,
//           lat,
//           lng,
//           state,
//           district,
//           tehsil,
//           updatedAt: updatedLocation.updatedAt,
//         });
//       } catch (error) {
//         console.error("Error updating location:", error);
//         socket.emit("errorLocationUpdate", {
//           message: "Failed to update location",
//           details: error.message,
//         });
//       }
//     });


socket.on("updateLocation", async ({ userId, lat, lng, name }) => {
  try {
    const { state, district, tehsil, location, pincode } = await reverseGeocode(lat, lng);

    const updatedLocation = await Location.findOneAndUpdate(
      { userId },
      {
        lat,
        lng,
        state,
        district,
        tehsil,
        location,
        pincode,
        name,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    io.emit("locationUpdate", {
      userId,
      name,
      lat,
      lng,
      state,
      district,
      tehsil,
      location,
      pincode,
      updatedAt: updatedLocation.updatedAt
    });
  } catch (err) {
    console.error("Socket location update error:", err);
    socket.emit("errorLocationUpdate", {
      message: "Update failed",
      details: err.message
    });
  }
});


  

  });
};