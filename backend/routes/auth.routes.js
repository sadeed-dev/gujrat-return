import express from 'express';
import {handleRegister, handleLogin , sendOtp, verifyOtp,changePassword} from '../controllers/auth.contoller.js'
import { uploadAadhaarAndPan, fileSizeCheckMiddleware } from '../middlewares/fileUpload.middleware.js';
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post('/register',  uploadAadhaarAndPan,fileSizeCheckMiddleware, handleRegister);

router.post('/login', handleLogin);


router.post("/change-password", isAuthenticated, changePassword);


router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);


export default router;