import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info', // e.g., 'form-submission', 'system', etc.
  },
  isRead: {
    type: Boolean,
    default: false,
  },

  redirectionURL: {
    type: String,
  },
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // for multi-admin

 
},{ timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
