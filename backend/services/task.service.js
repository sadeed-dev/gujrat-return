import { uploadFileToS3 } from './s3.service.js';
import Task from '../models/task.model.js';
import { LFA } from '../models/lfa.model.js';
import { sendNotificationToAdmins , sendNotificationToUser} from '../sockets/index.js';
import Notification from '../models/notifications.model.js';
import { sendMail } from '../utils/mail.utils.js';
import User from '../models/user.model.js';
export const handleSubmitAssingedTask = async (req) => {
  const userId = req.user._id; 
  const images = req.files?.images || [];


  if (!images.length) {
    throw new Error("At least one image is required.");
  }

  // Upload images to S3
  const uploadedImages = await Promise.all(
    images.map(file => uploadFileToS3(file, 'lfa-task-submission'))
  );

  const { lfaId, title, description, imageDetails , interestedWork} = req.body;

  // Ensure interestedWork is always an array
const parsedInterestedWork = Array.isArray(interestedWork)
  ? interestedWork
  : [interestedWork];

const newEntry = new Task({
  lfaId, // This should be an ObjectId reference to the LFA
  title,
  description,
  interestedWork:parsedInterestedWork,
  images: uploadedImages.map(img => img.Location), // URLs from S3
  submittedBy: userId, // Match schema field name
});

  const savedTask = await newEntry.save();



  // Find the LFA to get the assigned admin
  const lfa = await LFA.findOne({ lfaId });

  const adminId = lfa?.assignment?.assignedBy?._id;
  if (adminId) {
    const notification = await Notification.create({
      title: 'Task Submitted',
      message: `A ${lfa?.assignment?.assignedTo?.name} has submitted a task for LFA ${(lfaId)}`,
      type: 'info',
      redirectionURL: `admin/task?lfaId=${lfa._id}`,
      recipients: [adminId],
    });

    
    sendNotificationToAdmins({
      _id: notification._id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      time: notification.createdAt,
      redirectionURL: notification.redirectionURL,
      isRead: notification.isRead,
    });
    
};

  const admins = await User.find({ role: 'ADMIN' });

  // Send email to all admins with images
  for (const admin of admins) {
    await sendMail({
      to: admin.email,
      subject: 'A user has submitted a task',
      template: 'task-submitted.ejs',
      data: {
        userName: req.user.name,
        lfaId,
        title,
        description,
        images: uploadedImages.map(img => img.Location),
      },
    });
  }

  return savedTask;



  }


export const handleReviewCompletedTask = async (lfaId) => {
  const task = await Task.find({ lfaId: lfaId });

  if (task.length === 0) {
    // Instead of throwing an error, return a message
    return {
      success: true,
      message: "Task not found",
      data: [],
    };
  }

  // Return the task if found
  return task

};




export const handlegetAllCompletedTask = async () => {
  try {
    const tasks = await Task.find(); 

    if (!tasks || tasks.length === 0) {
      return {
        message: "No submitted tasks found",
        data: [],
      };
    }

    return tasks
    
  } catch (error) {
    throw new Error("Failed to fetch submitted tasks: " + error.message);
  }
};





export const handleUpdateAssingedTask = async (req) => {
  const taskId = req.params.id;
  const userId = req.user._id; // Ensure this is from authentication middleware
  const images = req.files?.images || [];

  const { title, description, imageDetails ,interestedWork} = req.body;

  // Find the task
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('Task not found');
  }

  const parsedInterestedWork = Array.isArray(interestedWork)
  ? interestedWork
  : [interestedWork];


  // Upload new images if any
  let uploadedImages = [];
  if (images.length) {
    uploadedImages = await Promise.all(
      images.map(file => uploadFileToS3(file, 'lfa-task-submission'))
    );
  }

  // Update fields if provided
  if (title) task.title = title;
  if (description) task.description = description;
    if (interestedWork.length){
      task.interestedWork =parsedInterestedWork
    }

  if (uploadedImages.length) {
    task.images = [...task.images, ...uploadedImages.map(img => img.Location)];
  }

  // Optional: Handle imageDetails or other fields
  if (imageDetails) task.imageDetails = imageDetails;

  return await task.save();
};


