import express from 'express';
import { submitLFAForm, getAllLFA ,getLFA, assignedLFA, getAssignedLFAs, getAllAssignedLFAs,updateLfaStatus,updateLFA} from '../controllers/lfa.controller.js';
import { uploadAadhaarAndPan, fileSizeCheckMiddleware } from '../middlewares/fileUpload.middleware.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/submit',isAuthenticated, uploadAadhaarAndPan, fileSizeCheckMiddleware, submitLFAForm);

router.patch('/update/:id',isAuthenticated,uploadAadhaarAndPan, updateLFA);

router.get('/assigned-lfa-list',isAuthenticated, getAllAssignedLFAs);


router.get('/',isAuthenticated, getAllLFA); 

router.get('/:id', getLFA )   ; // Route to view single lfa application

router.patch('/:lfaId', isAuthenticated,  assignedLFA )   ; 

//get assigned lfa by a specif user 
router.get('/assigned-lfa', isAuthenticated, getAssignedLFAs);

router.patch('/update-lfa-status/:lfaId', isAuthenticated, updateLfaStatus);




export default router