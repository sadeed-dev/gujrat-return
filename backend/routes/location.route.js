import express from 'express';
import { updateLocation, getLocations } from '../controllers/location.contoller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/update', isAuthenticated, updateLocation);
router.get('/all', isAuthenticated, getLocations);





export default router;