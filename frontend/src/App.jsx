import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';

import { useAuth } from './context/auth/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  const { user } = useAuth();

  return (
    <NotificationProvider user={user}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Toaster position="top-center" richColors />
          <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/user/*" element={<UserRoutes />} />
            <Route path="/*" element={<PublicRoutes />} />

                  {/* Catch-all 404 route */}

          </Routes>
        </Suspense>
      </Router>
    </NotificationProvider>
  );
}

export default App;
