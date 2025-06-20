import express from 'express';
import {submitAssingedTask,reviewCompletedTask , getAllCompletedTask,updateAssingedTask,deleteTaskImage} from '../controllers/task.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { uploadImagesMiddleware } from '../middlewares/fileUpload.middleware.js';


const router = express.Router();


router.post('/submit',isAuthenticated, uploadImagesMiddleware  ,submitAssingedTask);
router.get('/view/' ,getAllCompletedTask )

router.get('/view/:lfaId' ,reviewCompletedTask )

router.patch('/update/:id',isAuthenticated ,uploadImagesMiddleware, updateAssingedTask )

router.delete('/image', isAuthenticated,deleteTaskImage );
export default router;