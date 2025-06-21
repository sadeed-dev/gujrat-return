import { LFA } from '../models/lfa.model.js';
import User from '../models/user.model.js';
import { uploadFileToS3 } from './s3.service.js';

import Notification from '../models/notifications.model.js';
import { sendNotificationToAdmins , sendNotificationToUser} from '../sockets/index.js';
import { sendMail } from '../utils/mail.utils.js';
import path from 'path'
import mongoose from 'mongoose';


// export const handleLfaSubmission = async (req) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const userId = req.user._id;

//     const aadhaarFile = req.files['aadhaarFile']?.[0];
//     const panFile = req.files['panFile']?.[0];

//     if (!aadhaarFile || !panFile) {
//       throw new Error('Both Aadhaar and PAN files are required');
//     }

//     // Upload files (outside transaction because S3 is external)
//     const [aadhaarUpload, panUpload] = await Promise.all([
//       uploadFileToS3(aadhaarFile, 'aadhaar'),
//       uploadFileToS3(panFile, 'pan'),
//     ]);

//     const {
//       name, mobileNumber, state, district, tehsil,
//       interestedWork, bankAccountNumber, ifscCode
//     } = req.body;

//     const lastEntry = await LFA.findOne().sort({ createdAt: -1 }).session(session);
//     const newIdNum = lastEntry ? parseInt(lastEntry.lfaId.slice(7)) + 1 : 1;
//     const lfaId = `LFA2025${String(newIdNum).padStart(4, '0')}`;

//     const newLfa = await LFA.create([{
//       lfaId,
//       name,
//       mobileNumber,
//       state,
//       district,
//       tehsil,
//       bankAccountNumber,
//       ifscCode,
//       interestedWork: Array.isArray(interestedWork) ? interestedWork : [interestedWork],
//       aadhaarFile: aadhaarUpload.Location,
//       panFile: panUpload.Location,
//       createdBy: userId,
//     }], { session });

//     const createdBy = await User.findById(userId).session(session);
//     const admins = await User.find({ role: 'ADMIN' }).session(session);
//     const adminIds = admins.map(admin => admin._id);

//     const notification = await Notification.create([{
//       title: 'New LFA Application',
//       message: `A new LFA application was submitted by ${name}`,
//       type: 'info',
//       redirectionURL: `/admin/lfas/${newLfa[0]._id}`,
//       recipients: adminIds,
//     }], { session });

//     await session.commitTransaction();
//     session.endSession();

//     // Send real-time notification and emails (outside the transaction)
//     sendNotificationToAdmins({
//       _id: notification[0]._id,
//       title: notification[0].title,
//       message: notification[0].message,
//       type: notification[0].type,
//       time: notification[0].createdAt,
//       redirectionURL: notification[0].redirectionURL,
//       isRead: notification[0].isRead,
//     });

//     for (const admin of admins) {
//       await sendMail({
//         to: admin.email,
//         subject: 'New LFA Request Received',
//         template: 'lfa-request-recieved.ejs',
//         data: {
//           userName: createdBy.name,
//           userEmail: createdBy.email,
//           userMobile: createdBy.mobileNumber,
//           lfa: newLfa[0],
//         },
//       });
//     }

//     return newLfa[0];

//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };

  export const handleLfaSubmission = async (req) => {
    const userId = req.user._id;


    const aadhaarFile = req.files['aadhaarFile']?.[0];
    const panFile = req.files['panFile']?.[0];

    if (!aadhaarFile || !panFile) {
      throw new Error('Both Aadhaar and PAN files are required');
    }

    const [aadhaarUpload, panUpload] = await Promise.all([
      uploadFileToS3(aadhaarFile, 'aadhaar'),
      uploadFileToS3(panFile, 'pan'),
    ]);

    const {
      name, mobileNumber, state, district, tehsil,
      interestedWork, bankAccountNumber,ifscCode
    } = req.body;

    const lastEntry = await LFA.findOne().sort({ createdAt: -1 });
    const newIdNum = lastEntry ? parseInt(lastEntry.lfaId.slice(7)) + 1 : 1;
    const lfaId = `LFA2025${String(newIdNum).padStart(4, '0')}`;

    const newLfa = await new LFA({
      lfaId,
      name,
      mobileNumber,
      state,
      district,
      tehsil,
      bankAccountNumber,
      ifscCode,
      interestedWork: Array.isArray(interestedWork) ? interestedWork : [interestedWork],
      aadhaarFile: aadhaarUpload.Location,
      panFile: panUpload.Location,
      createdBy: userId,
    }).save();


    const createdBy= await User.findOne({ _id: newLfa.createdBy})
    const admins = await User.find({ role: 'ADMIN' });
    const adminIds = admins.map(admin => admin._id);

    const notification = await Notification.create({
      title: 'New LFA Application',
      message: `A new LFA application was submitted by ${name}`,
      type: 'info',
      redirectionURL: `admin/lfas/${newLfa._id}`,
      recipients: adminIds,
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


  for (const admin of admins) {
    await sendMail({
      to: admin.email,
      subject: 'New LFA Request Received',
      template: 'lfa-request-recieved.ejs',
      data: {
        userName: createdBy.name,
        userEmail: createdBy.email, 
        userMobile: createdBy.mobileNumber,
        lfa: newLfa,
      },
    });
  }

    return newLfa;
  };




export const handleGetAllLFA = async (role, userId) => {
  if (role === 'ADMIN') {
    // Admin sees all LFAs
    return await LFA.find().sort({ submittedAt: -1 });
  } else {
    // Normal user sees only their own LFAs
    return await LFA.find({ createdBy: userId }).sort({ submittedAt: -1 });
  }
};


export const handleGetLFA = async (id) => {
  return await LFA.findById(id)
}


export const handleAssignedLFA = async (lfaId, assignedById, assignedToId) => {

  const [assignedByUser, assignedToUser] = await Promise.all([
    User.findById(assignedById).select('name email'),
    User.findById(assignedToId).select('name email'),
  ]);

  if (!assignedByUser || !assignedToUser) {
    console.error('assignedByUser:', assignedByUser);
    console.error('assignedToUser:', assignedToUser);
    throw new Error('One or both users not found in DB');
  }
  


  const updatedLFA = await LFA.findByIdAndUpdate(
    lfaId,
    {
      assignment: {
        assignedBy: {
          _id: assignedByUser._id,
          name: assignedByUser.name,
          email: assignedByUser.email,
        },
        assignedTo: {
          _id: assignedToUser._id,
          name: assignedToUser.name,
          email: assignedToUser.email,
        },
        assignedAt: new Date(),
      },
    },
    { new: true }
  );


   // --- Notification for assigned user ---
  const notification = await Notification.create({
    title: 'LFA Assigned',
    message: `You have been assigned a new LFA  ${updatedLFA.lfaId} request by ${assignedByUser.name}`,
    type: 'info',
    redirectionURL: `admin/task/view/${updatedLFA?._id}`, // or wherever user sees their assigned LFAs
    recipients: [assignedToUser._id],
  });

  sendNotificationToUser(assignedToUser._id.toString(), {
    _id: notification._id,
    title: notification.title,
    message: notification.message,
    type: notification.type,
    time: notification.createdAt,
    redirectionURL: notification.redirectionURL,
    isRead: notification.isRead,
  });


  // After notification send mail 
  await sendMail({
    to: assignedToUser.email,
    subject: 'You have been assigned a new LFA',
    template: 'lfa-assigned.ejs',
    data: {
      userName: assignedToUser.name,
      assignedBy: assignedByUser.name,
      lfa: updatedLFA,
    },
  }); 
  return updatedLFA;
  
};



export const handleGetAssignedLFAs = async (userId) => {
  const assignedLFAs = await LFA.find({ 'assignment.assignedTo': userId });
  return assignedLFAs;
};


// Get all assigned LFAs, regardless of who they were assigned to
export const handleGetAllAssignedLFAs = async (user) => {
  if(user.role === 'ADMIN'){
  // Admin sees all LFAs
  const getAllassignedLFAs = await LFA.find({ 'assignment.assignedTo': { $exists: true } });
  return getAllassignedLFAs;  
  }else{
     const assignedLFAs = await LFA.find({ 'assignment.assignedTo._id': user._id });
  return assignedLFAs;
  }


  

};



// update lfa status
export const handleUpdateLfaStatus = async (lfaId, status) => {
  const updatedLfaStatus = await LFA.findByIdAndUpdate(
    lfaId,
    { status },
    { new: true }
  );
 // Notify the user who submitted the task
  const userId = updatedLfaStatus.assignment.assignedTo._id;
  const notification = await Notification.create({
    title: `Task ${status === 'approved' ? 'Approved' : 'Rejected'}`,
    message: `Your submitted task has been ${status}.`,
    type: status === 'approved' ? 'success' : 'error',
    redirectionURL: `/user/tasks/${updatedLfaStatus._id}`,
    recipients: [userId],
  });

  sendNotificationToUser(userId?.toString(), {
    _id: notification._id,
    title: notification.title,
    message: notification.message,
    type: notification.type,
    time: notification.createdAt,
    redirectionURL: notification.redirectionURL,
    isRead: notification.isRead,
  });

  //send mail 
    const user = await User.findById(userId);

  //   await sendMail({
  //   to: user.email,
  //   subject: `Your task has been ${status}`,
  //   template: 'task-status.ejs',
  //   data: {
  //     userName: user.name,
  //     lfaId: updatedLfaStatus._id,
  //     status,
  //   },
  // });
  return updatedLfaStatus;

};



export const handleUpdateLFA = async (req) => {

const userId = new mongoose.Types.ObjectId(req.user._id);
const id = new mongoose.Types.ObjectId(req.params.id);  
const userRole = req.user.role; 

  // Allow admin to update any LFA, regular users only their own
  const query = userRole === 'ADMIN' ? { _id: id } : { _id: id, createdBy: userId };

  const existingLfa = await LFA.findOne(query);

  if (!existingLfa) {
    throw new Error('LFA record not found or unauthorized');
  }
  // File handling
  const aadhaarFile = req.files?.['aadhaarFile']?.[0];
  const panFile = req.files?.['panFile']?.[0];

  let aadhaarUploadUrl = existingLfa.aadhaarFile;
  let panUploadUrl = existingLfa.panFile;

  if (aadhaarFile) {
    const { Location } = await uploadFileToS3(aadhaarFile, 'aadhaar');
    aadhaarUploadUrl = Location;
  }

  if (panFile) {
    const { Location } = await uploadFileToS3(panFile, 'pan');
    panUploadUrl = Location;
  }

  const {
    name,
    mobileNumber,
    state,
    district,
    tehsil,
    interestedWork,
    bankDetail,
    bankAccountNumber,
    ifscCode,
} = req.body || {};
  // Define fields to update
  const fieldsToUpdate = {
    name,
    mobileNumber,
    state,
    district,
    tehsil,
    bankDetail,
    bankAccountNumber,
    ifscCode,
  };

  // Update only provided fields
  for (const [key, value] of Object.entries(fieldsToUpdate)) {
    if (value !== undefined) {
      existingLfa[key] = value;
    }
  }

  // Special handling for interestedWork
  if (interestedWork !== undefined) {
    existingLfa.interestedWork = Array.isArray(interestedWork)
      ? interestedWork
      : [interestedWork];
  }

  // Update file URLs
  existingLfa.aadhaarFile = aadhaarUploadUrl;
  existingLfa.panFile = panUploadUrl;

  return await existingLfa.save();
};
