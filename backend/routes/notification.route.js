import express from 'express';
import { getNotifications, markNotificationRead } from '../controllers/notification.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/', isAuthenticated, getNotifications);
router.patch('/:id/read', isAuthenticated, markNotificationRead )

export default router