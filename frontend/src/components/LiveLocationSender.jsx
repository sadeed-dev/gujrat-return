import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust as needed

export default function LiveLocationSender({ user }) {
  useEffect(() => {
    
    if (!user) return;
    const sendLocation = (pos) => {
      socket.emit("updateLocation", {
        userId: user.id,
        name: user.name,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    };

    const watchId = navigator.geolocation.watchPosition(sendLocation);
    return () => navigator.geolocation.clearWatch(watchId);
  }, [user]);
  return null;
}