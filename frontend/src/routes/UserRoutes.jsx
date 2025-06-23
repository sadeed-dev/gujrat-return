import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import TaskUpload from '../pages/users-panel/TaskUpload';
import Settings from '../pages/Settings';

const UserRoutes = () => {
  return (
    <ProtectedRoute role="USER">
      <Routes>
        <Route path="task-uploads" element={<TaskUpload />} />
        <Route path="setting" element={<Settings />} />
      </Routes>
    </ProtectedRoute>
  );
};

export default UserRoutes;
