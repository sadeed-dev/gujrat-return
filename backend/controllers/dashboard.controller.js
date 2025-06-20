import { getLfaStatisticsService } from '../services/dashboard.service.js';

export const getLfaStatistics = async (req, res) => {
  try {
    const stats = await getLfaStatisticsService();
    return res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching LFA statistics:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
