// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useRef,
// } from "react";
// import { io } from "socket.io-client";

// const NotificationContext = createContext();
// export const useNotification = () => useContext(NotificationContext);

// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// export const NotificationProvider = ({ user, children }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [userInteracted, setUserInteracted] = useState(false);
//   const socketRef = useRef(null);
//   const audioRef = useRef(null);

//   // Detect first user interaction
//   useEffect(() => {
//     const enableSound = () => {
//       setUserInteracted(true);
//       window.removeEventListener("click", enableSound);
//     };

//     window.addEventListener("click", enableSound);
//     return () => window.removeEventListener("click", enableSound);
//   }, []);

//   // Socket logic
//   useEffect(() => {
//     if (!user) return;

//     socketRef.current = io(SOCKET_URL, {
//       transports: ["websocket"],
//       withCredentials: true,
//     });

//     socketRef.current.on("connect", () => {
//       console.log("Socket connected:", socketRef.current.id);
//       socketRef.current.emit("register", user);
//     });

//     socketRef.current.on("connect_error", (err) => {
//       console.error("Socket connection error:", err);
//     });

//  socketRef.current.on("notification", (notification) => {
//   console.log("📩 Notification received:", notification);
//   setNotifications((prev) => [notification, ...prev]);

//   // Play sound — now allowed because of prior interaction
//   if (audioRef.current) {
//     audioRef.current.play().catch((err) => {
//       console.warn("Notification sound blocked:", err);
//     });
//   }
// });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [user]);

//   return (
//     <NotificationContext.Provider value={{ notifications }}>
//       {children}
//       {/* Audio tag — make sure /assets/notification.mp3 exists in public folder */}
//       <audio ref={audioRef} src="/assets/notification.mp3" preload="auto" />
//     </NotificationContext.Provider>
//   );
// };




import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "sonner";
import socket from "../socket/socket"; // ✅ shared socket instance

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const NotificationProvider = ({ user, children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  // Socket logic
  useEffect(() => {
    if (!user) return;

    // Configure socket auth and connect if not connected
    socket.auth = { token: user.token };

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("login", { _id: user.id || user._id, role: user.role });

    const handleNotification = (notification) => {
      setNotifications(prev => [notification, ...prev]);
      if (audioRef.current) audioRef.current.play();
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification); // ✅ safely remove listener
      // ⛔ Do not disconnect socket here – it might be used by other components
    };
  }, [user]);

  // Load initial notifications
  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line
  }, [user]);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`${API_URL}/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success("Notification is Read");
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, isRead: true } : n)
      );
    } catch (err) {
      toast.error("Failed to mark as read");
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead, fetchNotifications, loading }}>
      {children}
      <audio ref={audioRef} src="/assets/notification_ding.mp3" preload="auto" />
    </NotificationContext.Provider>
  );
};
