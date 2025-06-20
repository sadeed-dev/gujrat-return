import express from 'express';
import {getAllUsers, getUser,updateUser, deleteUser,updateUserStatus} from '../controllers/user.contoller.js'
import { uploadAadhaarAndPan, fileSizeCheckMiddleware } from '../middlewares/fileUpload.middleware.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';


const router = express.Router();


router.get('/get-users', getAllUsers);
router.get('/get-user/:id', getUser);

router.patch('/update-status/:id', updateUserStatus)
router.patch('/update/:id',isAuthenticated,uploadAadhaarAndPan,  updateUser);

router.delete('/delete/:id', deleteUser);




export default router;