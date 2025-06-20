// controllers/notificationController.js
import { handleGetNotifications,handleMarkNotificationRead } from '../services/notification.service.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await handleGetNotifications(req.user._id);
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const markNotificationRead = async (req, res) => {
  try {
    const notifications = await handleMarkNotificationRead(req);
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
