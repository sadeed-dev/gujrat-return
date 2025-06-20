import React, { useState } from "react";
import { useNotification } from "../../context/NotificationContext.jsx";
import { CheckCircle, Circle, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const themeColor = "#16a34a"; // Emerald

const NotificationList = ({ onClose }) => {
  const { notifications, markAsRead, fetchNotifications, loading } = useNotification();
  const [tab, setTab] = useState("unread");
  const navigate = useNavigate();

  const unread = notifications.filter((n) => !n.isRead);
  const read = notifications.filter((n) => n.isRead);

  const displayList = tab === "unread" ? unread : read;

  const handleNotificationClick = (n) => {

    if (!n.isRead) markAsRead(n._id);
    if (onClose) onClose();
    if (n.redirectionURL) navigate(`/${n.redirectionURL}`);
  };

  return (
    <div className="fixed top-14 right-6 z-50 w-[370px] max-w-full">
      <div className="bg-white rounded-xl shadow-2xl border border-emerald-100 overflow-hidden">
        <div className="flex border-b items-center justify-between px-4 py-2">
          <div className="flex flex-1">
            <button
              className={`flex-1 py-2 font-semibold text-base transition ${
                tab === "unread"
                  ? "text-white bg-[oklch(0.7_0.15_160deg)]"
                  : "text-[oklch(0.7_0.15_160deg)] bg-white hover:bg-[oklch(0.95_0.05_160deg)]"
              }`}
              onClick={() => setTab("unread")}
            >
              Unread ({unread.length})
            </button>
            <button
              className={`flex-1 py-2 font-semibold text-base transition ${
                tab === "read"
                  ? "text-white bg-[oklch(0.7_0.15_160deg)]"
                  : "text-[oklch(0.7_0.15_160deg)] bg-white hover:bg-[oklch(0.95_0.05_160deg)]"
              }`}
              onClick={() => setTab("read")}
            >
              Read ({read.length})
            </button>
          </div>
        <button
  className="ml-2 p-2 rounded-full hover:bg-emerald-50 transition cursor-pointer"
  onClick={fetchNotifications}
  title="Reload notifications"
  disabled={loading}
>
  <RotateCcw
    className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
    style={{ color: themeColor }}
  />
</button>

        </div>
        <div className="max-h-[420px] overflow-y-auto">
          {displayList.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              {tab === "unread" ? "No unread notifications" : "No read notifications"}
            </div>
          )}
          {displayList.map((n) => (
            <div
              key={n._id}
              className={`flex items-start gap-3 px-5 py-4 border-b last:border-b-0 transition cursor-pointer ${
                !n.isRead
                  ? "bg-white hover:bg-[oklch(0.98_0.02_160deg)]"
                  : "bg-white hover:bg-[oklch(0.98_0.02_160deg)]"
              }`}
              onClick={() => handleNotificationClick(n)}
            >
              <button
                className="mt-1"
                title={n.isRead ? "Read" : "Mark as read"}
                onClick={e => {
                  e.stopPropagation();
                  if (!n.isRead) markAsRead(n._id);
                }}
                style={{ color: n.isRead ? "#a3a3a3" : themeColor }}
              >
                {n.isRead ? <CheckCircle size={20} /> : <Circle size={20} />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[oklch(0.7_0.15_160deg)] truncate">
                  {n.title}
                </div>
                <div className="text-gray-700 text-sm mb-1">{n.message}</div>
                <div className="text-xs text-gray-400">
                  {new Date(n.createdAt || n.time).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationList;