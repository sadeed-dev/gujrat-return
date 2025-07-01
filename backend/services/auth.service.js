import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/mail.utils.js';
import { uploadFileToS3 } from './s3.service.js';
import Otp from '../models/otp.model.js';

// REGISTER
export const register = async (req) => {
  const { name, email, state, district, tehsil, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const aadhaarFile = req.files['aadhaarFile']?.[0];
  const panFile = req.files['panFile']?.[0];

  if (!aadhaarFile || !panFile) {
    throw new Error('Both Aadhaar and PAN files are required');
  }




  const [aadhaarUpload, panUpload] = await Promise.all([
    uploadFileToS3(aadhaarFile, 'Register/aadhaar'),
    uploadFileToS3(panFile, 'Register/pan')
  ]);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    state,
    district,
    tehsil,
    password: hashedPassword,
    aadhaarFile: aadhaarUpload.Location,
    panFile: panUpload.Location,
  });


  const newUser = await user.save();
  const admins = await User.find({ role: 'ADMIN' });

  for (const admin of admins) {
    await sendMail({
      to: admin.email,
      subject: 'New User Registered',
      template: 'new-user-registered.ejs',
      data: {
        adminName: admin.name,
        user: newUser,
      },
    });
  }
  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email
  };
};



// LOGIN
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('This email is not registered');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role
    },
     process.env.JWT_SECRET,
    // { expiresIn: '2d' }
  );

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      state: user.state,
      district: user.district,
      tehsil: user.tehsil,
      token
    },
  };
};






export const sendOtpService = async (email) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email });

  const otp = new Otp({ email, otp: otpCode });
  await otp.save();

  await sendMail(email, 'Your OTP Code', `Your OTP is: ${otpCode}`);
};


export const handleSendOtp = async (email) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email });

  const otp = new Otp({ email, otp: otpCode });
  await otp.save();


  await sendMail({
    to: email,
    subject: 'Your OTP Code',
    template: 'otp.ejs',
    data: { otp: otpCode }
  });
};


export const handleVerifyOtp = async (email, otp) => {
  const existing = await Otp.findOne({ email, otp });
  if (!existing) throw new Error('Invalid or expired OTP');

  await Otp.deleteMany({ email });
};


// services/user.service.js


export const handleChangePassword= async (userId, currentPassword, newPassword, confirmPassword) => {
  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const user = await User.findById(userId);

  // 3. Check current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  // Direct hashing without external utility
 // 4. Hash new password and save
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();


  return true;
};
