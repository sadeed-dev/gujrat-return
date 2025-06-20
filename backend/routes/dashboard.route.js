import express from 'express';
import { getLfaStatistics } from '../controllers/dashboard.controller.js';

const router = express.Router();

// GET /api/lfas/statistics
router.get('/statistics', getLfaStatistics);

export default router;
