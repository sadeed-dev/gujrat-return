import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import LFAs from '../pages/admin/lfas/LFAs';
import Task from '../pages/admin/task/Task';
import AllUsers from '../pages/users/AllUsers';
import ChatRoom from '../pages/admin/lfas/offfer-lfa/ChatRoom';
import LfaViewDialog from '../pages/admin/lfas/LfaViewDialog';
import TaskViewDialog from '../pages/admin/task/view/TaskViewDialog';
import Settings from '../pages/Settings';

const AdminRoutes = () => {
  return (
    // <ProtectedRoute role="ADMIN">
      <Routes>
        <Route path="/dashBoard" element={<AdminDashboard />} />
        <Route path="lfas" element={<LFAs />} />
        <Route path="lfas/view/:lfaId" element={<LfaViewDialog />} />
        <Route path="lfas/chatroom/:roomId" element={<ChatRoom />} />
        <Route path="task" element={<Task />} />
        <Route path="task/view/:id" element={<TaskViewDialog />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="setting" element={<Settings />} />

      </Routes>
    // </ProtectedRoute>
  );
};

export default AdminRoutes;
