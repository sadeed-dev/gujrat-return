// controllers/auth.controller.js
import { register, loginUser,handleVerifyOtp, handleSendOtp,handleChangePassword } from '../services/auth.service.js';
import { sendNotificationToAdmins } from '../sockets/index.js';

export const handleRegister = async (req, res) => {
  try {
    const newUser = await register(req);
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const result = await loginUser(req.body);
      // 2. Send test notification to admins

    res.status(200).json({ message: 'Login successful', ...result });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};



export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

  const data = await handleSendOtp(email);
    res.status(200).json({ message: 'OTP sent successfully',data:data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

   const data = await handleVerifyOtp(email, otp);
    res.status(200).json({ message: 'OTP verified successfully' , data});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword, confirmPassword } = req?.body?.data;

    await handleChangePassword(userId, currentPassword, newPassword, confirmPassword);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};





