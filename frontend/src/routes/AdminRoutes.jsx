import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminNavbar from '../components/AdminNavbar';
import UserViewForm from '../pages/users/dialog/UserViewForm';

// Lazy-loaded pages
const AdminDashboard = lazy(() => import('../pages/admin/dashboard/AdminDashboard'));
const LFAs = lazy(() => import('../pages/admin/lfas/LFAs'));
const Task = lazy(() => import('../pages/admin/task/Task'));
const AllUsers = lazy(() => import('../pages/users/AllUsers'));
const ChatRoom = lazy(() => import('../pages/admin/lfas/offfer-lfa/ChatRoom'));
const LfaViewDialog = lazy(() => import('../pages/admin/lfas/LfaViewDialog'));
const TaskViewDialog = lazy(() => import('../pages/admin/task/view/TaskViewDialog'));
const Settings = lazy(() => import('../pages/Settings'));

const AdminRoutes = () => {
  return (
    <ProtectedRoute role="ADMIN">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AdminNavbar />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="lfas" element={<LFAs />} />
            <Route path="lfas/view/:lfaId" element={<LfaViewDialog />} />
            <Route path="lfas/chatroom/:roomId" element={<ChatRoom />} />
            <Route path="task" element={<Task />} />
            <Route path="task/view/:id" element={<TaskViewDialog />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="users/view/:id" element={<UserViewForm />} />
            <Route path="setting" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </ProtectedRoute>
  );
};

export default AdminRoutes;
