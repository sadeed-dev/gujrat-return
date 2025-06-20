import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import NotificationList from "./Notification"; // <-- Import here
import { Tooltip } from '@mui/material';

const NotificationBell = () => {
  const { notifications } = useNotification();
  const [open, setOpen] = useState(false);
  const bellRef = useRef();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClick = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={bellRef}>
      <Tooltip title="Notifications">

      <button
        type="button"
        className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="h-6 w-6 cursor-pointer" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>
      </Tooltip>
      {open && <NotificationList />}
    </div>
  );
};

export default NotificationBell;