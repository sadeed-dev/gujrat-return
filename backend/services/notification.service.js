// services/notificationService.js
import Notification from '../models/notifications.model.js';

export const handleGetNotifications = async (userId) => {
    return await Notification.find({ recipients: userId }).sort({ createdAt: -1 });

};




export const handleMarkNotificationRead = async (req) => {
  return  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });

};
