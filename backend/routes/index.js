import express from 'express';
import authRoutes from './auth.routes.js'
import lfaRoutes from './lfa.routes.js'
import userRoutes from './user.routes.js'
import taskRoutes from './task.routes.js'
import notificationRoutes from './notification.route.js'
import dashboardRoutes from './dashboard.route.js'
import chatRoutes from './chat.routes.js';
import localRoutes from './location.route.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/lfa', lfaRoutes);
router.use('/user', userRoutes);    

router.use('/task', taskRoutes);

router.use('/notifications', notificationRoutes);


router.use('/dashboard', dashboardRoutes);

router.use('/chat', chatRoutes);
router.use('/location',localRoutes );


export default router;
