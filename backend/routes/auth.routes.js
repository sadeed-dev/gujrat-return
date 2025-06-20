import express from 'express';
import {handleRegister, handleLogin , sendOtp, verifyOtp} from '../controllers/auth.contoller.js'
import { uploadAadhaarAndPan, fileSizeCheckMiddleware } from '../middlewares/fileUpload.middleware.js';

const router = express.Router();


router.post('/register',  uploadAadhaarAndPan,fileSizeCheckMiddleware, handleRegister);

router.post('/login', handleLogin);



router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);


export default router;