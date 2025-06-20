import { LFA } from "../models/lfa.model.js";
import User from "../models/user.model.js";


export const getLfaStatisticsService = async () => {
  const baseFilter = { isDeleted: { $ne: true } };

  const totalLFAs = await LFA.countDocuments(baseFilter);

  const [pendingLFAs, approvedLFAs, rejectedLFAs, totalUsers] = await Promise.all([
    LFA.countDocuments({ ...baseFilter, status: 'pending' }),
    LFA.countDocuments({ ...baseFilter, status: 'approved' }),
    LFA.countDocuments({ ...baseFilter, status: 'rejected' }),
    User.countDocuments({ isDeleted: { $ne: true } }),
  ]);

  const completedLFAs = approvedLFAs + rejectedLFAs;
  const completionRate = totalLFAs > 0 ? ((completedLFAs / totalLFAs) * 100).toFixed(2) : '0.00';

  return {
    totalLFAs,
    pendingLFAs,
    approvedLFAs,
    rejectedLFAs,
    completionRate: `${completionRate}%`,
    totalUsers,
  };
};
